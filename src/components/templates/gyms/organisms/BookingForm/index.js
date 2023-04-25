import React, {useContext, useState} from "react";
import {
  Box,
  ThemeProvider,
  createTheme,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions, Button, DialogContentText
} from "@mui/material";
import {useMutation} from "react-query";
import {createDataTimeUTC} from "@/components/templates/gyms/utils";
import axiosClient from "@/api/axiosClient";
import NoticeContext from "@/api/NoticeContext";

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
    }
  },
});

const BookingForm = ({gymId, time, date, capacity, count, refetchBookings}) => {
  const [counter, setCounter] = useState(count);
  const [open, setOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const start_at = (time - 1) + ':00';
  const end_at = time + ':00';

  const {handleClick, setResponseMessage, setSeverity} = useContext(NoticeContext);

  const {data, mutate} = useMutation(["create_bookings"], (params) => {
      axiosClient.post(`/gyms/${gymId}/bookings`, params)
    },
    {
      onSuccess: (response) => {
        refetchBookings()
        setCounter(counter + 1);
        handleClick();
        setResponseMessage("Your successfully crated your booking!");
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

  let activeBackgroundColor = 'primary.main'
  let secondaryBackgroundColor = 'secondary.main'

  if (count >= capacity) {
    activeBackgroundColor = 'red.main'
    secondaryBackgroundColor = 'red.main'
  } else if (count >= capacity * 0.75) {
    activeBackgroundColor = 'orange.main'
    secondaryBackgroundColor = 'orange.main'
  } else if (count >= capacity * 0.5) {
    activeBackgroundColor = 'yellow.main'
    secondaryBackgroundColor = 'yellow.main'
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        onClick={handleDialogOpen}
        sx={{
          height: 1,
          width: 1,
          backgroundColor: activeBackgroundColor,
          '&:hover': {
            backgroundColor: secondaryBackgroundColor,
            opacity: [0.9, 0.8, 0.7],
          },
        }}>
        <Typography variant="caption">{counter} / {capacity}</Typography>
      </Box>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Do you want to book from ${start_at} to ${end_at} on ${date}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Book or add the time when you would like to come to the lesson and we will take it into account when scheduling
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDialogClose}>
            Add wish list
          </Button>
          <Button onClick={booking(gymId, start_at, end_at, date)} autoFocus>
            Book
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default BookingForm;