import React, {useEffect, useState} from 'react';
import {hasHourInSchedule} from "@/components/templates/GymIdTemplate/organisms/GymTableTemplate/utils";
import {StyledTableCell} from "@/components/templates/GymIdTemplate/organisms/GymTableTemplate/styles";
import {CellForm} from "@/components/templates/GymIdTemplate/organisms/CellForm";
import {
  getEntityCountByTime, getEntityIdByUserId, getEntityCountByUserId
} from "@/components/templates/GymIdTemplate/molecules/CellEditContent/utils";

const MAX_WISHES = 7;

const CellContent = ({data, day, hour, bookings, wishes, userId, refetch, refetchWishes }) => {

  const isOpenGymByHour = hasHourInSchedule(day, hour, data?.schedule?.configuration?.raw?.hours);
  const getBookingIdByUserId = (id) => {
    return getEntityIdByUserId(id, bookings, day, hour);
  }
  const getWishingIdByUserId = (id) => {
    return getEntityIdByUserId(id, wishes, day, hour);
  }
  const getWishingByUserId = (id) => {
    return getEntityCountByUserId(id, wishes);
  }

  const wishDisabled = !isOpenGymByHour && getWishingByUserId(userId) > MAX_WISHES;
  //const countWishes = !wishes.length? null: getEntityCountByTime(wishes, day, hour-1);
  const [counter, setCounter] = useState(0);
  const [counterWishes, setCounterWishes] = useState(0);
  useEffect(() => {
    setCounter(getEntityCountByTime(bookings, day, hour-1))
    setCounterWishes(getEntityCountByTime(wishes, day, hour-1))
  }, [bookings, wishes, day, hour])

  return(
    <StyledTableCell
      sx={{
        border: 1,
        padding: 0,
        width: 70,
        height: 70
      }}
      key={hour}
      component="th"
      scope="row"
    >
      <CellForm
          data ={data}
          date = {day.substring(4)}
          hour = {hour}
          counter = {counter}
          setCounter = {setCounter}
          counterWishes = {counterWishes}
          setCounterWishes = {setCounterWishes}
          isOpenGymByHour = {isOpenGymByHour}
          userId = {userId}
          getBookingIdByUserId = {getBookingIdByUserId}
          getWishingIdByUserId = {getWishingIdByUserId}
          wishDisabled = {wishDisabled}
          refetch={refetch}
          refetchWishes = {refetchWishes}
      />
    </StyledTableCell>
  )
};

export default CellContent;