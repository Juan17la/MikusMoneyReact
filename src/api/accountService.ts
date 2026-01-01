import axiosInstance from "./axiosInstance";

export async function getAccount() {
  try {
    const response = await axiosInstance.get('/account/details');
    return response.data;
  } catch (error) {
    console.error('Axios error:', error);
    throw error;
  }
}