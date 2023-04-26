import React from 'react';
import {hasHourInSchedule} from "@/components/templates/GymIdTemplate/organisms/GymTableTemplate/utils";
import {StyledTableCell} from "@/components/templates/GymIdTemplate/organisms/GymTableTemplate/styles";
import moment from "moment/moment";
import filter from "lodash/filter";
import {CellForm} from "@/components/templates/GymIdTemplate/organisms/CellForm";

const CellContent = ({gymId, day, hour, capacity, bookings, refetch, schedule}) => {
  const isOpenGymByHour = hasHourInSchedule(day, hour, schedule);
  const preparedBookings = bookings.map((item) => {
    return {
      ...item,
      start: moment(item.start_at).utc().format('ddd DD/MM h')
    }
  })

  const getBookingsCountByTime = (bookingWeeks, day, hour) => {
    const start = `${day} ${hour}`
    const bookingsByTime = filter(preparedBookings, { start })
    return bookingsByTime.length
  }

  return(
    <StyledTableCell sx={{border: 1, padding: 0, width: 70, height: 70}} key={hour}
                     component="th" scope="row">
      <CellForm date={day.substring(4)}
                time={hour}
                gymId={gymId}
                capacity={capacity}
                count={getBookingsCountByTime(bookings, day, hour-1)}
                refetchBookings={refetch}
                isOpenGymByHour = {isOpenGymByHour}
      />
    </StyledTableCell>
  )
};

export default CellContent;