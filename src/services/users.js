import AxiosInterceptor from "../config/axiosInterceptor";
import { toast } from "react-toastify";

const handleCreateUserData = async (url, data) => {
  try {
    const response = await AxiosInterceptor.post(url, data);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);

    throw new Error(error.response.data.message);
  }
};

const handleGetUserData = async (url) => {
  try {
    const response = await AxiosInterceptor.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const handleUpdateUserData = async (url, data) => {
  try {
    const response = await AxiosInterceptor.put(url, data);
    return response?.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const handleDeleteUserData = async (url) => {
  try {
    const response = await AxiosInterceptor.delete(url);
    return response?.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export {
  handleCreateUserData,
  handleGetUserData,
  handleUpdateUserData,
  handleDeleteUserData,
};
