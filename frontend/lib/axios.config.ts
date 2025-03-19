import axios from "axios";
import { API_URL } from "@/lib/apiEndpoints";
import { getSession } from "next-auth/react"; // Import getSession for server-side or API route usage

const myAxios = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
  },
});

// Add a request interceptor
myAxios.interceptors.request.use(
  async (config) => {
    try {
      // Get the session (works in API routes or server-side contexts)
      const session = await getSession();

      // If session exists and has a token, attach it to the Authorization header
      const token = session?.user?.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error fetching session in Axios interceptor:", error);
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export default myAxios;
