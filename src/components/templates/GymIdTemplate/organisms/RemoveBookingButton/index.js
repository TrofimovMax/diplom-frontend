import React, {useContext} from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import {Button} from "@mui/material";
import {useMutation, useQueryClient} from "react-query";
import IsLoading from "@/components/molecules/isLoading";
import IsError from "@/components/molecules/IsError";
import axiosClient from "@/api/axiosClient";
import NoticeContext from "@/api/NoticeContext";

const RemoveBookingButton = ({ text, gymId, userId, getBookingIdByUserId, counter, refetch }) => {
  const {handleClick, setResponseMessage, setSeverity} = useContext(NoticeContext);
  const RemoveBookHandler = (id) => {
    return 0;
  };

  const { isError, error, isLoading, mutate} = useMutation(
    "removeBooking",
    (params) => axiosClient.delete(`/gyms/${gymId}/bookings/${params}`),
    {
      onSuccess: (data) => {
        handleClick();
        setResponseMessage("Вы успешно отменили запись!");
        setSeverity("success");
        refetch()
      },
      onError(error) {
        handleClick();
        setResponseMessage(error?.message);
        setSeverity("error");
      },
    }
  );

  if (isLoading) return <IsLoading/>
  if (isError) return <IsError message={error}/>

  const handleRemoveBook = () => {
    const bookingId = getBookingIdByUserId(userId)
    if (userId) {
      if (bookingId) {
        mutate(bookingId)
      } else {
        handleClick();
        setResponseMessage("Вы ещё не записаны на это занятие");
        setSeverity("info");
      }
    } else {
      handleClick();
      setResponseMessage("Вы не можете убрать запись на занятие, пожалуйста авторизуйтесь");
      setSeverity("info");
    }
  }

  return (
    <Button
      disabled={isLoading || !counter || !userId}
      variant="contained"
      color="error"
      startIcon={<DeleteIcon />}
      onClick={handleRemoveBook}
    >
      {text}
    </Button>
  );
};

export default RemoveBookingButton;