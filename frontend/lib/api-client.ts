import axios from "axios";
import { getSession } from "next-auth/react";
import { API_URL } from "@/lib/apiEndpoints";

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  if (session?.isImpersonating) {
    config.headers["X-Impersonating"] = "true";
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Force sign out if unauthorized
      //   window.location.href = '/auth/login';
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const authService = {
  startImpersonation: async (managerId: string) => {
    const response = await apiClient.post("/impersonate/start", {
      manager_id: managerId,
    });
    return response.data;
  },
  stopImpersonation: async (impersonatorId: number) => {
    const response = await apiClient.post("/impersonate/stop", {
      impersonatorId,
    });
    return response.data;
  },
};

export default apiClient;
