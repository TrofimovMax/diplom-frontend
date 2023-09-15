import React, {useContext} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {Button} from "@mui/material";
import IsLoading from "@components/molecules/isLoading";
import IsError from "@components/molecules/IsError";
import NoticeContext from "@api/NoticeContext";
import {useDeleteBookingMutationMutation} from "./__generated__/DeleteBooking.mutation";
import {useDeleteWishingMutationMutation} from "./__generated__/DeleteWishing.mutation";

const RemoveButton = ({ text, gymId, userId, getEntityIdByUserId, counter, isOpenGymByHour }) => {
    const {handleClick, setResponseMessage, setSeverity} = useContext(NoticeContext);

    const [deleteBooking, {error: bookingError, loading:removeLoading}] = useDeleteBookingMutationMutation( {
        onCompleted: (data) => {
            handleClick();
            setResponseMessage("Вы успешно отписались от занятия!");
            setSeverity("success");
        },
        onError: (error) => {
            setResponseMessage(error?.message);
            setSeverity("error");
            handleClick();
        },
        update(cache, {data: deleteBooking})
        {
            cache.modify({
                fields: {
                    getBookingByGymId(currentBooking = []){
                        return currentBooking.filter(booking =>
                          booking.__ref !== `Booking:${deleteBooking["deleteBookingMutation"]["booking"].id}`)
                    }
                }
            })
        }
    })

    const [deleteWishing, {error: wishError, loading:wishLoading}] = useDeleteWishingMutationMutation( {
        onCompleted: (data) => {
            handleClick();
            setResponseMessage("Вы успешно убрали занятие из списка желаемого!");
            setSeverity("success");
        },
        onError: (error) => {
            setResponseMessage(error?.message);
            setSeverity("error");
            handleClick();
        },
        update(cache, {data: deleteWishing})
        {
            cache.modify({
                fields: {
                    getWishingByGymId(currentWishing = []){

                        return currentWishing.filter(wishing =>
                            wishing.__ref !== `Wishing:${deleteWishing["deleteWishingMutation"]["wishing"].id}`
                        )
                    }
                }
            })
        }
    })

    if (removeLoading || wishLoading) return <IsLoading/>
    if (bookingError || wishError) return <IsError />
    const deleteEntity = (args) => {
        isOpenGymByHour ? deleteBooking(args): deleteWishing(args);
    }
    const handleRemoveEntity = () => {
        const entityId = getEntityIdByUserId(userId)
        if (!userId) {
            handleClick();
            setResponseMessage("Вы не можете убрать запись на занятие, пожалуйста авторизуйтесь");
            setSeverity("info");
            return;
        }

        if (!entityId) {
            handleClick();
            setResponseMessage("Вы ещё не записаны на это занятие");
            setSeverity("info");
            return;
        }

        // At this point, both userId and entityId are defined
        deleteEntity({
            variables: {
                id: entityId.toString() // Convert to string if necessary
            }
        });
    }

    return (
        <Button
            disabled={removeLoading || wishLoading || !counter || !userId}
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