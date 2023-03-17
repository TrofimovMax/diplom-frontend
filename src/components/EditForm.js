import React, { useState } from 'react';
import {Grid, FormControl, InputLabel, MenuItem, Select, Typography, Box, Button} from "@mui/material";
import {times, keys, values, first} from "lodash";


const hours = times(24, (item) => `${item < 10 ? `0${item}` : item }:00`)

export const DAY_TITLE_MAP = {
  "fri": "Friday",
  "mon": "Monday",
  "sat": "Monday",
  "thu": "Monday",
  "tue": "Monday",
  "wed": "Monday"
}

const getDayStartTime = (day) => first(keys(day))

const getDayEndTime = (day) => first(values(day))

const EditForm = ({raw}) => {
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

  const save = () => {
    const data = {
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
  }

  const handleChangeStartTimes = (event, day) => {
    setStartTimes({...startTimes, [day]: event.target.value});
  };

  const handleChange = (event,day) => {
    setEndTime({...endTime, [day]: event.target.value});
  };

  return (
    <Grid container>
      {
        array.map(item => {
          return (
            <Box key={item} m={1}>
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
          )
        })
      }
      <Button onClick={save} > Update</Button>
    </Grid>
  )
}

export default EditForm;
