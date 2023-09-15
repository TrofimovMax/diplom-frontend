import React from "react";
import {hasHourInSchedule} from "@components/templates/GymIdTemplate/organisms/GymTableTemplate/utils";
import {StyledTableCell} from "@components/templates/GymIdTemplate/organisms/GymTableTemplate/styles";
import {Box, createTheme, Grid, ThemeProvider, Typography} from "@mui/material";
import { getEntityCountByTime } from "@components/templates/GymIdTemplate/molecules/CellEditContent/utils";
import {first, keys, values} from "lodash";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00A36C"
    },
    secondary: {
      main: "#7CFC00"
    },
    yellow: {
      main: "#FFEA00"
    },
    orange: {
      main: "#FFBF00"
    },
    red: {
      main: "#FF0000"
    },
    white: {
      main: "#FFFFFF",
      secondary: "#e5e5e5",
    },
    blue: {
      main: "#5555ff",
      secondary: "#bc13fe",
    }
  },
});
const hasHourInNewSchedule = (dayDate, hour, newSchedule) => {
  const day = dayDate.substring(0,3);
  const scheduleByDay = newSchedule.filter(item => first(keys(item)) === day)[0]
  const findTime = scheduleByDay[day].filter(item => item.time === hour);
  if(findTime.length !== 0) {
    return true
  }
  return false;
}
const CellEditContent = ({data, day, hour, bookings, wishes, newSchedule}) => {
  const schedule = data?.schedule?.configuration?.raw?.hours;
  const count = bookings? getEntityCountByTime(bookings, day, hour-1): null;
  const countWishes = wishes? getEntityCountByTime(wishes, day, hour-1): null;
  
  if(newSchedule && hasHourInNewSchedule(day, hour, newSchedule)){
    return (
      <ThemeProvider theme={theme}>
        <StyledTableCell sx={{border: 1, padding: 0, width: 70, height: 70}} key={hour}
                         component="th" scope="row">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            height: 1,
            width: 1,
            color: "white.main",
            backgroundColor: "blue.main",
            "&:hover": {
              backgroundColor: "blue.secondary",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
          spacing={0}
        >
          <Grid item xs>
            <Typography variant="caption">
              Записано сейчас:{count}
            </Typography>
          </Grid>
        </Grid>
      </StyledTableCell>
      </ThemeProvider>
    )
  } else {
    if(hasHourInSchedule(day, hour, schedule)){
      return (
        <StyledTableCell align="center" sx={{border: 1, padding: 1, width: 70, height: 70}} key={hour}
                         component="th" scope="row">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
              height: 1,
              width: 1,
            }}
            spacing={0}
          >
            <Grid item xs>
              <Typography variant="caption">
                {count}/{data?.capacity}
              </Typography>
            </Grid>
          </Grid>
        </StyledTableCell>
      )
    } else {
      return (
        <StyledTableCell sx={{border: 1, height: 1, width: 1,}} key={hour} component="th"
                         scope="row">
          <Typography variant="caption">
            Желают:{countWishes}
          </Typography>
        </StyledTableCell>
      )
    }
  }
};


export default CellEditContent;