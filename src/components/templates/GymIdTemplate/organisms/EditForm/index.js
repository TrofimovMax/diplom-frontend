import React, { useState } from 'react';
import {Grid, Button} from "@mui/material";
import {times} from "lodash";
import {useMutation, useQuery} from "react-query";
import EditIcon from '@mui/icons-material/Edit';
import IsError from "@/components/molecules/IsError";
import GymTable from "@/components/templates/GymIdTemplate/organisms/GymTableTemplate";
import IsLoading from "@/components/molecules/isLoading";
import SelectorIntervalHours from "@/components/templates/GymIdTemplate/molecules/SelectorIntervalHours";
import { GreedyAlgorithm } from "@/api/GreedyAlgorithm";
import {getByQueryKey} from "@/api/getByQueryKey";
import {getDayEndTime, getDayStartTime} from "@/components/templates/GymIdTemplate/molecules/CellEditContent/utils";
import axiosClient from "@/api/axiosClient";

const hours = times(24, (item) => `${item < 10 ? `0${item}` : item }:00`)

export const DAY_TITLE_MAP = {
  "mon": "Monday",
  "tue": "Tuesday",
  "wed": "Wednesday",
  "thu": "Thursday",
  "fri": "Friday",
  "sat": "Saturday",
  "sun": "Sunday"
}

const EditForm = ({gym, gymId}) => {
  if (gym === undefined) return <IsError/>
  const raw = {...gym?.schedule?.configuration?.raw?.hours};
  let array = [];
  raw !== undefined ? array = Object.entries(raw): array = [];
  const capacity = gym?.capacity;
  const isEdit = true;

  const [generatedSchedule, SetGeneratedSchedule] = useState(null);

  const { isLoading, isError, data} = useQuery(["gyms", gymId, "bookings" ], getByQueryKey);
  const { isLoading: loadingWishes, isError: isErrorWishes, data: dataWishes } = useQuery(["gyms", gymId, "wishes" ], getByQueryKey);

  const bookings = data?.data || [];
  const wishes = dataWishes?.data || [];

  const [startTimes, setStartTimes] = useState({
    "mon": getDayStartTime(raw['mon']),
    "tue": getDayStartTime(raw['tue']),
    "wed": getDayStartTime(raw['wed']),
    "thu": getDayStartTime(raw['thu']),
    "fri": getDayStartTime(raw['fri']),
    "sat": getDayStartTime(raw['sat']),
    "sun": getDayStartTime(raw['sun']),
  });

  const [endTime, setEndTime] = useState({
    "mon": getDayEndTime(raw['mon']),
    "tue": getDayEndTime(raw['tue']),
    "wed": getDayEndTime(raw['wed']),
    "thu": getDayEndTime(raw['thu']),
    "fri": getDayEndTime(raw['fri']),
    "sat": getDayEndTime(raw['sat']),
    "sun": getDayEndTime(raw['sun']),
  });

  const { mutate } = useMutation(["update schedule"], (params) => {
    axiosClient.patch(`/gyms/${gymId}`, params, {
      headers: {
        "Authorization": typeof localStorage === 'object' ? localStorage.getItem('token') : null,
        'Access-Control-Allow-Origin': '*'
      },
      crossDomain: true
    })
  },{
    onSuccess: (res) => {
      alert("Update schedule!");
    },
    onError: (error) => {
      alert(error);
    }
  })

  const onSave = () => {
    mutate({
      title: gym.title,
      address: gym.address,
      hours: {
        "mon": {
          [startTimes['mon']]: endTime['mon']
        },
        "tue": {
          [startTimes['tue']]: endTime['tue']
        },
        "wed": {
          [startTimes['wed']]: endTime['wed']
        },
        "thu": {
          [startTimes['thu']]: endTime['thu']
        },
        "fri": {
          [startTimes['fri']]: endTime['fri']
        },
        "sat": {
          [startTimes['sat']]: endTime['sat']
        },
        "sun": {
          [startTimes['sun']]: endTime['sun']
        },
      }
    })
  }

  const onGenerate = () => {
    return SetGeneratedSchedule(GreedyAlgorithm(raw, capacity, bookings, wishes));
  }

  const handleChangeStartTimes = (event, day) => {
    setStartTimes({...startTimes, [day]: event.target.value});
  };

  const handleChange = (event,day) => {
    setEndTime({...endTime, [day]: event.target.value});
  };


  if (isLoading && loadingWishes) return (<IsLoading />)
  if (isError || isErrorWishes) return (<IsError message="something has gone wrong"/>)
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {
          array.map(item => {
            return (
              <SelectorIntervalHours
                key={item}
                item ={item}
                handleChange = {handleChange}
                handleChangeStartTimes = {handleChangeStartTimes}
                startTimes = {startTimes}
                endTime = {endTime}
                hours = {hours}
              />
            )
          })
        }
        <Grid item xs={12} sx={{paddingBottom: 5}}>
          {
            gymId !== undefined ?
              <GymTable
                gymId={gymId}
                capacity={capacity}
                address={gym?.address}
                raw={raw}
                isEdit = {isEdit}
                newSchedule = {generatedSchedule}
              /> :
              <IsLoading />
          }
        </Grid>
      <Grid container item
            xs={12}
            spacing={3}
            direction="row"
            justifyContent="center"
            alignItems="center"
      >
        <Grid item xs="auto">

        </Grid>
        <Grid item xs={4} md={2}>
          <Button
            onClick={onSave}
            variant="outlined"
            startIcon={<EditIcon />}
          >
            Update
          </Button>
        </Grid>
        <Grid item xs={4} md={2}>
          <Button
            onClick={onGenerate}
            variant="outlined"
            startIcon={<EditIcon />}
          >
            Generate
          </Button>
        </Grid>
        <Grid item xs="auto">

        </Grid>
      </Grid>
    </Grid>
  )
}

export default EditForm;
