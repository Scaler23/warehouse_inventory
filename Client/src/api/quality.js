import axiosInstance from "./instance/axiosInstance";

export const getReports = async () => {
  try {
    const response = await axiosInstance.post("/quality");
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error in loginUser:", error);
    throw error;
  }
};

export const rating = async () => {
  try {
    const response = await axiosInstance.get("/quality/rating");
    return await response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const completed = async () => {
  try {
    const response = await axiosInstance.get("/quality/completed");
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error in loginUser:", error);
    throw error;
  }
};

export const store = async (data) => {
  try {
    const response = await axiosInstance.post("/quality/store", data);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error in loginUser:", error);
    throw error;
  }
};

export const patch = async (data) => {
  try {
    const {reporst_id} = data;
    const response = await axiosInstance.post(
      `/quality/patch/${reporst_id}`,
      data
    );
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error in loginUser:", error);
    throw error;
  }
};
