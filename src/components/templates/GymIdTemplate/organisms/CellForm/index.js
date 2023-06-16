import React, {useContext} from 'react';
import {
  Button,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid, ThemeProvider,
  Typography
} from "@mui/material";
import NoticeContext from "@/api/NoticeContext";
import {useMutation} from "react-query";
import axiosClient from "@/api/axiosClient";
import {createDataTimeUTC} from "@/components/templates/GymIdTemplate/utils";
import RemoveButton from "@/components/templates/GymIdTemplate/organisms/RemoveButton";

const theme = createTheme({
  palette: {
    primary: {
      main: '#4F9DE9'
    },
    secondary: {
      main: '#B3D4F4'
    },
    yellow: {
      main: '#FFEA00'
    },
    orange: {
      main: '#FFBF00'
    },
    red: {
      main: '#FF0000'
    },
    white: {
      main: '#FFFFFF',
      secondary: '#e5e5e5',
    }
  },
});

export const CellForm = (
  {
    data,
    date,
    hour,
    counter,
    counterWishes,
    setCounterWishes,
    isOpenGymByHour,
    userId,
    getBookingIdByUserId,
    getWishingIdByUserId,
    wishDisabled,
    refetch, refetchWishes
  }
) => {
  const [open, setOpen] = React.useState(false);

  const start_at = (hour - 1) + ':00';
  const end_at = hour + ':00';
  const gymId = data?.id;
  const capacity = data?.capacity;

  const dialogTitle = isOpenGymByHour ? `Вы хотите записаться ${date} с ${start_at} до ${end_at}?`:
    `Вы хотели бы заниматься ${date} с ${start_at} до ${end_at}?`;
  const dialogContentText = isOpenGymByHour ? 'Записавшись на занятие вы гарантированно получите оздоровительные услуги под руководством профессиональных тренеров':
    'Добавте часы, в которое Вам было бы удобно заниматься и мы учём это при составлении расписания';
  const submitButtonText = isOpenGymByHour ? "Записаться": "Отправить";
  const deleteButtonText = isOpenGymByHour ? "Отписаться": "Отменить";
  const deleteButton = isOpenGymByHour ? <RemoveButton
    text = {deleteButtonText}
    userId = {userId}
    gymId = {gymId}
    getEntityIdByUserId = {getBookingIdByUserId}
    counter = {counter}
    refetch={refetch}
    isOpenGymByHour = {isOpenGymByHour}
  /> : <RemoveButton
      text = {deleteButtonText}
      userId = {userId}
      gymId = {gymId}
      getEntityIdByUserId = {getWishingIdByUserId}
      counter = {counterWishes}
      refetch={refetchWishes}
      isOpenGymByHour = {isOpenGymByHour}
  />

  const countBooking = isOpenGymByHour ? <Typography paddingLeft={2} variant="caption">{counter} / {capacity}</Typography>:
    null;

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const {handleClick, setResponseMessage, setSeverity} = useContext(NoticeContext);

  const { mutate } = useMutation(
    "create_bookings",
    (params) => axiosClient.post(`/gyms/${gymId}/bookings`, params),
    {
      onSuccess: (response) => {
        handleClick();
        setResponseMessage("Вы успешно записались на занятие!");
        setSeverity("success");
        refetch()
      },
      onError: (error) => {
        setResponseMessage(error?.message);
        setSeverity("error");
        handleClick();
      }
    }
  );
  const booking = (gymId, start_at, end_at, date) => () => {
    if(userId) {
      if (counter < capacity) {
        mutate({
          start_at: createDataTimeUTC(date, start_at),
          end_at: createDataTimeUTC(date, end_at),
        })
        handleDialogClose();
      } else {
        setResponseMessage("Мест для записи больше нет");
        setSeverity("error");
        handleClick();
      }
    } else {
      setResponseMessage("Вы не можете записаться, пожалуйста авторизуйтесь");
      setSeverity("info");
      handleClick();
    }
  };

  const { mutateAsync } = useMutation(["create_wishes"], (params) => {
      axiosClient.post(`/gyms/${gymId}/wishes`, params)
    },
    {
      onSuccess: (response) => {
        setCounterWishes(counterWishes + 1);
        handleClick();
        setResponseMessage("Занятие успешно добавлено в ваш список желаемого");
        setSeverity("success");
      },
      onError: (error) => {
        handleClick();
        setResponseMessage(error?.message);
        setSeverity("error");
      }
    }
  );

  const wishing = (gymId, start_at, end_at, date) => () => {
    if(userId !== null) {
      handleDialogClose();
      mutateAsync({
        start_at: createDataTimeUTC(date, start_at),
        end_at: createDataTimeUTC(date, end_at),
      })
    } else {
      setResponseMessage("Вы не можете добавить занятие в список желаемого, пожалуйста авторизуйтесь");
      setSeverity("info");
      handleClick();
    }
  };

  const submitButtonOnClick = isOpenGymByHour ? booking(gymId, start_at, end_at, date):
    wishing(gymId, start_at, end_at, date);

  const initMainColor = () =>{
    if (counter >= capacity) {
      return 'red.main';
    } else if (counter >= capacity * 0.75) {
      return 'orange.main';
    } else if (counter >= capacity * 0.5) {
      return 'yellow.main';
    } else {
      return 'primary.main';
    }
  }
  const initSecondaryColor = () =>{
    if (counter >= capacity) {
      return 'red.main';
    } else if (counter >= capacity * 0.75) {
      return 'orange.main';
    } else if (counter >= capacity * 0.5) {
      return 'yellow.main';
    } else {
      return 'secondary.main';
    }
  }

  const activeBackgroundColor = isOpenGymByHour ? initMainColor(): 'white.main';
  const secondaryBackgroundColor = isOpenGymByHour ? initSecondaryColor(): 'white.secondary';

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        onClick={handleDialogOpen}
        sx={{
          height: 1,
          width: 1,
          backgroundColor: activeBackgroundColor,
          '&:hover': {
            backgroundColor: secondaryBackgroundColor,
            opacity: [0.9, 0.8, 0.7],
          },
        }}
        spacing={0}
      >
        <Grid item xs>
          {countBooking}
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogContentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          { deleteButton }
          <Button
            variant="outlined"
            color="error"
            onClick={handleDialogClose}
          >
            Назад
          </Button>
          <Button
            disabled={wishDisabled}
            variant="contained"
            color="success"
            autoFocus
            onClick={submitButtonOnClick}
          >
            {submitButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

