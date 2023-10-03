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
import { useMutation } from "@apollo/client";
import {createDataTimeUTC} from "@/components/templates/GymIdTemplate/utils";
import RemoveButton from "@/components/templates/GymIdTemplate/organisms/RemoveButton";
import {BOOKING_ITEM, CREATE_BOOKING} from "@/components/templates/GymIdTemplate/organisms/CellForm/CreateBooking";
import {CREATE_WISHING, WISHING_ITEM} from "@/components/templates/GymIdTemplate/organisms/CellForm/CreateWishing";

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
    isOpenGymByHour,
    userId,
    getBookingIdByUserId,
    getWishingIdByUserId,
    wishDisabled,
  }
) => {
  const [open, setOpen] = React.useState(false);
  const start_at = (+hour - 1 + 3) + ':00';
  const end_at = (+hour + 3) + ':00';
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
    isOpenGymByHour = {isOpenGymByHour}
  /> : <RemoveButton
      text = {deleteButtonText}
      userId = {userId}
      gymId = {gymId}
      getEntityIdByUserId = {getWishingIdByUserId}
      counter = {counterWishes}
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

  const [createBookingMutation, {loading, error, data: respBook}] = useMutation(CREATE_BOOKING, {
    onCompleted: (data) => {
      handleClick();
      setResponseMessage("Вы успешно записались на занятие!");
      setSeverity("success");
    },
    onError: (error) => {
      setResponseMessage(error?.message);
      setSeverity("error");
      handleClick();
    },
    update: ((cache, { data: createBookingResponse })  => {
      const createdBooking = createBookingResponse?.createBookingMutation?.booking

      const createdBookingFragment = cache.writeFragment({
        data: createdBooking,
        fragment: BOOKING_ITEM,
      })

      if (!createdBookingFragment) return

      cache.modify({
        fields: {
          getBookingByGymId(previousBookings) {
            return [...previousBookings, createdBookingFragment]
          },
        },
      })
    }),
  })
  const booking = (userId, gymId, start_at, end_at, date) => () => {
    if(userId) {
      if (counter < capacity) {
        createBookingMutation(
          {
            variables: {
              userId: userId,
              gymId: +gymId,
              startAt: new Date(createDataTimeUTC(date, start_at)).toISOString(),
              endAt: new Date(createDataTimeUTC(date, end_at)).toISOString(),
            }
          }
        )
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

  const [createWishingMutation, {loading: loadingWish, error: errorWish, data: respWish}] = useMutation(CREATE_WISHING, {
    onCompleted: (data) => {
      handleClick();
      setResponseMessage("Занятие успешно добавлено в ваш список желаемого!");
      setSeverity("success");
    },
    onError: (error) => {
      setResponseMessage(error?.message);
      setSeverity("error");
      handleClick();
    },
    update: ((cache, { data: createWishingResponse })  => {
      const createdWishing = createWishingResponse?.createWishingMutation?.wishing

      const createdWishingFragment = cache.writeFragment({
        data: createdWishing,
        fragment: WISHING_ITEM,
      })

      if (!createdWishingFragment) return

      cache.modify({
        fields: {
          getWishingByGymId(previousWishings) {
            return [...previousWishings, createdWishingFragment]
          },
        },
      })
    }),
  })
  const wishing = (userId, gymId, start_at, end_at, date) => () => {
    if(userId !== null) {
      createWishingMutation(
        {
          variables: {
            userId: userId,
            gymId: parseInt(gymId),
            startAt: new Date(createDataTimeUTC(date, start_at)).toISOString(),
            endAt: new Date(createDataTimeUTC(date, end_at)).toISOString(),
          }
        }
      )
      handleDialogClose();
    } else {
      setResponseMessage("Вы не можете добавить занятие в список желаемого, пожалуйста авторизуйтесь");
      setSeverity("info");
      handleClick();
    }
  };

  const submitButtonOnClick = isOpenGymByHour ? booking(userId, gymId, start_at, end_at, date):
    wishing(userId, gymId, start_at, end_at, date);

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

