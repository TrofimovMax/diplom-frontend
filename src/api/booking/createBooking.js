import {API_URI} from "@/api/constants";
import axios from "axios";
export const createBooking = async (params, token, handleClick, setResponseMessage, setSeverity) => {
  try {
    const response = await axios.post(
      `${API_URI}/bookings`,
      params,
      {
        headers: {
          Authorization: token,
        },
        crossDomain: true
      }
    );
    setSeverity("success")
    setResponseMessage(response?.data?.message)
    handleClick({
      vertical: 'top',
      horizontal: 'center',
    })
    return response;
  } catch (error) {
    setSeverity("error")
    setResponseMessage(error.message)
    handleClick({
      vertical: 'top',
      horizontal: 'center',
    })
  }
};
