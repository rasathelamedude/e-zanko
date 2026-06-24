import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

/**
 * interceptors in axios:
 *  1. modify a request before sending it.
 *  2. or modify a response after receiving it.
 *
 * Here, we use them to handle error responses, instead of having try/catch blocks everywhere inside /api funcitons
 *
 * The /api functions only call the api and return the data.
 * In case backend returns and error, the following code catches it and throws it
 * From there the thrown error is caught by the global error handler.
 */

api.interceptors.response.use(
  // if response is successful, return it
  (response) => response,
  // if error found, throw it
  (error) => {
    const backendMessage = error.response?.data?.message;
    const finalMessage = backendMessage || "Something went wrong";

    console.error("[API Error]:", finalMessage);

    return Promise.reject(new Error(finalMessage));
  },
);

export default api;
