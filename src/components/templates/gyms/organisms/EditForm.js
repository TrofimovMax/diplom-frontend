import React, { useState } from 'react';
import {Grid, FormControl, InputLabel, MenuItem, Select, Typography, Box, Button} from "@mui/material";
import {times, keys, values, first} from "lodash";
import {useMutation} from "react-query";
import EditIcon from '@mui/icons-material/Edit';


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
  const raw = data?.schedule.configuration.raw.hours;
  let array = [];
  raw !== undefined ? array = Object.entries(raw): array = [];

  const [startTimes, setStartTimes] = useState({
    "fri": getDayStartTime(raw['fri']),
    "mon": getDayStartTime(raw['mon']),
    "sat": getDayStartTime(raw['sat']),
    "thu": getDayStartTime(raw['thu']),
    "tue": getDayStartTime(raw['tue']),
    "wed": getDayStartTime(raw['wed'])
  });

  const [endTime, setEndTime] = useState({
    "fri": getDayEndTime(raw['fri']),
    "mon": getDayEndTime(raw['mon']),
    "sat": getDayEndTime(raw['sat']),
    "thu": getDayEndTime(raw['thu']),
    "tue": getDayEndTime(raw['tue']),
    "wed": getDayEndTime(raw['wed'])
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
      console.log('>>>>>>>')
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
        "fri": {
          [startTimes['fri']]: endTime['fri']
        },
        "mon": {
          [startTimes['mon']]: endTime['mon']
        },
        "sat": {
          [startTimes['sat']]: endTime['sat']
        },
        "thu": {
          [startTimes['thu']]: endTime['thu']
        },
        "tue": {
          [startTimes['tue']]: endTime['tue']
        },
        "wed": {
          [startTimes['wed']]: endTime['wed']
        }
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
