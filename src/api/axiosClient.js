import axios from 'axios'
import { API_URI } from "@api/constants"

export default axios.create({
  baseURL: API_URI,
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
    "Authorization": typeof localStorage === 'object' ? localStorage.getItem('token') : null
  },
  crossDomain: true
});
