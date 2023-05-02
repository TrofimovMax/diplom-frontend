import React, {useContext} from 'react';
import {Button} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import NoticeContext from "@/api/NoticeContext";
import axiosClient from "@/api/axiosClient";
import {useMutation} from "react-query";
import IsLoading from "@/components/molecules/isLoading";
import IsError from "@/components/molecules/IsError";

const RemoveWishButton = ({ text, gymId,userId, getWishingIdByUserId, counter, setCounter }) => {
  const {handleClick, setResponseMessage, setSeverity} = useContext(NoticeContext);

  const RemoveWishHandler = () => {
    const wishingId = getWishingIdByUserId(userId);
    if(wishingId === null) return null;
    const response = axiosClient.delete(`/gyms/${gymId}/wishes/${wishingId}`)
    return response;
  };

  const { isError, error, isLoading, mutate} = useMutation(
    "removeWish",
    RemoveWishHandler,
    {
      onSuccess: (data) => {
        setCounter(counter - 1);
        handleClick();
        setResponseMessage("Your successfully remove your wishing from wish list!");
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

  const handleRemoveWish = () =>{
    mutate();
  }
  return (
    <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleRemoveWish}>
      {text}
    </Button>
  );
};

export default RemoveWishButton;