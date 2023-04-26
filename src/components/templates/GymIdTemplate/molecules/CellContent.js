import React from 'react';
import {hasHourInSchedule} from "@/components/templates/GymIdTemplate/organisms/GymTableTemplate/utils";
import {StyledTableCell} from "@/components/templates/GymIdTemplate/organisms/GymTableTemplate/styles";
import BookingForm from "@/components/templates/GymIdTemplate/organisms/BookingForm";
import moment from "moment/moment";
import filter from "lodash/filter";
import WishingForm from "@/components/templates/GymIdTemplate/organisms/WishingForm";

const CellContent = ({gymId, day, hour, capacity, bookings, refetch, schedule}) => {
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
  if(hasHourInSchedule(day, hour, schedule)){
    return (
      <StyledTableCell sx={{border: 1, padding: 0, width: 70, height: 70}} key={hour}
                       component="th" scope="row">
        <BookingForm date={day.substring(4)}
                     time={hour}
                     gymId={gymId}
                     capacity={capacity}
                     count={getBookingsCountByTime(bookings, day, hour-1)}
                     refetchBookings={refetch}
        />
      </StyledTableCell>
    )
  } else {
    return (
      <StyledTableCell sx={{border: 1, padding: 0, width: 70, height: 70}} key={hour} component="th"
                       scope="row">
        <WishingForm
          date={day.substring(4)}
          time={hour}
          gymId={gymId}
          refetchBookings={refetch}
        />
      </StyledTableCell>
    )
  }
};

export default CellContent;