import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import logo from "../../assets/images/kurdistan-region-goverment-logo.png";
import { login, forgetPassword } from "../../api/auth";
import type { LoginPayload } from "../../types/auth";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "../../store/userStore";
import { ImSpinner } from "react-icons/im";
import { LogInIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import OTPPopUp from "../../components/common/OTPPopUp";

function LoginPage() {
  const [validationError, setValidationError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginPayload, setLoginPayload] = useState<LoginPayload>({
    email: "",
    password: "",
  });
  const [show2FA, setShow2FA] = useState(false);
  const [challengeToken, setChallengeToken] = useState("");

  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setUser, setToken } = useUserStore();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (result) => {
      if (result.requires2FA) {
        // 202 — store the challenge token and show the OTP modal
        setChallengeToken(result.challenge_token);
        setShow2FA(true);
      } else {
        // 200 — logged in, set user, store token, and go home
        setUser(result.user);
        setToken(result.token);
        navigate("/");
      }
    },
    onError: () => {
      setUser(null);
      setToken(null);
    },
  });

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate(loginPayload);
  };

  const handlePayloadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginPayload({
      ...loginPayload,
      [e.target.name]: e.target.value,
    });
  };

  const handleForgotPassword = async () => {
    if (!loginPayload.email) {
      setValidationError(t("Please enter your email address first."));
      return;
    }
    setValidationError("");
    await forgetPassword(loginPayload.email);
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="flex w-full flex-col items-center justify-center gap-5 bg-teal-600 p-8 text-white md:min-h-screen md:w-2/5">
        <img
          src={logo}
          alt={t("Kurdistan Region Government logo")}
          className="h-auto w-60 md:w-64"
        />

        <div>
          <h1 className="text-2xl font-bold">e-Zanko</h1>
          <h2 className="text-md text-gray-200">{t("Higher education")}</h2>
        </div>
      </div>

      <div className="flex w-full flex-1 items-center justify-center p-6 md:w-3/5">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold">{t("Welcome back")}</h1>

          <h2 className="text-md text-gray-400">
            {t("Sign in to your e-zanko account")}
          </h2>

          <div className="mt-6 space-y-2">
            <Label>{t("Email address")}</Label>

            <Input
              name="email"
              onChange={handlePayloadChange}
              type="email"
              placeholder={t("name@institution.edu.krd")}
              className="w-full"
            />
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <Label>{t("Password")}</Label>

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer text-sm font-bold text-teal-600 hover:underline"
              >
                {showPassword ? t("Hide") : t("Show")}
              </button>
            </div>

            <Input
              name="password"
              onChange={handlePayloadChange}
              type={showPassword ? "text" : "password"}
              placeholder={t("Enter your password")}
              className="w-full"
            />
          </div>

          {validationError && (
            <p className="mt-2 text-sm font-semibold text-red-500">
              {validationError}
            </p>
          )}

          <p
            className="mt-3 cursor-pointer text-end text-sm font-bold text-teal-600"
            onClick={handleForgotPassword}
          >
            {t("Forgot password?")}
          </p>

          {error && (
            <p className="mt-4 text-sm font-semibold text-red-500">
              {error.message}
            </p>
          )}

          <Button
            className={`mt-6 w-full bg-teal-600 hover:bg-teal-700 ${
              isPending ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
            onClick={handleLogin}
          >
            {isPending ? (
              <>
                <ImSpinner className="me-2 animate-spin" />
                <span>{t("Logging in...")}</span>
              </>
            ) : (
              <>
                <LogInIcon className="me-2" />
                <span>{t("Login")}</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {show2FA && (
        <OTPPopUp
          mode="login"
          email={loginPayload.email}
          challengeToken={challengeToken}
          onClose={() => setShow2FA(false)}
        />
      )}
    </div>
  );
}

export default LoginPage;
