import { toast, type ToastOptions } from "react-toastify";
import { getErrorMessage } from "./apiError";

const DEFAULT_OPTIONS: ToastOptions = { autoClose: 4500 };

/**
 * Show a user-friendly error toast for any thrown value.
 *
 * The message is resolved through {@link getErrorMessage}, so it is always safe
 * to show — never a raw backend/debug string.
 */
export function notifyError(error: unknown, fallback?: string): void {
  toast.error(getErrorMessage(error, fallback), DEFAULT_OPTIONS);
}

/** Show a success toast. */
export function notifySuccess(message: string): void {
  toast.success(message, DEFAULT_OPTIONS);
}
