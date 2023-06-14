import React, {useContext} from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import {Button} from "@mui/material";
import {useMutation} from "react-query";
import axiosClient from "@/api/axiosClient";
import IsLoading from "@/components/molecules/isLoading";
import IsError from "@/components/molecules/IsError";
import NoticeContext from "@/api/NoticeContext";

const RemoveButton = ({ text, gymId, userId, getEntityIdByUserId, counter, refetch, isOpenGymByHour }) => {
    const {handleClick, setResponseMessage, setSeverity} = useContext(NoticeContext);
    const path = isOpenGymByHour ? 'bookings': 'wishes'
    const { isError, error, isLoading, mutate} = useMutation(
        "removeEntity",
        (params) => axiosClient.delete(`/gyms/${gymId}/${path}/${params}`),
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
    const handleRemoveEntity = () => {
        const entityId = getEntityIdByUserId(userId)
        if (userId) {
            if (entityId) {
                mutate(entityId)
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
            onClick={handleRemoveEntity}
        >
            {text}
        </Button>
    );
};

export default RemoveButton;