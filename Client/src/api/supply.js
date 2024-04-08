import axiosInstance from "./instance/axiosInstance";

export const getSupplies = async () => {
  try {
    const response = await axiosInstance.get("/supplies");
    return await response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const completed = async () => {
  try {
    const response = await axiosInstance.get("/supplies/completed");
    return await response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const store = async (data) => {
  try {
    const response = await axiosInstance.post("/supplies/store", data);
    return await response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const status = async (data) => {
  try {
    const response = await axiosInstance.patch("/supplies/status", data);
    return await response.data;
  } catch (error) {
    console.log(error.message);
  }
};

// Rest of your code...
