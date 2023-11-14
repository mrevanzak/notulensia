import { useAuthStore } from "@/stores/use-auth-store";
import axios from "axios";
import { ApiError } from "@/lib/error";

export const httpClient = axios.create({
  baseURL: "https://agenda.saranaintegrasi.co.id/api/v1/crm",
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().access_token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 ||
      error.response?.data?.message === "UNAUTHORIZED"
    ) {
      useAuthStore.getState().logout();
    }
    if (error.response?.status === 400 || error.response?.status === 500) {
      return Promise.reject(new ApiError(error.response?.data));
    }
    return Promise.reject(error);
  },
);
