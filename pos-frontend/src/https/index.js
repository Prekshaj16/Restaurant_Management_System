import axios from "axios";

const baseURL = "https://restaurant-backend-ochre.vercel.app";

const api = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

// Add response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized error
            console.error("Authentication error:", error.response?.data?.message);
        }
        return Promise.reject(error);
    }
);

// API Endpoints

// Auth Endpoints
export const login = async (data) => {
    return await api.post("/api/user/login", data);
}

export const register = async (data) => {
    return await api.post("/api/user/register", data);
}

export const getUserData = async () => {
    return await api.get("/api/user");
}

export const logout = async () => {
    return await api.post("/api/user/logout");
}

// Table Endpoints
export const addTable = async (data) => {
    return await api.post("/api/table", data);
}

export const getTables = async () => {
    return await api.get("/api/table");
}

export const updateTable = async ({ tableId, ...tableData }) => {
    return await api.put(`/api/table/${tableId}`, tableData);
}

// Payment Endpoints
export const createOrderRazorpay = async (data) => {
    return await api.post("/api/payment/create-order", data);
}

export const verifyPaymentRazorpay = async (data) => {
    return await api.post("/api/payment/verify-payment", data);
}

// Order Endpoints
export const addOrder = async (data) => {
    return await api.post("/api/order", data);
}

export const getOrders = async () => {
    return await api.get("/api/order");
}

export const updateOrderStatus = async ({ orderId, orderStatus }) => {
    return await api.put(`/api/order/${orderId}`, { orderStatus });
}

export default api;
