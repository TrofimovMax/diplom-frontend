import React, { useState } from 'react';
import {Grid, FormControl, InputLabel, MenuItem, Select, Typography, Box, Button} from "@mui/material";
import {times, keys, values, first} from "lodash";
import {useMutation} from "react-query";
import EditIcon from '@mui/icons-material/Edit';
import IsError from "@/components/molecules/IsError";
import GymTable from "@/components/templates/gyms/organisms/GymTable";

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

const EditForm = ({data, url}) => {
  if (data === undefined) return <IsError/>
  const raw = {...data?.schedule?.configuration?.raw?.hours};
  let array = [];
  raw !== undefined ? array = Object.entries(raw): array = [];

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
              <Grid item key={item} xs={2} sm={4} md={4}>
              <Box m={1}>
                <FormControl fullWidth xs={4} sx={{ mb: 2 }}>
                  <Typography>{DAY_TITLE_MAP[item[0]]}</Typography>
                </FormControl>
                <FormControl fullWidth xs={4} sx={{ mb: 2 }}>
                  <InputLabel id="demo-simple-select-label">From</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={startTimes[item[0]]}
                    label="endTime"
                    onChange={(e) => handleChangeStartTimes(e, item[0]) }
                  >
                    {
                      hours.map(time => {
                        return(
                          <MenuItem key={time} value={time}>{time}</MenuItem>
                        )
                      })
                    }
                  </Select>
                </FormControl>
                <FormControl fullWidth xs={4} sx={{ mb: 2 }}>
                  <InputLabel id="demo-simple-select-label">To</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={endTime[item[0]]}
                    label="endTime"
                    onChange={(e) => handleChange(e, item[0])}
                  >
                    {
                      hours.map(time => {
                        return (
                          <MenuItem key={time} value={time}>{time}</MenuItem>
                        )
                      })
                    }
                  </Select>
                </FormControl>
              </Box>
              </Grid>
            )
          })
        }
        <Grid item xs={12} sx={{paddingBottom: 5}}>
          <GymTable
            gymId={data?.id}
            capacity={data?.capacity}
            address={data?.address}
            raw={data?.schedule?.configuration?.raw?.hours}
          />
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
