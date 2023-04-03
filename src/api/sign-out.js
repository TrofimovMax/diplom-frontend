import {API_URI} from "@/api/constants";
import axios from "axios";

export const signOutRequest = async (token) => {
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
    alert(error);
  }
};