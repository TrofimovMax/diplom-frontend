import React, {useState} from 'react';
import {hasHourInSchedule} from "@/components/templates/GymIdTemplate/organisms/GymTableTemplate/utils";
import {StyledTableCell} from "@/components/templates/GymIdTemplate/organisms/GymTableTemplate/styles";
import moment from "moment/moment";
import filter from "lodash/filter";
import {CellForm} from "@/components/templates/GymIdTemplate/organisms/CellForm";
import {
  getEntityByTime,
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

  const [counter, setCounter] = useState(getEntityCountByTime(bookings, day, hour-1));
  const [counterWishes, setCounterWishes] = useState(getEntityCountByTime(wishes, day, hour-1))

  return(
    <StyledTableCell sx={{border: 1, padding: 0, width: 70, height: 70}} key={hour}
                     component="th" scope="row">
      <CellForm date = {day.substring(4)}
                hour = {hour}
                gymId = {gymId}
                capacity = {capacity}
                counter = {counter}
                setCounter = {setCounter}
                counterWishes = {counterWishes}
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