import axiosInstance from "./instance/axiosInstance";

export const getStorages = async () => {
  try {
    const response = await axiosInstance.get("/storageloc");
    return await response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const store = async (data) => {
  try {
    const response = await axiosInstance.post("/storageloc/store", data);
    return await response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const patch = async (data) => {
  try {
    const response = await axiosInstance.patch("/storageloc/patch", data);
    return await response.data;
  } catch (error) {
    console.log(error.message);
  }
};

// Rest of your code...
