import React, {useState} from 'react';
import {hasHourInSchedule} from "@/components/templates/GymIdTemplate/organisms/GymTableTemplate/utils";
import {StyledTableCell} from "@/components/templates/GymIdTemplate/organisms/GymTableTemplate/styles";
import moment from "moment/moment";
import filter from "lodash/filter";
import {CellForm} from "@/components/templates/GymIdTemplate/organisms/CellForm";
import {getEntityByTime} from "@/components/templates/GymIdTemplate/molecules/CellEditContent/utils";

const CellContent = ({gymId, day, hour, capacity, bookings, schedule, userId}) => {
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

  const getBookingIdByUserId = (id) => {
    const bookingByTime = getEntityByTime(bookings, day, hour-1);
    const bookingById = bookingByTime.filter(book => book.user_id === id)
    return bookingById[0]?.id || null;
  }

  const [counter, setCounter] = useState(getBookingsCountByTime(bookings, day, hour-1));

  return(
    <StyledTableCell sx={{border: 1, padding: 0, width: 70, height: 70}} key={hour}
                     component="th" scope="row">
      <CellForm date={day.substring(4)}
                hour={hour}
                gymId={gymId}
                capacity={capacity}
                counter={counter}
                setCounter = {setCounter}
                isOpenGymByHour = {isOpenGymByHour}
                userId = {userId}
                getBookingIdByUserId = {getBookingIdByUserId}
      />
    </StyledTableCell>
  )
};

export default CellContent;