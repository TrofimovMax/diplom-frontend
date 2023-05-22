import React, {useContext, useState} from 'react';
import {Grid, Button} from "@mui/material";
import {times} from "lodash";
import {useMutation, useQuery} from "react-query";
import EditIcon from '@mui/icons-material/Edit';
import IsError from "@/components/molecules/IsError";
import GymTable from "@/components/templates/GymIdTemplate/organisms/GymTableTemplate";
import IsLoading from "@/components/molecules/isLoading";
import SelectorIntervalHours from "@/components/templates/GymIdTemplate/molecules/SelectorIntervalHours";
import {GreedyAlgorithm} from "@/api/GreedyAlgorithm";
import {getByQueryKey} from "@/api/getByQueryKey";
import {getDayEndTime, getDayStartTime} from "@/components/templates/GymIdTemplate/molecules/CellEditContent/utils";
import axiosClient from "@/api/axiosClient";
import NoticeContext from "@/api/NoticeContext";
import SelectorFactorByEntity
  from "@/components/templates/GymIdTemplate/organisms/EditForm/molecules/SelectorFactorByEntity";
import SelectorMaxHours from "@/components/templates/GymIdTemplate/organisms/EditForm/molecules/SelectorMaxHours";

const hours = times(24, (item) => `${item < 10 ? `0${item}` : item}:00`)

export const DAY_TITLE_MAP = {
  "mon": "Понедельник",
  "tue": "Вторник",
  "wed": "Среда",
  "thu": "Четверг",
  "fri": "Пятница",
  "sat": "Суббота",
  "sun": "Воскресенье"
}

export const EditForm = ({gym, gymId}) => {
  if (gym === undefined) return <IsError/>
  const raw = {...gym?.schedule?.configuration?.raw?.hours};
  let array = [];
  raw !== undefined ? array = Object.entries(raw) : array = [];
  const capacity = gym?.capacity;
  const isEdit = true;

  const [generatedSchedule, SetGeneratedSchedule] = useState(null);
  const [factorBooking, setFactorBooking] = useState(1);
  const [factorWishing, setFactorWishing] = useState(1);
  const [factorMaxHour, setFactorMaxHour] = useState(8);
  const {handleClick, setResponseMessage, setSeverity} = useContext(NoticeContext);

  const {isLoading, isError, data, error: errorBooking} = useQuery(["gyms", gymId, "bookings"], getByQueryKey);
  const {
    isLoading: loadingWishes,
    isError: isErrorWishes,
    data: dataWishes,
    error: errorWishes
  } = useQuery(["gyms", gymId, "wishes"], getByQueryKey);

  const message = errorBooking?.message || errorWishes?.message || "Что-то пошло не так.";
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

  const {mutate} = useMutation(["update schedule"], (params) => {
    axiosClient.patch(`/gyms/${gymId}`, params, {
      headers: {
        "Authorization": typeof localStorage === 'object' ? localStorage.getItem('token') : null,
        'Access-Control-Allow-Origin': '*'
      },
      crossDomain: true
    })
  }, {
    onSuccess: (res) => {
      setResponseMessage("Расписание было успешно обновленно");
      setSeverity("success");
      handleClick();
    },
    onError: (error) => {
      setResponseMessage("Что-то пошло не так: ", error?.message);
      setSeverity("error");
      handleClick();
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
    return SetGeneratedSchedule(GreedyAlgorithm(raw, capacity, bookings, wishes, factorBooking, factorWishing, factorMaxHour));
  }

  const handleChangeStartTimes = (event, day) => {
    setStartTimes({...startTimes, [day]: event.target.value});
  };

  const handleChange = (event, day) => {
    setEndTime({...endTime, [day]: event.target.value});
  };

  if (isLoading && loadingWishes) return (<IsLoading/>)
  if (isError || isErrorWishes) return (<IsError message={message}/>)

  return (
    <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
      {
        array.map(item => {
          return (
            <SelectorIntervalHours
              key={item}
              item={item}
              handleChange={handleChange}
              handleChangeStartTimes={handleChangeStartTimes}
              startTimes={startTimes}
              endTime={endTime}
              hours={hours}
            />
          )
        })
      }
      <Grid container item
            xs={12}
            spacing={3}
            direction="row"
            justifyContent="center"
            alignItems="center"
      >
        <Grid item xs="auto">

        </Grid>
        <Grid item xs={6} md={2}>
          <Button
            onClick={onSave}
            variant="outlined"
            startIcon={<EditIcon/>}
          >
            Обновить
          </Button>
        </Grid>
        <Grid item xs={6} md={2}>
          <SelectorFactorByEntity entity='Коэфициент записей' value={factorBooking} setValue={setFactorBooking}/>
        </Grid>
        <Grid item xs={6} md={2}>
          <SelectorFactorByEntity entity='Коэфициент пожеланий' value={factorWishing} setValue={setFactorWishing}/>
        </Grid>
        <Grid item xs={6} md={3}>
          <SelectorMaxHours entity='Максимум рабочих часов' value={factorMaxHour} setValue={setFactorMaxHour}/>
        </Grid>
        <Grid item xs={6} md={2}>
          <Button
            onClick={onGenerate}
            variant="outlined"
            startIcon={<EditIcon/>}
          >
            Сгенерировать
          </Button>
        </Grid>
        <Grid item xs="auto">

        </Grid>
      </Grid>
      <Grid item xs={12} sx={{paddingBottom: 5, width: '100%'}}>
        {
          gymId !== undefined ?
            <GymTable
              gymId={gymId}
              capacity={capacity}
              address={gym?.address}
              raw={raw}
              isEdit={isEdit}
              newSchedule={generatedSchedule}
            /> :
            <IsLoading/>
        }
      </Grid>
    </Grid>
  )
}
