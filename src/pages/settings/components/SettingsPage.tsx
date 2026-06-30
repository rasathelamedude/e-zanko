import { useTranslation } from "react-i18next";
import PageHeader from "../../../components/common/PageHeader";
import { useUserStore } from "../../../store/userStore";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  prepare2FA,
  changePassword as changePasswordApi,
} from "../../../api/auth";
import OTPPopUp from "../../../components/common/OTPPopUp";
import PasswordInput from "../../../components/common/PasswordInput";
import { toast } from "react-toastify";

interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const SettingsPage = () => {
  const [showOTP, setShowOTP] = useState(false);

  // Change password section
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordFields, setPasswordFields] = useState<ChangePasswordPayload>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordValidationError, setPasswordValidationError] = useState("");

  const { t } = useTranslation();
  const { user } = useUserStore();

  // Enabling 2FA mutation
  const {
    mutate: prepare,
    isPending: is2FAPending,
    error: prepareError,
  } = useMutation({
    mutationFn: prepare2FA,
    onSuccess: () => {
      setShowOTP(true);
    },
  });

  // Changing password mutation
  const {
    mutate: changePassword,
    isPending: isPasswordPending,
    error: changePasswordError,
  } = useMutation({
    mutationFn: (payload: Omit<ChangePasswordPayload, "confirmPassword">) =>
      changePasswordApi(payload),
    onSuccess: () => {
      setPasswordOpen(false);
      setPasswordFields({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast.success(t("Password changed successfully."), { autoClose: 4500 });
    },
    onError: () => {
      toast.error(t("Password change failed."), { autoClose: 4500 });
    },
  });

  const handlePasswordFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswordFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setPasswordValidationError("");
  };

  const handlePasswordToggle = () => {
    setPasswordOpen((prev) => !prev);

    // Reset fields when reopening
    if (passwordOpen) {
      setPasswordFields({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  const handlePasswordChange = () => {
    if (
      !passwordFields.currentPassword ||
      !passwordFields.newPassword ||
      !passwordFields.confirmPassword
    ) {
      setPasswordValidationError(t("Please fill in all password fields."));
      return;
    }

    if (passwordFields.newPassword.length < 8) {
      setPasswordValidationError(
        t("New password must be at least 8 characters."),
      );
      return;
    }

    if (passwordFields.newPassword !== passwordFields.confirmPassword) {
      setPasswordValidationError(t("New passwords don't match."));
      return;
    }

    setPasswordValidationError("");
    changePassword({
      currentPassword: passwordFields.currentPassword,
      newPassword: passwordFields.newPassword,
    });
  };

  const displayPasswordError =
    passwordValidationError || changePasswordError?.message;

  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-8">
      <PageHeader
        title={t("Ministry of higher education")}
        locationTitle={t("Settings")}
        role={user?.roles[0]?.name ?? ""}
        year="2023-2024"
      />

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            {t("Profile")}
          </h2>
        </div>

        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-teal-100 text-[#0f7576] flex items-center justify-center text-xl font-bold">
              AM
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">{user?.name}</h3>
              <p className="text-slate-500">{t("System Administrator")}</p>
              <p className="text-slate-500">{user?.email}</p>
            </div>
          </div>

          <span className="bg-teal-100 text-[#0f7576] text-xs font-bold px-3 py-1 rounded-md">
            {t("MINISTRY")}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            {t("System Preferences")}
          </h2>
          <p className="text-sm text-slate-500">
            {t("Configure system options.")}
          </p>
        </div>

        <div className="p-6 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              {t("Date format")}
            </label>
            <select className="w-full rounded-lg border border-slate-300 px-3 py-2 bg-white">
              <option>{t("Gregorian")}</option>
              <option>{t("Kurdish / Local")}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              {t("Theme")}
            </label>
            <select className="w-full rounded-lg border border-slate-300 px-3 py-2 bg-white">
              <option>{t("Light")}</option>
              <option>{t("Dark")}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            {t("Security")}
          </h2>
          <p className="text-sm text-slate-500">
            {t("Manage your account security options.")}
          </p>
        </div>

        <div className="px-6">
          <div className="py-4 flex items-center justify-between border-b border-slate-100">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                {t("Two-factor authentication")}
              </h3>
              <p className="text-sm text-slate-500">
                {t("Add an extra layer of security to your account.")}
              </p>
              {prepareError && (
                <p className="text-xs text-red-500 mt-1">
                  {prepareError.message}
                </p>
              )}
            </div>

            <button
              className={`border border-[#0f7576] text-[#0f7576] px-5 py-2 rounded-lg text-sm font-medium ${is2FAPending ? "pointer-events-none opacity-40" : "cursor-pointer"}`}
              onClick={() => prepare()}
            >
              {is2FAPending
                ? t("Sending code…")
                : user?.is2FAEnabled
                  ? t("Disable")
                  : t("Enable")}
            </button>
          </div>

          {/* Password row */}
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  {t("Password")}
                </h3>
                <p className="text-sm text-slate-500">
                  {t("Change your account password.")}
                </p>
              </div>

              <button
                onClick={handlePasswordToggle}
                className="border border-[#0f7576] text-[#0f7576] px-5 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-teal-50"
              >
                {passwordOpen ? t("Cancel") : t("Change")}
              </button>
            </div>

            {/* Expandable form of password inputs */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                passwordOpen
                  ? "grid-rows-[1fr] opacity-100 mt-5"
                  : "grid-rows-[0fr] opacity-0 mt-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <PasswordInput
                    id="currentPassword"
                    name="currentPassword"
                    label={t("Current password")}
                    value={passwordFields.currentPassword}
                    show={showCurrent}
                    onToggle={() => setShowCurrent((v) => !v)}
                    onChange={handlePasswordFieldChange}
                  />
                  <PasswordInput
                    id="newPassword"
                    name="newPassword"
                    label={t("New password")}
                    value={passwordFields.newPassword}
                    show={showNew}
                    onToggle={() => setShowNew((v) => !v)}
                    onChange={handlePasswordFieldChange}
                  />
                  <PasswordInput
                    id="confirmPassword"
                    name="confirmPassword"
                    label={t("Confirm new password")}
                    value={passwordFields.confirmPassword}
                    show={showConfirm}
                    onToggle={() => setShowConfirm((v) => !v)}
                    onChange={handlePasswordFieldChange}
                  />
                </div>

                {displayPasswordError && (
                  <p className="text-xs text-red-500 mt-3">
                    {displayPasswordError}
                  </p>
                )}

                <div className="flex justify-end mt-4">
                  <button
                    className={`bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors ${isPasswordPending ? "pointer-events-none opacity-40" : "cursor-pointer"}`}
                    onClick={handlePasswordChange}
                  >
                    {isPasswordPending ? t("Saving…") : t("Save new password")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showOTP && (
        <OTPPopUp
          mode={user?.is2FAEnabled ? "disable" : "enable"}
          email={user?.email ?? ""}
          onClose={() => setShowOTP(false)}
        />
      )}
    </div>
  );
};

export default SettingsPage;
