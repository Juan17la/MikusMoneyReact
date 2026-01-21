import axiosInstance from "./axiosInstance";

export async function getAccount() {
  const response = await axiosInstance.get("/account");
  return response.data;
}