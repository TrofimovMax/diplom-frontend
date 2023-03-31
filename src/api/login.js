import {API_URI} from "@/api/constants";
import axios from "axios";

export const loginRequestFetch = (params) => {
  return fetch(`${API_URI}/login.json`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(params)
  })
}

export const loginRequest = async (params) => {
  try {
    const response = await axios.post(
      `${API_URI}/login.json`,
      JSON.stringify(params),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};