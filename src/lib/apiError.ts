import { AxiosError, type AxiosResponse } from "axios";
import i18n from "../i18n";

export type FieldErrors = Record<string, string[]>;

/**
 * Shape of a Laravel error body.
 *
 * `exception` / `file` / `line` / `trace` are only present when Laravel returns
 * an *unhandled* exception with APP_DEBUG=true. Handled responses (validation
 * errors, `abort(4xx, "msg")`) never include them — we use that to tell a safe
 * message apart from a raw debug dump.
 */
interface LaravelErrorBody {
  message?: string;
  errors?: FieldErrors;
  exception?: string;
  file?: string;
  line?: number;
  trace?: unknown;
}

/**
 * A normalized, UI-safe error used across the whole app.
 *
 * The axios interceptor converts every failed request into an ApiError so the
 * rest of the app never has to reach into `error.response.data`. The `message`
 * it exposes is always safe to show to a user — raw Laravel debug output (stack
 * traces, SQL, file paths) is never surfaced. See {@link normalizeAxiosError}.
 */
export class ApiError extends Error {
  readonly status: number | null;
  readonly code: string | null;
  readonly fieldErrors: FieldErrors;
  readonly isNetworkError: boolean;
  readonly isTimeout: boolean;
  /** Raw backend message, kept for logging only — never blindly shown. */
  readonly rawMessage?: string;

  constructor(
    message: string,
    options: {
      status?: number | null;
      code?: string | null;
      fieldErrors?: FieldErrors;
      isNetworkError?: boolean;
      isTimeout?: boolean;
      rawMessage?: string;
    } = {},
  ) {
    super(message);
    this.name = "ApiError";
    this.status = options.status ?? null;
    this.code = options.code ?? null;
    this.fieldErrors = options.fieldErrors ?? {};
    this.isNetworkError = options.isNetworkError ?? false;
    this.isTimeout = options.isTimeout ?? false;
    this.rawMessage = options.rawMessage;
  }

  /** First field-level validation message, handy for inline form errors. */
  get firstFieldError(): string | undefined {
    return Object.values(this.fieldErrors)[0]?.[0];
  }
}

// Translate through i18next. Missing keys fall back to the passed English
// string, matching how the rest of the app uses `t("Full sentence")`.
const tr = (message: string): string => i18n.t(message);

const fallbackMessage = (): string =>
  tr("Something went wrong. Please try again.");

// A debug dump means `message` is a raw exception string — never show it.
function isDebugDump(body: LaravelErrorBody | undefined): boolean {
  return (
    !!body &&
    typeof body === "object" &&
    ("exception" in body || "trace" in body || "file" in body)
  );
}

function resolveUserMessage(opts: {
  status: number | null;
  isNetworkError: boolean;
  isTimeout: boolean;
  backendMessage?: string;
  fieldErrors: FieldErrors;
  authenticated: boolean;
}): string {
  const {
    status,
    isNetworkError,
    isTimeout,
    backendMessage,
    fieldErrors,
    authenticated,
  } = opts;

  if (isTimeout) return tr("The request timed out. Please try again.");
  if (isNetworkError)
    return tr(
      "Unable to reach the server. Check your connection and try again.",
    );

  switch (status) {
    case 401:
      // A 401 while logged in means the session expired. A 401 while logged out
      // is a failed login / credential check — surface the backend's specific
      // reason (e.g. "Invalid Credentials") instead.
      if (!authenticated && backendMessage) return backendMessage;
      return tr("Your session has expired. Please sign in again.");
    case 403:
      return tr("You don't have permission to perform this action.");
    case 404:
      return backendMessage || tr("The requested item could not be found.");
    case 419:
      return tr("Your session expired. Please refresh the page and try again.");
    case 422:
      return (
        backendMessage ||
        Object.values(fieldErrors)[0]?.[0] ||
        tr("Please check the highlighted fields and try again.")
      );
    case 429:
      return tr("Too many requests. Please slow down and try again.");
  }

  // Never surface backend text for server errors — it may be a debug dump.
  if (status && status >= 500)
    return tr("Something went wrong on our end. Please try again in a moment.");

  // Other 4xx (400, 405, 409, …) — trust an explicit backend message.
  return backendMessage || fallbackMessage();
}

/**
 * Convert any thrown value into a UI-safe {@link ApiError}.
 *
 * Used by the axios response interceptor. Guarantees `.message` is friendly and
 * never leaks Laravel debug details, while keeping status / field errors /
 * network flags available for callers that want to branch on them.
 *
 * `context.authenticated` lets 401 handling tell an expired session (logged in)
 * apart from a failed login / credential check (logged out).
 */
export function normalizeAxiosError(
  error: unknown,
  context: { authenticated?: boolean } = {},
): ApiError {
  // Already normalized (e.g. re-thrown downstream) — pass through untouched.
  if (error instanceof ApiError) return error;

  if (error instanceof AxiosError) {
    const response = error.response as
      | AxiosResponse<LaravelErrorBody>
      | undefined;
    const status = response?.status ?? null;
    const body = response?.data;

    const isTimeout = error.code === "ECONNABORTED";
    const isNetworkError = !response && !isTimeout;

    const debugDump = isDebugDump(body);
    const fieldErrors: FieldErrors =
      body && typeof body === "object" && body.errors ? body.errors : {};
    // Only trust the backend message when it isn't a raw debug dump.
    const backendMessage = debugDump ? undefined : body?.message;

    const message = resolveUserMessage({
      status,
      isNetworkError,
      isTimeout,
      backendMessage,
      fieldErrors,
      authenticated: context.authenticated ?? false,
    });

    // Surface the real cause to developers without exposing it to users.
    if (debugDump || (status !== null && status >= 500)) {
      console.error("[API Error]", status, body?.message ?? error.message, body);
    } else {
      console.error("[API Error]", status, message);
    }

    return new ApiError(message, {
      status,
      code: error.code ?? null,
      fieldErrors,
      isNetworkError,
      isTimeout,
      rawMessage: typeof body?.message === "string" ? body.message : undefined,
    });
  }

  // Non-axios: a plain Error thrown by an api function, or anything else.
  if (error instanceof Error) {
    return new ApiError(error.message || fallbackMessage());
  }

  return new ApiError(fallbackMessage());
}

/** Safe user-facing message for any thrown value. */
export function getErrorMessage(error: unknown, fallback?: string): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error && error.message) return error.message;
  return fallback ?? fallbackMessage();
}

/** Field-level validation errors for any thrown value (empty if none). */
export function getFieldErrors(error: unknown): FieldErrors {
  return error instanceof ApiError ? error.fieldErrors : {};
}
