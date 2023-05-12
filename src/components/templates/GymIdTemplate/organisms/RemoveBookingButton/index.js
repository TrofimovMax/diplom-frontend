import React, {useContext} from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import {Button} from "@mui/material";
import {useMutation} from "react-query";
import IsLoading from "@/components/molecules/isLoading";
import IsError from "@/components/molecules/IsError";
import axiosClient from "@/api/axiosClient";
import NoticeContext from "@/api/NoticeContext";

const RemoveBookingButton = ({ text, gymId,userId, getBookingIdByUserId, counter, setCounter }) => {
  const {handleClick, setResponseMessage, setSeverity} = useContext(NoticeContext);
  const RemoveBookHandler = (id) => {
    return axiosClient.delete(`/gyms/${gymId}/bookings/${id}`)
  };

  const { isError, error, isLoading, mutate} = useMutation(
    "removeBooking",
    (params) => RemoveBookHandler,
    {
      onSuccess: (data) => {
        setCounter(counter - 1);
        handleClick();
        setResponseMessage("Your successfully remove your booking!");
        setSeverity("success");
      },
      onError(error) {
        handleClick();
        setResponseMessage(error?.message);
        setSeverity("error");
      }
    }
  );

  if (isLoading) return (<IsLoading/>);
  if (isError) return (<IsError message={error}/>);
  const handleRemoveBook = () =>{
    const bookingId = userId === null? null : getBookingIdByUserId(userId);
    if(userId !== null){
      if(bookingId !== null){
        mutate(bookingId);
      } else {
        setResponseMessage("Вы ещё не записаны на это занятие");
        setSeverity("info");
        handleClick();
      }
    } else {
      setResponseMessage("Вы не можете убрать запись на занятие, пожалуйста авторизуйтесь");
      setSeverity("info");
      handleClick();
    }
  }
  console.log(counter)
  if (counter === 0){
    return (
      <Button disabled variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleRemoveBook}>
        {text}
      </Button>
    );
  }
  return (
    <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleRemoveBook}>
      {text}
    </Button>
  );
};

export default RemoveBookingButton;