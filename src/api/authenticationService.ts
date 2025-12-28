import axiosInstance from "./axiosInstance";

export async function login(email:string, pin:string) {
  try {
    const requestBody = {
      email : email,
      pinCode : pin
    }

    const response = await axiosInstance.post('/auth/login', requestBody);
    return { data: response.data, message: 'Login successful' };
  } catch (error) {
    console.error('Axios error:', error);
    return {data: null, message: 'Login failed'}; 
  }
}

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
  try {
    const requestBody = {
      name,
      lastName,
      birthDate,
      email,
      phoneNumber,
      pinCode: pin,
      pinCodeConfirmation: pinConfirmation,
      password,
      passwordConfirmation
    }

    const response = await axiosInstance.post('/auth/register', requestBody);
    return { data: response.data, message: 'Register successful' };
  } catch (error: any) {
    console.error('Axios error:', error);
    throw new Error(error.response?.data?.message || 'Register failed');
  }
}

export async function logout() {
  try {
    const response = await axiosInstance.post('/auth/logout');
    return { data: response.data, message: 'Logout successful' };
  } catch (error) {
    console.error('Axios error:', error);
    return {data: null, message: 'Logout failed'}; 
  }
}