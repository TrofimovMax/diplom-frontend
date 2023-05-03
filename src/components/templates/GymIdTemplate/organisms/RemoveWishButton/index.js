import React, {useContext} from 'react';
import {Button} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import NoticeContext from "@/api/NoticeContext";
import axiosClient from "@/api/axiosClient";
import {useMutation} from "react-query";
import IsLoading from "@/components/molecules/isLoading";
import IsError from "@/components/molecules/IsError";

const RemoveWishButton = ({ text, gymId,userId, getWishingIdByUserId, counterWishes, setCounterWishes }) => {
  const {handleClick, setResponseMessage, setSeverity} = useContext(NoticeContext);
  const RemoveWishingMessage = () => {
    handleClick();
    setResponseMessage("you hasn't book for this time or you are unauthorized ");
    setSeverity("error");
  }
  const RemoveWishHandler = () => {
    const wishingId = getWishingIdByUserId(userId);
    if(wishingId === null) return null;
    if(wishingId === null){
      RemoveWishingMessage();
      return null;
    }
    else {
      return axiosClient.delete(`/gyms/${gymId}/wishes/${wishingId}`)
    }
  };

  const { isError, error, isLoading, mutate} = useMutation(
    "removeWish",
    RemoveWishHandler,
    {
      onSuccess: (data) => {
        setCounterWishes(counterWishes - 1);
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
  
  if (counterWishes === 0) {
    return (
      <Button disabled variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleRemoveWish}>
        {text}
      </Button>
    );
  } else {
    return (
      <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleRemoveWish}>
        {text}
      </Button>
    );
  }
};

export default RemoveWishButton;