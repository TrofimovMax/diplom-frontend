import {API_URI} from "@/api/constants";
import axios from "axios";

export const signOutRequest = async (token) => {
  try {
    return await axios.delete(
      `${API_URI}/logout`,
      {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }
    );
  } catch (error) {
    if (error.response.status === 401) {
      alert('401 Unauthorized: Couldn\'t find an active session. Please login again.')
      localStorage.removeItem('token');
    }
    else {
      alert(error);
    }
  }
};