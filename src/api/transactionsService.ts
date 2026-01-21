import axiosInstance from "./axiosInstance";


export function deposit(amount: number, pinCode: string) {
    const requestBody = {
        amount,
        pinCode,
    }
    return axiosInstance.post("/transactions/deposit", requestBody, {
        headers: {
            'X-Idempotency-Key': crypto.randomUUID(),
        }
    });
}

export function withdraw(amount: number, pinCode: string) {
    const requestBody = {
        amount,
        pinCode,
    }
    return axiosInstance.post("/transactions/withdraw", requestBody, {
        headers: {
            'X-Idempotency-Key': crypto.randomUUID(),
        }
    });
}

export function transfer(amount: number, receiverPublicCode: string, pinCode: string) {
    const requestBody = {
        amount,
        receiverPublicCode, 
        pinCode,
    }
    return axiosInstance.post("/transactions/transfer", requestBody, {
        headers: {
            'X-Idempotency-Key': crypto.randomUUID(),
        }
    });
}

export async function getTransactionHistory() {
    const response = await axiosInstance.get("/transactions/history");
    return response.data;
}