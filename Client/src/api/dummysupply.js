import axiosInstance from "./instance/axiosInstance";

export const getDummySupplies = async () => {
  try {
    const response = await axiosInstance.get("/dummysupplies");
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
