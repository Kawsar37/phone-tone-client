import axios from "axios";
import { IPhone, ICartItem, IOrder, IUser } from "@/types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const authAPI = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post("/api/auth/register", data),
  login: (data: { email: string; password: string }) =>
    api.post("/api/auth/login", data),
  logout: () => api.post("/api/auth/logout"),
  getMe: () => api.get("/api/auth/me"),
};

export const phoneAPI = {
  getPhones: (params: {
    page?: number;
    limit?: number;
    search?: string;
    brand?: string;
    ram?: string;
    sort?: string;
    minPrice?: number;
    maxPrice?: number;
  }) => api.get("/api/phones", { params }),

  getPhoneById: (id: string) => api.get(`/api/phones/${id}`),
  addPhone: (data: { name: string; brand: string; images: string[] }) =>
    api.post("/api/phones", data),
  deletePhone: (id: string) => api.delete(`/api/phones/${id}`),
  updatePhone: (id: string, data: Partial<IPhone>) =>
    api.patch(`/api/phones/${id}`, data),
};

export const cartAPI = {
  getCart: () => api.get("/api/cart"),
  addToCart: (data: { phoneId: string; quantity: number }) =>
    api.post("/api/cart", data),
  removeFromCart: (cartItemId: string) => api.delete(`/api/cart/${cartItemId}`),
  updateCartQuantity: (cartItemId: string, quantity: number) =>
    api.patch(`/api/cart/${cartItemId}`, { quantity }),
  clearCart: () => api.delete("/api/cart"),
};

export const orderAPI = {
  createOrder: (data: {
    shippingAddress: {
      fullName: string;
      phone: string;
      district: string;
      area: string;
      address: string;
    };
    paymentMethod: string;
  }) => api.post("/api/orders", data),
  getMyOrders: () => api.get("/api/orders/my"),
  getAllOrders: () => api.get("/api/orders"),
  updateOrderStatus: (orderId: string, orderStatus: string) =>
    api.patch(`/api/orders/${orderId}/status`, { orderStatus }),
};

export const userAPI = {
  getAllUsers: () => api.get("/api/users"),
  updateUserStatus: (userId: string, status: "active" | "blocked") =>
    api.patch(`/api/users/${userId}/status`, { status }),
};

export const adminAPI = {
  getStats: () => api.get("/api/admin/stats"),
  getMonthlyOrders: () => api.get("/api/admin/monthly-orders"),
};
