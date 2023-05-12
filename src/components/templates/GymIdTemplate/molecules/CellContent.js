import React, {useState} from 'react';
import {hasHourInSchedule} from "@/components/templates/GymIdTemplate/organisms/GymTableTemplate/utils";
import {StyledTableCell} from "@/components/templates/GymIdTemplate/organisms/GymTableTemplate/styles";
import {CellForm} from "@/components/templates/GymIdTemplate/organisms/CellForm";
import {
  getEntityCountByTime, getEntityIdByUserId
} from "@/components/templates/GymIdTemplate/molecules/CellEditContent/utils";

const CellContent = ({gymId, day, hour, capacity, bookings, wishes, schedule, userId}) => {
  const isOpenGymByHour = hasHourInSchedule(day, hour, schedule);
  const getBookingIdByUserId = (id) => {
    return getEntityIdByUserId(id, bookings, day, hour);
  }
  const getWishingIdByUserId = (id) => {
    return getEntityIdByUserId(id, wishes, day, hour);
  }
  const countWishes = !wishes.length? null: getEntityCountByTime(wishes, day, hour-1);
  const count = bookings? getEntityCountByTime(bookings, day, hour-1): null;
  const [counter, setCounter] = useState(count);
  const [counterWishes, setCounterWishes] = useState(countWishes);
  return(
    <StyledTableCell sx={{border: 1, padding: 0, width: 70, height: 70}} key={hour}
                     component="th" scope="row">
      <CellForm date = {day.substring(4)}
                hour = {hour}
                gymId = {gymId}
                capacity = {capacity}
                counter = {counter}
                setCounter = {setCounter}
                counterWishes = {countWishes}
                setCounterWishes = {setCounterWishes}
                isOpenGymByHour = {isOpenGymByHour}
                userId = {userId}
                getBookingIdByUserId = {getBookingIdByUserId}
                getWishingIdByUserId = {getWishingIdByUserId}
      />
    </StyledTableCell>
  )
};

export default CellContent;