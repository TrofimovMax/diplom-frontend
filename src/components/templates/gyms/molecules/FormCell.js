import {Box, ThemeProvider, createTheme} from "@mui/material";
import { createBooking } from "@/api/booking/createBooking";
import {useMutation} from "react-query";
import useLocalStorage from "@/store/useLocalStorage";

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

const FormCell = ({ gymId, time, date }) =>{
  const [token, setToken] = useLocalStorage("token", "");
  const start_at = (time -1) + ':00';
  const end_at = time + ':00';

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
    const dateUTC = date.substring(3,5) + "/" + date.substring(0,2); // reverse 12/04 to 04/12
    const startAtDate = dateUTC + ' ' + start_at;
    const endAtDate = dateUTC + ' ' + end_at;
    const bookingRequest = {
      gym_id: gymId,
      start_at: startAtDate,
      end_at: endAtDate,
    }
    mutateAsync(bookingRequest);
  };

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

export default FormCell;