import axiosInstance from "./axiosInstance";

export async function getSavingsPigs() {
  const response = await axiosInstance.get("/savings/pig/all");
  return response.data;
}

export function createSavingsPig(nameGoal: string, goal: number) {
  const requestBody = {
    nameGoal,
    goal,
  };

  return axiosInstance.post(`/savings/pig/create`, requestBody);
}

export function saveSavingPigs(amount: number, pinCode: string, id:number) {
    const requestBody = {
        amount,
        pinCode,
    }
    return axiosInstance.post(`/savings/pig/${id}/save`, requestBody);
}

export function breakSavingPigs(amount: number, pinCode: string, id:number) {
    const requestBody = {
        amount,
        pinCode,
    }
    return axiosInstance.post(`/savings/pig/${id}/break`, requestBody);
}