import React from 'react';
import {Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {DAY_TITLE_MAP} from "@/components/templates/GymIdTemplate/organisms/EditForm";
const SelectorIntervalHours = ({item, handleChange, handleChangeStartTimes, endTime, startTimes,hours}) => {
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
  );
};

export default SelectorIntervalHours;