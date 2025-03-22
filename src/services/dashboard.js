import AxiosInterceptor from "../config/axiosInterceptor";

const handleGetUserActivity = async () => {
  try {
    const response = await AxiosInterceptor.get("/auth/profile/user-activity");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const handleGetSalesData = async () => {
  try {
    const response = await AxiosInterceptor.get("/product/sales");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export { handleGetSalesData, handleGetUserActivity };
