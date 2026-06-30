import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { X, ShieldCheck } from "lucide-react";
import { enable2FA, disable2FA, login2FA } from "../../api/auth";
import { useUserStore } from "../../store/userStore";
import type { OTPVerificationResult } from "../../api/auth";

export type OTPMode = "enable" | "disable" | "login";

interface OTPPopUpProps {
  mode: OTPMode;
  email: string;
  onClose: () => void;
  // Only required for login mode — comes from the 202 response
  challengeToken?: string;
}

const MAX_ATTEMPTS = 5;
const EXPIRY_SECONDS = 5 * 60;

const config: Record<OTPMode, { title: string; description: string }> = {
  enable: {
    title: "Verify your email",
    description:
      "Enter the 6-digit code we sent to enable two-step verification.",
  },
  disable: {
    title: "Confirm to disable",
    description:
      "Enter the 6-digit code we sent to turn off two-step verification.",
  },
  login: {
    title: "Two-step verification",
    description: "Enter the 6-digit code sent to your email to continue.",
  },
};

const OTPPopUp = ({ mode, email, onClose, challengeToken }: OTPPopUpProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setUser, setToken } = useUserStore();

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);
  const [secondsLeft, setSecondsLeft] = useState(EXPIRY_SECONDS);
  const [validationError, setValidationError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { title, description } = config[mode];

  // Countdown timer
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const isExpired = secondsLeft <= 0;
  const isLocked = attemptsLeft <= 0;

  const { mutate, isPending, error } = useMutation<
    string | OTPVerificationResult,
    Error,
    string
  >({
    mutationFn: (otp: string): Promise<string | OTPVerificationResult> => {
      if (mode === "enable") return enable2FA(otp);
      if (mode === "disable") return disable2FA(otp);
      // login mode — challengeToken is guaranteed present when mode === "login"
      return login2FA(otp, challengeToken!);
    },
    onSuccess: (result) => {
      if (mode === "login") {
        const { user, token } = result as OTPVerificationResult;
        setUser(user);
        setToken(token);
        navigate("/", { replace: true });
        return;
      }

      // enable / disable — the response carries no user, so flip the flag on
      // the current user in global state instead of overwriting it.
      const currentUser = useUserStore.getState().user;
      if (currentUser) {
        setUser({ ...currentUser, is2FAEnabled: mode === "enable" });
      }
      onClose();
    },
    onError: () => {
      setAttemptsLeft((prev) => prev - 1);
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    },
  });

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const next = [...code];
    next[index] = value;
    setCode(next);
    setValidationError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pasted.length === 6) {
      setCode(pasted.split(""));
      inputRefs.current[5]?.focus();
    }
    e.preventDefault();
  };

  const handleVerify = () => {
    const otp = code.join("");
    if (otp.length < 6) {
      setValidationError(t("Please enter the full 6-digit code."));
      return;
    }
    if (isExpired) {
      setValidationError(t("This code has expired. Request a new one."));
      return;
    }
    if (isLocked) return;
    mutate(otp);
  };

  const displayError = validationError || (error as Error)?.message;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
          aria-label={t("Close")}
        >
          <X size={18} />
        </button>

        {/* Icon + heading */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center mb-3">
            <ShieldCheck size={22} className="text-teal-600" />
          </div>
          <h2 className="text-base font-semibold text-slate-900">{t(title)}</h2>
          <p className="text-sm text-slate-500 mt-1 max-w-65">
            {t(description)}{" "}
            <span className="font-medium text-slate-700">{email}</span>.
          </p>
        </div>

        {/* OTP inputs */}
        <div className="flex justify-center gap-2 mb-4" onPaste={handlePaste}>
          {code.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              disabled={isExpired || isLocked || isPending}
              className="w-10 h-12 text-center text-lg font-semibold border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:opacity-40 disabled:bg-slate-50"
            />
          ))}
        </div>

        {/* Timer + attempts */}
        <div className="flex justify-between text-xs text-slate-400 mb-4 px-1">
          <span>
            {isExpired
              ? t("Code expired")
              : t("Expires in {{time}}", { time: formatTime(secondsLeft) })}
          </span>
          <span>
            {isLocked
              ? t("No attempts left")
              : t("{{n}} attempts left", {
                  count: attemptsLeft,
                  n: attemptsLeft,
                })}
          </span>
        </div>

        {/* Error */}
        {displayError && (
          <p className="text-xs text-red-500 text-center mb-3">
            {displayError}
          </p>
        )}

        {/* Locked / expired message */}
        {(isLocked || isExpired) && (
          <p className="text-xs text-slate-500 text-center mb-3">
            {t("Request a new code from the settings page.")}
          </p>
        )}

        {/* Verify button */}
        <button
          onClick={handleVerify}
          disabled={isPending || isExpired || isLocked}
          className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg py-2 transition-colors"
        >
          {isPending ? t("Verifying…") : t("Verify")}
        </button>
      </div>
    </div>
  );
};

export default OTPPopUp;
