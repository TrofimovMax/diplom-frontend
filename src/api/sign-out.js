import axiosClient from "@api/axiosClient";
export const signOutRequest = async (token) => {
  try {
    return await axiosClient.delete(`/logout`);
  } catch (error) {
    if (error.response.status === 401) {
      alert("401 Unauthorized: Couldn\"t find an active session. Please login again.")
      localStorage.removeItem("token");
    }
    else {
      alert(error);
    }
  }
};