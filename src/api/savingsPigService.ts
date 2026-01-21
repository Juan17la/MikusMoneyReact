import axiosInstance from "./axiosInstance";

export async function getSavingsPigs() {
  const response = await axiosInstance.get("/savings-pigs/active");
  return response.data;
}

export function createSavingsPig(nameGoal: string, goal: number) {
  const requestBody = {
    nameGoal,
    goal,
  };

  return axiosInstance.post(`/savings-pigs`, requestBody);
}

export function saveSavingPigs(amount: number, pinCode: string, id:number) {
    const requestBody = {
        amount,
        pinCode,
    }
    return axiosInstance.post(`/savings-pigs/${id}/deposit`, requestBody);
}

export function breakSavingPigs(amount: number, pinCode: string, id:number) {
    const requestBody = {
        amount,
        pinCode,
    }
    return axiosInstance.post(`/savings-pigs/${id}/break`, requestBody);
}