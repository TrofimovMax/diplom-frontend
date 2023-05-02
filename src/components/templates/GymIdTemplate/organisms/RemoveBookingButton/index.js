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
  const RemoveBookHandler = () => {
    const bookingId = getBookingIdByUserId(userId);
    if(bookingId === null) return null;
    const response = axiosClient.delete(`/gyms/${gymId}/bookings/${bookingId}`)
    return response;
  };

  const { isError, error, isLoading, mutate} = useMutation(
    "removeBooking",
    RemoveBookHandler,
    {
      onSuccess: (data) => {
        setCounter(counter - 1);
        handleClick();
        setResponseMessage("Your successfully remove your booking!");
        setSeverity("success");
      },
      onError(err) {
        handleClick();
        setResponseMessage(error?.message);
        setSeverity("error");
      }
    }
  );

  if (isLoading) return (<IsLoading/>);
  if (isError) return (<IsError message={error}/>);
  const handleRemoveBook = () =>{
    mutate();
  }

  return (
    <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleRemoveBook}>
      {text}
    </Button>
  );
};

export default RemoveBookingButton;