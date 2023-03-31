import {API_URI} from "@/api/constants";
import axios from "axios";

export const loginRequest = async (params) => {
  try {
    const response = await axios.post(
      `${API_URI}/login`,
      JSON.stringify(params),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        crossDomain: true
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};