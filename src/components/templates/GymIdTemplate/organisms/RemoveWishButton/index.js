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
  const RemoveWishHandler = (id) => {
    return axiosClient.delete(`/gyms/${gymId}/wishes/${id}`)
  };

  const { isError, error, isLoading, mutate} = useMutation(
    "removeWish",
    (params) => RemoveWishHandler,
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
    const wishingId = userId === null? null : getWishingIdByUserId(userId);
    if(userId !== null){
      if(wishingId !== null){
        mutate(wishingId);
      } else {
        setResponseMessage("Вы ещё не добавили это занятие в ваш список желаемого");
        setSeverity("info");
        handleClick();
      }
    } else {
      setResponseMessage("Вы не можете убрать запись на занятие из списка желаемого, пожалуйста авторизуйтесь");
      setSeverity("info");
      handleClick();
    }
  }

  if (counterWishes === 0 || counterWishes === null) {
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