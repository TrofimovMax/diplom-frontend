import React from 'react';
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
const SelectorIntervalHours = ({days, handleChange, handleChangeStartTimes, endTime, startTimes,hours, hour, schedule}) => {
  return (
      <Box m={1}>
        <FormControl fullWidth xs={2} sx={{ mb: 2 }}>
          <InputLabel id="demo-simple-select-label">С</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={hour}
            label="endTime"
            onChange={(e) => handleChangeStartTimes(e, hour) }
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
        <FormControl fullWidth xs={2} sx={{ mb: 2 }}>
          <InputLabel id="demo-simple-select-label">До</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={schedule[hour]}
            label="endTime"
            onChange={(e) => handleChange(e, hour)}
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
  );
};

export default SelectorIntervalHours;