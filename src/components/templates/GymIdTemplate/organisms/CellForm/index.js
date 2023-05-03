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
import {useMutation, useQuery} from "react-query";
import axiosClient from "@/api/axiosClient";
import {createDataTimeUTC} from "@/components/templates/GymIdTemplate/utils";
import RemoveBookingButton from "@/components/templates/GymIdTemplate/organisms/RemoveBookingButton";
import RemoveWishButton from "@/components/templates/GymIdTemplate/organisms/RemoveWishButton";

const theme = createTheme({
  palette: {
    primary: {
      main: '#00A36C'
    },
    secondary: {
      main: '#7CFC00'
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
    date,
    hour,
    gymId,
    capacity,
    counter,
    setCounter,
    counterWishes,
    setCounterWishes,
    isOpenGymByHour,
    userId,
    getBookingIdByUserId,
    getWishingIdByUserId
  }
) => {

  const [open, setOpen] = React.useState(false);

  const start_at = (hour - 1) + ':00';
  const end_at = hour + ':00';

  const dialogTitle = isOpenGymByHour ? `Do you want to book from ${start_at} to ${end_at} on ${date}?`:
    `Do you want to add in wish list from ${start_at} to ${end_at} on ${date}?`;
  const dialogContentText = isOpenGymByHour ? 'some book':
    'Add the time when you would like to come to the lesson and we will take it into account when scheduling';
  const submitButtonText = isOpenGymByHour ? "Book": "Add wish list";
  const deleteButtonText = isOpenGymByHour ? "Delete book": "Remove from wish list";
  const deleteButton = isOpenGymByHour ? <RemoveBookingButton
    text = {deleteButtonText}
    userId = {userId}
    gymId = {gymId}
    getBookingIdByUserId = {getBookingIdByUserId}
    counter = {counter}
    setCounter = {setCounter}
  />: <RemoveWishButton
    text = {deleteButtonText}
    userId = {userId}
    gymId = {gymId}
    getWishingIdByUserId = {getWishingIdByUserId}
    counterWishes = {counterWishes}
    setCounterWishes = {setCounterWishes}
  />;
  const countBooking = isOpenGymByHour ? <Typography paddingLeft={2} variant="caption">{counter} / {capacity}</Typography>:
    null;
  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const {handleClick, setResponseMessage, setSeverity} = useContext(NoticeContext);

  const { mutate } = useMutation(["create_bookings"], (params) => {
      axiosClient.post(`/gyms/${gymId}/bookings`, params)
    },
    {
      onSuccess: (response) => {
        setCounter(counter + 1);
        handleClick();
        setResponseMessage("Your successfully created your booking!");
        setSeverity("success");
      },
      onError: (error) => {
        handleClick();
        setResponseMessage(error?.message);
        setSeverity("error");
      }
    }
  );
  const booking = (gymId, start_at, end_at, date) => () => {
    handleDialogClose();
    mutate({
      start_at: createDataTimeUTC(date, start_at),
      end_at: createDataTimeUTC(date, end_at),
    })
  };

  const { mutateAsync } = useMutation(["create_wishes"], (params) => {
      axiosClient.post(`/gyms/${gymId}/wishes`, params)
    },
    {
      onSuccess: (response) => {
        handleClick();
        setResponseMessage("Your successfully created your wish in list!");
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
    handleDialogClose();
    mutateAsync({
      start_at: createDataTimeUTC(date, start_at),
      end_at: createDataTimeUTC(date, end_at),
    })
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
          <Button variant="outlined" color="error" onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" color="success" autoFocus onClick={submitButtonOnClick}>
            {submitButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

