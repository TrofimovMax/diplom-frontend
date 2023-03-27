import { API_URI } from "@/api/constants";

export const signUpRequest = (params) => {
  return fetch(`${API_URI}/signup.json`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(params)
  })
}