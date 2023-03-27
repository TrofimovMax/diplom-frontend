import {API_URI} from "@/api/constants";

export const loginRequest = (params) => {
  return fetch(`${API_URI}/login.json`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(params)
  });
}