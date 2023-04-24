import axiosClient from "@/api/axiosClient";
export const loginRequest = async (params) => {
  try {
    const response = await axiosClient.post(
      `/login`,
      JSON.stringify(params),
      {
        headers: {
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