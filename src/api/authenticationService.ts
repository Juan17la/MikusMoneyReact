import axiosInstance from "./axiosInstance.ts";

// LOGIN
export async function login(email: string, pin: string) {
  const requestBody = {
    email,
    pinCode: pin,
  };

  const response = await axiosInstance.post("/auth/login", requestBody);
  return response.data;
}

// REGISTER
export async function register(
  name: string,
  lastName: string,
  birthDate: string,
  email: string,
  phoneNumber: string,
  pin: string,
  pinConfirmation: string,
  password: string,
  passwordConfirmation: string
) {
  const requestBody = {
    name,
    lastName,
    birthDate,
    email,
    phoneNumber,
    password,
    passwordConfirmation,
    pinCode: pin,
    pinCodeConfirmation: pinConfirmation,
  };

  const response = await axiosInstance.post("/auth/register", requestBody);
  return response.data;
}

// LOGOUT
export async function logout() {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
}
