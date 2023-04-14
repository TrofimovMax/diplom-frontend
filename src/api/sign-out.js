import {API_URI} from "@/api/constants";
import axios from "axios";

export const signOutRequest = async (token, setToken) => {
  try {
    return await axios.delete(
      `${API_URI}/logout`,
      {
        headers: {
          Authorization: token
        }
      }
    );
  } catch (error) {
    if (error.response.status === 401) {
      alert('401 Unauthorized: Couldn\'t find an active session. Please login again.')
      setToken("");
    }
    else {
      alert(error);
    }
  }
};