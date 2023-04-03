import {API_URI} from "@/api/constants";
import axios from "axios";

export const signOutRequest = async (token) => {
  try {
    const response = await axios.delete(
      `${API_URI}/logout`,
      {
        headers: {
          Authorization: token
        }
      }
    );
    return response;
  } catch (error) {
    alert(error);
  }
};