import {API_URI} from "@/api/constants";
import axios from "axios";
export const createBooking = async (params, token) => {
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
    return response;
  } catch (error) {
    alert(error);
  }
};
