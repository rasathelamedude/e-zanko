import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams, Link } from "react-router-dom";
import { resetPassword } from "../../api/auth";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token") ?? "";
  const email = searchParams.get("email") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { mutate, isPending, error } = useMutation({
    mutationFn: () =>
      resetPassword({ token, email, password, confirmPassword: confirm }),
    onSuccess: (message) =>
      setSuccessMessage(
        message || t("Your password has been reset. You can now sign in."),
      ),
  });

  const handleSubmit = () => {
    if (password.length < 8) {
      setValidationError(t("Password must be at least 8 characters."));
      return;
    }
    if (password !== confirm) {
      setValidationError(t("Passwords don't match."));
      return;
    }
    setValidationError("");
    mutate();
  };

  const displayError = validationError || (error as Error)?.message;

  if (!token || !email) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 w-full max-w-sm text-center">
          <h1 className="text-lg font-semibold text-gray-900 mb-2">
            {t("Link is invalid")}
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            {t(
              "This reset link is missing required information. Request a new one.",
            )}
          </p>
          <Link
            to="/login"
            className="text-sm text-teal-600 hover:text-teal-700 font-medium"
          >
            {t("Request a new link")}
          </Link>
        </div>
      </div>
    );
  }

  if (successMessage) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 w-full max-w-sm text-center">
          <h1 className="text-lg font-semibold text-gray-900 mb-2">
            {t("Password reset successful")}
          </h1>
          <p className="text-sm text-gray-500 mb-6">{successMessage}</p>
          <Link
            to="/login"
            className="text-sm text-teal-600 hover:text-teal-700 font-medium"
          >
            {t("Back to login")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 w-full max-w-sm">
        <h1 className="text-xl font-semibold text-gray-900 mb-1">
          {t("Set a new password")}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          {t("Choose a password you haven't used before.")}
        </p>

        {/* New password */}
        <div className="mb-4">
          <label
            className="block text-xs text-gray-400 mb-1"
            htmlFor="password"
          >
            {t("New password")}
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 pr-10 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label={
                showPassword ? t("Hide password") : t("Show password")
              }
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {t("Minimum 8 characters")}
          </p>
        </div>

        {/* Confirm password */}
        <div className="mb-5">
          <label className="block text-xs text-gray-400 mb-1" htmlFor="confirm">
            {t("Confirm password")}
          </label>
          <div className="relative">
            <input
              id="confirm"
              type={showConfirm ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 pr-10 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label={showConfirm ? t("Hide password") : t("Show password")}
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {displayError && (
            <p className="text-xs text-red-500 mt-1">{displayError}</p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white text-sm font-medium rounded-lg py-2 transition-colors"
        >
          {isPending ? t("Saving…") : t("Set new password")}
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
