import axios, { AxiosHeaders } from "axios";
import { useUserStore } from "../store/userStore";
import { normalizeAxiosError } from "./apiError";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Pages that are reachable while logged out — a 401 here (e.g. the AuthProvider
// bootstrap) must NOT bounce the user away from a valid public link.
const PUBLIC_PATHS = [
  "/login",
  "/reset-password",
  "/forbidden",
  "/unauthorized",
  "/verify",
];

const isPublicPath = (pathname: string): boolean =>
  PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));

/**
 * interceptors in axios:
 *  1. modify a request before sending it.
 *  2. or modify a response after receiving it.
 *
 * Here, we use them to handle error responses, instead of having try/catch
 * blocks everywhere inside /api functions.
 *
 * The /api functions only call the api and return the data. On failure, the
 * interceptor normalizes the raw axios error into a UI-safe `ApiError` (never
 * leaking Laravel debug output) and rejects with it. React Query then surfaces
 * it — via the global toast handler or a component's inline error UI.
 */

api.interceptors.response.use(
  // if response is successful, return it
  (response) => response,
  // if error found, normalize it into a UI-safe ApiError and reject
  (error) => {
    const wasAuthenticated = Boolean(useUserStore.getState().token);
    const apiError = normalizeAxiosError(error, {
      authenticated: wasAuthenticated,
    });
    const { pathname } = window.location;

    if (apiError.status === 401) {
      useUserStore.getState().clearAuth();

      // Only force a redirect when a real session expired mid-use. Logged-out
      // visitors to protected routes are handled by <ProtectedRoutes>, and
      // public pages should never be interrupted.
      if (wasAuthenticated && !isPublicPath(pathname)) {
        window.location.href = "/login";
      }

      return Promise.reject(apiError);
    }

    if (apiError.status === 403) {
      if (pathname !== "/forbidden") {
        window.location.href = "/forbidden";
      }
      return Promise.reject(apiError);
    }

    return Promise.reject(apiError);
  },
);

api.interceptors.request.use(
  (config) => {
    const token = useUserStore.getState().token;
    const headers = config.headers ?? new AxiosHeaders();

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    } else {
      headers.delete("Authorization");
    }

    config.headers = headers;
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
