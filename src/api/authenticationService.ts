import axiosInstance from "./axiosInstance";

export async function login(email:string, pin:string) {
  try {
    const requestBody = {
      email : email,
      pinCode : pin
    }

    const response = await axiosInstance.post('/auth/login', requestBody);
    return { response, message: 'Login successful' };
  } catch (error) {
    return console.error('Axios error:', error);
  }
}

export async function logout() {
  try {
    const response = await axiosInstance.post('/auth/logout');
    return { response, message: 'Logout successful' };
  } catch (error) {
    return console.error('Axios error:', error);
  }
}