import React from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import {Button} from "@mui/material";
import {useMutation} from "react-query";
import IsLoading from "@/components/molecules/isLoading";
import IsError from "@/components/molecules/IsError";
import axiosClient from "@/api/axiosClient";

const RemoveBookingButton = ({ text, gymId,userId, getBookingsByUserId }) => {
  const RemoveBookHandler = () => {
    const bookingId = getBookingsByUserId(userId);
    if(bookingId === null) return null;
    const response = axiosClient.delete(`/gyms/${gymId}/bookings/${bookingId}`)
    console.log(response)
    return response;
  };

  const { isError, error, isLoading, mutate} = useMutation(
    "removeBooking",
    RemoveBookHandler,
    {
      onSuccess: (data) => {

      },
      onError(err) {
        alert(err.message)
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