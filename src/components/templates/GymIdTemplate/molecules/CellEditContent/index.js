import React from 'react';
import {hasHourInSchedule} from "@/components/templates/GymIdTemplate/organisms/GymTableTemplate/utils";
import {StyledTableCell} from "@/components/templates/GymIdTemplate/organisms/GymTableTemplate/styles";
import {Box, createTheme, Grid, ThemeProvider} from "@mui/material";
import { getEntityCountByTime } from "@/components/templates/GymIdTemplate/molecules/CellEditContent/utils";
import {first, keys, values} from "lodash";

const theme = createTheme({
  palette: {
    primary: {
      main: '#00A36C'
    },
    secondary: {
      main: '#7CFC00'
    },
    yellow: {
      main: '#FFEA00'
    },
    orange: {
      main: '#FFBF00'
    },
    red: {
      main: '#FF0000'
    },
    white: {
      main: '#FFFFFF',
      secondary: '#e5e5e5',
    },
    blue: {
      main: '#5555ff',
      secondary: '#bc13fe',
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
const CellEditContent = ({day, hour, capacity, bookings, wishes, schedule, newSchedule}) => {
  console.log("booking")
  const count = bookings? getEntityCountByTime(bookings, day, hour-1): null;
  console.log("wishes")
  const countWishes = wishes? getEntityCountByTime(wishes, day, hour-1): null;
  // console.log("wishes", wishes)
  // console.log("day", day)
  // console.log("hour", hour-1)
  // console.log("countWishes", countWishes)
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
            color: 'white.main',
            backgroundColor: 'blue.main',
            '&:hover': {
              backgroundColor: 'blue.secondary',
              opacity: [0.9, 0.8, 0.7],
            },
          }}
          spacing={0}
        >
          <Grid item xs>
            Booking now:{count}
          </Grid>
        </Grid>
      </StyledTableCell>
      </ThemeProvider>
    )
  } else {
    if(hasHourInSchedule(day, hour, schedule)){
      return (
        <StyledTableCell sx={{border: 1, padding: 0, width: 70, height: 70}} key={hour}
                         component="th" scope="row">
          <Box>
            Book:{count}/{capacity}
          </Box>
        </StyledTableCell>
      )
    } else {
      return (
        <StyledTableCell sx={{border: 1, height: 1, width: 1,}} key={hour} component="th"
                         scope="row">
          <Box>
            Wish:{countWishes}
          </Box>
        </StyledTableCell>
      )
    }
  }
};


export default CellEditContent;