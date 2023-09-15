import React from "react";
import {Grid, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
const SelectorIntervalHours = ({days, handleChange, hours, hour, schedule}) => {
    const isEndTime = true;
    return (
      <Grid item m={1} sx={{minWidth: "150px"}}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="demo-simple-select-label">С</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={hour}
            label="endTime"
            onChange={(e) => handleChange(e,days, hour, schedule[hour]) }
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
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="demo-simple-select-label">До</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={schedule[hour]}
            label="endTime"
            onChange={(e) => handleChange(e,days, hour, schedule[hour], isEndTime)}
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
      </Grid>
  );
};

export default SelectorIntervalHours;