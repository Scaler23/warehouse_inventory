import axiosInstance from "./instance/axiosInstance";

export const verify = async (token) => {
  try {
    const response = await axiosInstance.get("/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error in loginUser:", error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get("/getUsers");
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error in loginUser:", error);
    throw error;
  }
};

export const getManager = async () => {
  try {
    const response = await axiosInstance.get("/getUser/manager");
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error in loginUser:", error);
    throw error;
  }
};

export const getAssociate = async () => {
  try {
    const response = await axiosInstance.get("/getUser/associate");
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error in loginUser:", error);
    throw error;
  }
};

export const roles = async () => {
  try {
    const response = await axiosInstance.get("/roles");
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error in loginUser:", error);
    throw error;
  }
};

export const login = async (data) => {
  try {
    const response = await axiosInstance.post("/login", data);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error in loginUser:", error);
    throw error;
  }
};

export const register = async (data) => {
  try {
    const response = await axiosInstance.post("/register", data);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error in loginUser:", error);
    throw error;
  }
};

export const storeRoles = async (data) => {
  try {
    const response = await axiosInstance.post("/roles/store", data);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error in loginUser:", error);
    throw error;
  }
};
