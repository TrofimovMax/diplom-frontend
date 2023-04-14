import {Box, ThemeProvider, createTheme} from "@mui/material";
import { createBooking } from "@/api/booking/createBooking";
import {useMutation, useQuery} from "react-query";
import useLocalStorage from "@/store/useLocalStorage";
import {getCurrentBookings} from "@/api/booking/getCurrentBookings";
import React, {useState} from "react";
import axios from "axios";
import {API_URI} from "@/api/constants";


const theme = createTheme({
  palette: {
      primary: {
        main:'#00A36C'
      },
      secondary: {
        main: '#7CFC00'
      },
  },
});

const createDataTimeUTC = (date, time) => {
  return new Date().getFullYear() + "-" + date.substring(3,5) + "-" + date.substring(0,2) + ' ' + time;
}

const BookingCell = ({ gymId, time, date }) =>{
  const [token, setToken] = useLocalStorage("token", "");
  const start_at = (time -1) + ':00';
  const end_at = time + ':00';
  const [currentBooking, setCurrentBooking] = useState(999)

  const bookingHandler = async (data) => {
    const response = await createBooking(data, token)
    return response;
  };

  const { mutateAsync } = useMutation( "booking", (data) => {
    bookingHandler(data);
    },
    {
      onSuccess:(res) => {
        alert("Booking was successfully!");
      },
      onError: (error) => {
        alert(error);
      }
    }
  );

  const booking = (gymId, start_at, end_at,date) => {
    const startAtDate = createDataTimeUTC(date, start_at);
    const endAtDate = createDataTimeUTC(date, end_at);
    const bookingRequest = {
      gym_id: gymId,
      start_at: startAtDate,
      end_at: endAtDate,
    }
    mutateAsync(bookingRequest);
  };


  const { data: responseData, isLoading, isError, error } = useQuery( "current_booking", () => axios.get(
        `${API_URI}/bookings_datatime`,
        {start_at: createDataTimeUTC(date, start_at)},
        {
          headers: {
            "Content-type": "application/json"
          },
          crossDomain: true
        }
      ),
    {
      onSuccess: (res) => {
        setCurrentBooking(responseData?.data?.current_bookings);
      }
    }
  );
  return (
    <ThemeProvider theme={theme}>
      <Box
        onClick={() => booking(gymId, start_at, end_at,date, token)}
        sx={{
          height: 1,
          width: 1,
          backgroundColor: 'primary.main',
          '&:hover': {
            backgroundColor: 'secondary.main',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
      </Box>
    </ThemeProvider>
  );
}

export default BookingCell;