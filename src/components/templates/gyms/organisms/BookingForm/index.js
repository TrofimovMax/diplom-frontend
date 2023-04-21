import React from "react";
import {Box, ThemeProvider, createTheme, Typography} from "@mui/material";
import { useMutation } from "react-query";
import { createDataTimeUTC } from "@/components/templates/gyms/utils";
import axiosClient from "@/api/axiosClient";

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

const BookingForm = ({gymId, time, date, capacity, handleClick, setResponseMessage, setSeverity, count, refetchBookings}) => {
  const start_at = (time - 1) + ':00';
  const end_at = time + ':00';

  const { mutate } = useMutation(["create_bookings"], (params) => {
      axiosClient.post(`/gyms/${gymId}/bookings`, params)
    },
    {
      onSuccess: (response) => {
        refetchBookings()
        setSeverity("success")
        setResponseMessage("CAPUT")
        handleClick({
          vertical: 'top',
          horizontal: 'center',
        })
      },
      onError: (error) => {
        setResponseMessage(error.message)
        handleClick({
          vertical: 'top',
          horizontal: 'center',
        })
      }
    }
  );

  const booking = (gymId, start_at, end_at, date) => () => {
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
        onClick={booking(gymId, start_at, end_at, date)}
        sx={{
          height: 1,
          width: 1,
          backgroundColor: activeBackgroundColor,
          '&:hover': {
            backgroundColor: secondaryBackgroundColor,
            opacity: [0.9, 0.8, 0.7],
          },
        }}>
        <Typography variant="caption">{count} / {capacity}</Typography>
      </Box>
    </ThemeProvider>
  );
}

export default BookingForm;