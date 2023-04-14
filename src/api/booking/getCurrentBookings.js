import {API_URI} from "@/api/constants";
import axios from "axios";
export const getCurrentBookings = (params) => {
 return axios.get(
    `${API_URI}/bookings_datatime`,
    params,
    {
      headers: {
        "Content-type": "application/json"
      },
      crossDomain: true
    }
  )
}