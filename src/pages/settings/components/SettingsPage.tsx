import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import PageHeader from "../../../components/common/PageHeader";
import { useUserStore } from "../../../store/userStore";
import { changePassword } from "../../../api/auth";
import PasswordInput from "../../../components/common/PasswordInput";

interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const SettingsPage = () => {
  const { t } = useTranslation();
  const { user } = useUserStore();

  const [passwordOpen, setPasswordOpen] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [fields, setFields] = useState<ChangePasswordPayload>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { mutate, isPending, error, isSuccess, reset } = useMutation({
    mutationFn: (payload: ChangePasswordPayload) => changePassword(payload),
    onSuccess: () => {
      setFields({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setValidationError("");
    },
  });

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setValidationError("");
  };

  const handleChangePassword = () => {
    if (!fields.currentPassword) {
      setValidationError(t("Please enter your current password."));
      return;
    }
    if (fields.newPassword.length < 8) {
      setValidationError(t("New password must be at least 8 characters."));
      return;
    }
    if (fields.newPassword !== fields.confirmPassword) {
      setValidationError(t("Passwords don't match."));
      return;
    }
    setValidationError("");
    mutate(fields);
  };

  const handleToggle = () => {
    setPasswordOpen((prev) => !prev);
    if (passwordOpen) {
      setFields({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setValidationError("");
      reset();
    }
  };

  const displayError = validationError || (error as Error)?.message;

  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-8">
      <PageHeader
        title={t("Ministry of higher education")}
        locationTitle={t("Settings")}
        role={user?.role ?? ""}
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
                {t("Two-step verification")}
              </h3>
              <p className="text-sm text-slate-500">
                {t("Add an extra layer of security to your account.")}
              </p>
            </div>

            <button className="border border-[#0f7576] text-[#0f7576] px-5 py-2 rounded-lg text-sm font-medium">
              {t("Enable")}
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
                onClick={handleToggle}
                className="border border-[#0f7576] text-[#0f7576] px-5 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-teal-50"
              >
                {passwordOpen ? t("Cancel") : t("Change")}
              </button>
            </div>

            {/* Expandable form */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                passwordOpen
                  ? "grid-rows-[1fr] opacity-100 mt-5"
                  : "grid-rows-[0fr] opacity-0 mt-0"
              }`}
            >
              <div className="overflow-hidden">
                {isSuccess ? (
                  <div className="flex items-center gap-2 text-sm text-teal-700 bg-teal-50 border border-teal-200 rounded-lg px-4 py-3">
                    <svg
                      className="w-4 h-4 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {t("Password changed successfully.")}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <PasswordInput
                        id="currentPassword"
                        name="currentPassword"
                        label={t("Current password")}
                        value={fields.currentPassword}
                        show={showCurrent}
                        onToggle={() => setShowCurrent((v) => !v)}
                        onChange={handleFieldChange}
                      />
                      <PasswordInput
                        id="newPassword"
                        name="newPassword"
                        label={t("New password")}
                        value={fields.newPassword}
                        show={showNew}
                        onToggle={() => setShowNew((v) => !v)}
                        onChange={handleFieldChange}
                      />
                      <PasswordInput
                        id="confirmPassword"
                        name="confirmPassword"
                        label={t("Confirm new password")}
                        value={fields.confirmPassword}
                        show={showConfirm}
                        onToggle={() => setShowConfirm((v) => !v)}
                        onChange={handleFieldChange}
                      />
                    </div>

                    {displayError && (
                      <p className="text-xs text-red-500">{displayError}</p>
                    )}

                    <div className="flex justify-end">
                      <button
                        onClick={handleChangePassword}
                        disabled={isPending}
                        className="bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
                      >
                        {isPending ? t("Saving…") : t("Save new password")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
