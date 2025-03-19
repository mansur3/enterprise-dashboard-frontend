import AxiosInterceptor from "../config/axiosInterceptor";

const handleCreateUserData = async (url, data) => {
  try {
    const response = await AxiosInterceptor.post(url, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export { handleCreateUserData };
