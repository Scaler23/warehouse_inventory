import axiosInstance from "./instance/axiosInstance";

export const getMessages = async ({data, token}) => {
  try {
    const response = await axiosInstance.get(`/messages/${data.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export const getMessage = async ({my_token, my_id, contact_person}) => {
  try {
    console.log(my_token, my_id, contact_person);
    const response = await axiosInstance.get(
      `/message/${my_id}/${contact_person}`,
      {
        headers: {
          Authorization: `Bearer ${my_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export const store = async (data) => {
  try {
    const response = await axiosInstance.post("/messages/store", data);
    return response;
  } catch (error) {
    console.error("Error inserting message:", error.message);
    throw error;
  }
};
