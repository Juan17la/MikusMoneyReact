import axiosInstance from "./axiosInstance";

export async function getAccount() {
  const response = await axiosInstance.get("/account/details");
  return response.data;
}