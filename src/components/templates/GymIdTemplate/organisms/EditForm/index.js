import React, { useState } from 'react';
import {Grid, Button} from "@mui/material";
import {times, keys, values, first} from "lodash";
import {useMutation} from "react-query";
import EditIcon from '@mui/icons-material/Edit';
import IsError from "@/components/molecules/IsError";
import GymTable from "@/components/templates/GymIdTemplate/organisms/GymTableTemplate";
import IsLoading from "@/components/molecules/isLoading";
import SelectorIntervalHours from "@/components/templates/GymIdTemplate/molecules/SelectorIntervalHours";

const hours = times(24, (item) => `${item < 10 ? `0${item}` : item }:00`)

export const DAY_TITLE_MAP = {
  "mon": "Monday",
  "tue": "Tuesday",
  "wed": "Wednesday",
  "thu": "Thursday",
  "fri": "Friday",
  "sat": "Saturday",
}

const getDayStartTime = (day) => first(keys(day))

const getDayEndTime = (day) => first(values(day))

const EditForm = ({data, url, gymId}) => {
  if (data === undefined) return <IsError/>
  const raw = {...data?.schedule?.configuration?.raw?.hours};
  let array = [];
  raw !== undefined ? array = Object.entries(raw): array = [];

  const isEdit = true;

  const [startTimes, setStartTimes] = useState({
    "mon": getDayStartTime(raw['mon']),
    "tue": getDayStartTime(raw['tue']),
    "wed": getDayStartTime(raw['wed']),
    "thu": getDayStartTime(raw['thu']),
    "fri": getDayStartTime(raw['fri']),
    "sat": getDayStartTime(raw['sat'])
  });

  const [endTime, setEndTime] = useState({
    "mon": getDayEndTime(raw['mon']),
    "tue": getDayEndTime(raw['tue']),
    "wed": getDayEndTime(raw['wed']),
    "thu": getDayEndTime(raw['thu']),
    "fri": getDayEndTime(raw['fri']),
    "sat": getDayEndTime(raw['sat'])
  });

  const { mutate } = useMutation((data) => {
    fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
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
    console.log({hours: {
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
      }})
    mutate({
      title: data.title,
      address: data.address,
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
      }
    })
  }

  const handleChangeStartTimes = (event, day) => {
    setStartTimes({...startTimes, [day]: event.target.value});
  };

  const handleChange = (event,day) => {
    setEndTime({...endTime, [day]: event.target.value});
  };

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
                capacity={data?.capacity}
                address={data?.address}
                raw={data?.schedule?.configuration?.raw?.hours}
                isEdit = {isEdit}
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
        <Grid item xs="auto">

        </Grid>
      </Grid>
    </Grid>
  )
}

export default EditForm;
