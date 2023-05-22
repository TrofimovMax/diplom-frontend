import axiosClient from "@/api/axiosClient";
export const signUpRequest = async (params) => {
  try {
    const response = await axiosClient.post(
      `/signup`,
      JSON.stringify(params),
      {
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        crossDomain: true
      }
    );
    return response.data;
  } catch (error) {
    throw {
      status: error?.response?.status,
      code: error?.code,
      message: error?.message
    }
  }
};