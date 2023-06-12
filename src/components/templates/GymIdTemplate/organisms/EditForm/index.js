import React, {useContext, useState} from 'react';
import {Grid, Button, Fab, Typography, FormControl} from "@mui/material";
import _, {times, keys, omitBy, startsWith} from "lodash";
import {useMutation, useQuery} from "react-query";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import IsError from "@/components/molecules/IsError";
import GymTable from "@/components/templates/GymIdTemplate/organisms/GymTableTemplate";
import IsLoading from "@/components/molecules/isLoading";
import SelectorIntervalHours from "@/components/templates/GymIdTemplate/molecules/SelectorIntervalHours";
import {GreedyAlgorithm} from "@/api/GreedyAlgorithm";
import {getByQueryKey} from "@/api/getByQueryKey";
import {getFirstValueByObject, getFirstKeyByObject} from "@/components/templates/GymIdTemplate/molecules/CellEditContent/utils";
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

export const EditForm = ({data, gymId}) => {
  const scheduleObject = {...data?.schedule?.configuration?.raw?.hours};
  const [generatedSchedule, SetGeneratedSchedule] = useState(null);
  const [factorBooking, setFactorBooking] = useState(1);
  const [factorWishing, setFactorWishing] = useState(1);
  const [factorMaxHour, setFactorMaxHour] = useState(8);

  const [scheduleState, setScheduleState] = useState(
      [
        {"mon": scheduleObject['mon'],},
        {"tue": scheduleObject['tue'],},
        {"wed": scheduleObject['wed'],},
        {"thu": scheduleObject['thu'],},
        {"fri": scheduleObject['fri'],},
        {"sat": scheduleObject['sat'],},
        {"sun": scheduleObject['sun'],},
      ]
      )
  const [startTimes, setStartTimes] = useState({
    "mon": getFirstKeyByObject(scheduleObject['mon']),
    "tue": getFirstKeyByObject(scheduleObject['tue']),
    "wed": getFirstKeyByObject(scheduleObject['wed']),
    "thu": getFirstKeyByObject(scheduleObject['thu']),
    "fri": getFirstKeyByObject(scheduleObject['fri']),
    "sat": getFirstKeyByObject(scheduleObject['sat']),
    "sun": getFirstKeyByObject(scheduleObject['sun']),
  });

  const [endTime, setEndTime] = useState({
    "mon": getFirstValueByObject(scheduleObject['mon']),
    "tue": getFirstValueByObject(scheduleObject['tue']),
    "wed": getFirstValueByObject(scheduleObject['wed']),
    "thu": getFirstValueByObject(scheduleObject['thu']),
    "fri": getFirstValueByObject(scheduleObject['fri']),
    "sat": getFirstValueByObject(scheduleObject['sat']),
    "sun": getFirstValueByObject(scheduleObject['sun']),
  });
  const {handleClick, setResponseMessage, setSeverity} = useContext(NoticeContext);

  let scheduleArray = [];
  Object.keys(scheduleObject).length !== 0 ? scheduleArray = Object.entries(scheduleObject) : scheduleArray = [];
  const capacity = data?.capacity;
  const isEdit = true;

  const { isLoading, isError, data: dataBookings, error:errorBooking} = useQuery(["gyms", gymId, "bookings" ], getByQueryKey,  {enabled: !!gymId,retry:2});
  const { isLoading: loadingWishes, isError: isErrorWishes, data: dataWishes, error:errorWish} = useQuery(["gyms", gymId, "wishes" ], getByQueryKey, {enabled: !!gymId,retry:2});

  const message = errorBooking?.message || errorWish?.message || "Что-то пошло не так.";
  const bookings = dataBookings?.data || [];
  const wishes = dataWishes?.data || [];

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
    let flag = true;
    Object.keys(DAY_TITLE_MAP).map((key) => {
      if (startTimes[key] > endTime[key]) {
        flag = false
      }
    });
    if(flag) {
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
          "sun": {
            [startTimes['sun']]: endTime['sun']
          },
        }
      })
    } else {
      setResponseMessage("Введенное расписание содержит ошибки, проверьте начало и конец рабочего дня");
      setSeverity("error");
      handleClick();
    }
    
  }

  const onGenerate = () => {
    return SetGeneratedSchedule(GreedyAlgorithm(scheduleObject, capacity, bookings, wishes, factorBooking, factorWishing, factorMaxHour));
  }
  const handleChange = (event, day, key, value, flag=false) => {
    const newStartTime = event.target.value;
    const thisDay = getFirstKeyByObject(day)
    const result = scheduleState.map(days => {
      const schedule = days[getFirstKeyByObject(day)];
      const filteredSchedule = schedule? Object.keys(schedule).reduce((result, currentKey) =>{
        if(currentKey !== key) {
          result[currentKey] = schedule[currentKey];
        }
        return result;
      }, {}): null;
      return filteredSchedule;
    }).filter(item => item !== null)
    const newScheduleByDay = flag? _.merge(result[0], {[key]: newStartTime}):
        _.merge(result[0], {[newStartTime]: value});
    const newScheduleByWeek = scheduleState.map(day => {
      if(day[thisDay]){
        return {[thisDay]: newScheduleByDay}
      }
      return day;
    })
    setScheduleState(newScheduleByWeek)
  };

  if (isLoading && loadingWishes) return (<IsLoading/>)
  if (isError || isErrorWishes) return (<IsError message={message}/>)

  return (
    <Grid container
          spacing={{xs: 2, md: 3}}
    >
      {
        scheduleState.map((days) => {
          return (
              <>
                <Grid
                    item
                    container
                    key={days}
                    xs={12} md={4} lg={3}
                    spacing={1}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >

                  <Grid item xs={12} sx={{textAlign:'center'}}>
                    <FormControl>
                      <Typography>{DAY_TITLE_MAP[getFirstKeyByObject(days)]}</Typography>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <Fab color="primary" aria-label="add" size='small'>
                      <AddIcon/>
                    </Fab>
                  </Grid>
                  <Grid item xs={10} md={4} lg={3} sx={{minWidth: '180px'}}>
                    {
                      _.keys(getFirstValueByObject(days)).map(hour => {
                        return (
                            <SelectorIntervalHours
                                key={hour}
                                days={days}
                                handleChange={handleChange}
                                hour = {hour}
                                hours={hours}
                                schedule = {getFirstValueByObject(days)}
                            />
                        )
                      })
                    }
                  </Grid>
                  <Grid item>
                    <Fab color="error" aria-label="clear" size='small'>
                      <ClearIcon/>
                    </Fab>
                  </Grid>
                </Grid>
              </>
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
          gymId ?
            <GymTable
              gymId={gymId}
              data={data}
              scheduleObject={scheduleObject}
              isEdit={isEdit}
              newSchedule={generatedSchedule}
            /> :
            <IsError/>
        }
      </Grid>
    </Grid>
  )
}
