import {API_URI} from "@/api/constants";
import axios from "axios";
export const getByQueryKey = ({ queryKey }) => {
  console.log(`${API_URI}/${queryKey.join('/')}`)
  return axios.get(
    `${API_URI}/${queryKey.join('/')}`,
    {
      headers: {
        "Content-type": "application/json"
      },
    }
  )
}