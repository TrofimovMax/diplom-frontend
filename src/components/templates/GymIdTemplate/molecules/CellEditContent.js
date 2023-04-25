import React from 'react';
import moment from "moment";
import filter from "lodash/filter";
import {hasHourInSchedule} from "@/components/templates/GymIdTemplate/organisms/GymTableTemplate/utils";
import {StyledTableCell} from "@/components/templates/GymIdTemplate/organisms/GymTableTemplate/styles";
import BookingForm from "@/components/templates/GymIdTemplate/organisms/BookingForm";
import {Box} from "@mui/material";

const CellEditContent = ({gymId, day, hour, capacity, bookings, wishes, refetch, schedule}) => {
  const getEntityCountByTime = (entityWeeks, day, hour) => {
    const start = `${day} ${hour}`;
    const preparedEntity = entityWeeks.map((item) => {
      return {
        ...item,
        start: moment(item.start_at).utc().format('ddd DD/MM h')
      }
    })
    const entitiesByTime = filter( preparedEntity, { start })
    return entitiesByTime.length
  }

  const count = getEntityCountByTime(bookings, day, hour-1);
  const countWishes = getEntityCountByTime(wishes, day, hour-1);

  if(hasHourInSchedule(day, hour, schedule)){
    return (
      <StyledTableCell sx={{border: 1, padding: 0, width: 70, height: 70}} key={hour}
                       component="th" scope="row">
        <Box>
          Book:{count}/{capacity}
        </Box>
        <Box>
          Wish:{countWishes}
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
};


export default CellEditContent;