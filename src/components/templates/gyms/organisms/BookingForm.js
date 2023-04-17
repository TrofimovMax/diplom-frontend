import {Box, ThemeProvider, createTheme, Typography, Snackbar, Alert} from "@mui/material";
import {createBooking} from "@/api/booking/createBooking";
import {useMutation, useQuery} from "react-query";
import useLocalStorage from "@/store/useLocalStorage";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {API_URI} from "@/api/constants";


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

const createDataTimeUTC = (date, time) => {
  return new Date().getFullYear() + "-" + date.substring(3, 5) + "-" + date.substring(0, 2) + ' ' + time;
}

const BookingForm = ({gymId, time, date, capacity, handleClick, setResponseMessage, setSeverity}) => {
  const [token, setToken] = useLocalStorage("token", "");
  const [currentBooking, setCurrentBooking] = useState(999);

  const start_at = (time - 1) + ':00';
  const end_at = time + ':00';

  const bookingHandler = async (data) => {
    return await createBooking(data, token, handleClick(), setResponseMessage, setSeverity)
  };

  const { mutateAsync } = useMutation("booking", (request) => {
      bookingHandler(request);
    },
    {
      onSuccess: () => {
        getCurrentBookings()
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
    const startAtDate = createDataTimeUTC(date, start_at);
    const endAtDate = createDataTimeUTC(date, end_at);
    const bookingRequest = {
      gym_id: gymId,
      start_at: startAtDate,
      end_at: endAtDate,
    }
    mutateAsync(bookingRequest)
  };

  const getCurrentBookings = () => {
    axios.get(`${API_URI}/current_bookings`,
      {
        params: {gym_id: gymId, start_at: createDataTimeUTC(date, start_at)},
        headers: {
          "Content-type": "application/json"
        },
        crossDomain: true
      }
    ).then((res) => {
      setCurrentBooking(res?.data?.current_bookings)
    })
  }

  useEffect(() => {
    // Runs ONCE after initial rendering
    getCurrentBookings()
  }, [])

  const createColorCell = (gymId, start_at, end_at,date, token, currentBooking, capacity) =>{
    if(currentBooking >= capacity)
      return(
        <Box
          sx={{
            height: 1,
            width: 1,
            backgroundColor: 'red.main',
            '&:hover': {
              backgroundColor: 'red.main',
              opacity: [0.9, 0.8, 0.7],
            },
          }}>
          <Typography variant="caption">{currentBooking} / {capacity}</Typography>
        </Box>
      )
    if (currentBooking >= capacity * 0.75) {
      return (
        <Box
          onClick={booking(gymId, start_at, end_at, date, token)}
          sx={{
            height: 1,
            width: 1,
            backgroundColor: 'orange.main',
            '&:hover': {
              backgroundColor: 'orange.main',
              opacity: [0.9, 0.8, 0.7],
            },
          }}>
          <Typography variant="caption">{currentBooking} / {capacity}</Typography>
        </Box>
      )
    }
    if (currentBooking >= capacity * 0.5) {
      return(
        <Box
          onClick={booking(gymId, start_at, end_at, date, token)}
          sx={{
            height: 1,
            width: 1,
            backgroundColor: 'yellow.main',
            '&:hover': {
              backgroundColor: 'yellow.main',
              opacity: [0.9, 0.8, 0.7],
            },
          }}>
          <Typography variant="caption" >{currentBooking} / {capacity}</Typography>
        </Box>
      )
    }
    return(
      <Box
        onClick={booking(gymId, start_at, end_at, date, token)}
        sx={{
          height: 1,
          width: 1,
          backgroundColor: 'primary.main',
          '&:hover': {
            backgroundColor: 'secondary.main',
            opacity: [0.9, 0.8, 0.7],
          },
        }}>
        <Typography variant="caption">{currentBooking} / {capacity}</Typography>
      </Box>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      {createColorCell(gymId, start_at, end_at,date, token, currentBooking, capacity)}
    </ThemeProvider>
  );
}

export default BookingForm;