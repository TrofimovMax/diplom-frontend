import axios from "axios";

export const login = async ({ email, password }) => {
  try {
    const { data } = await axios.post(`http://localhost:3000/login.json`, { email, password });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const signup = async (url ,{ name, email, password }) => {
  try {
    const { data } = await axios.post(url , { name, email, password });
    return data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};