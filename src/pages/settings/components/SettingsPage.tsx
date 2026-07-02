import { type ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { ShieldCheck, KeyRound, Monitor } from "lucide-react";
import PageHeader from "../../../components/common/PageHeader";
import PageTransition from "../../../components/common/PageTransition";
import { useUserStore } from "../../../store/userStore";
import {
  prepare2FA,
  changePassword as changePasswordApi,
} from "../../../api/auth";
import OTPPopUp from "../../../components/common/OTPPopUp";
import PasswordInput from "../../../components/common/PasswordInput";
import { Button } from "../../../components/ui/button";
import { notifyError, notifySuccess } from "../../../lib/notify";

interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const getInitials = (name?: string): string => {
  if (!name) return "?";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
};

const SettingsPage = () => {
  const { t } = useTranslation();
  const { user } = useUserStore();
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

  // Enabling 2FA mutation
  const {
    mutate: prepare,
    isPending: is2FAPending,
    error: prepareError,
  } = useMutation({
    // Error is shown inline under the 2FA row, so skip the global toast.
    meta: { suppressErrorToast: true },
    mutationFn: prepare2FA,
    onSuccess: () => {
      setShowOTP(true);
    },
  });

  // Changing password mutation
  const { mutate: changePassword, isPending: isPasswordPending } = useMutation({
    // Handled with its own toast below, so skip the global one to avoid doubles.
    meta: { suppressErrorToast: true },
    mutationFn: (payload: Omit<ChangePasswordPayload, "confirmPassword">) =>
      changePasswordApi(payload),
    onSuccess: () => {
      setPasswordOpen(false);
      setPasswordFields({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      notifySuccess(t("Password changed successfully."));
    },
    // Surface the real, UI-safe reason (e.g. "current password is incorrect")
    // rather than a generic message.
    onError: (error) => notifyError(error),
  });

  const handlePasswordFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const scopeLabel = user?.scopes?.[0]?.scope_type ?? "MINISTRY";

  return (
    <PageTransition className="min-h-screen space-y-6 bg-background p-8">
      <PageHeader
        title={t("Ministry of Higher Education")}
        locationTitle={t("Settings")}
        role={user?.roles[0]?.name ?? t("System Administrator")}
        year="2025-2026"
      />

      {/* Profile */}
      <section className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-foreground">
            {t("Profile")}
          </h2>
        </div>

        <div className="flex items-center justify-between gap-4 p-6">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/15 text-lg font-bold text-teal-600 dark:text-teal-300">
              {getInitials(user?.name)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">
                {user?.name ?? t("System Administrator")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {user?.roles[0]?.name
                  ? t(user.roles[0].name)
                  : t("System Administrator")}
              </p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <span className="rounded-md bg-teal-500/15 px-3 py-1 text-xs font-bold text-teal-600 dark:text-teal-300">
            {t(scopeLabel)}
          </span>
        </div>
      </section>

      {/* Security */}
      <section className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-foreground">
            {t("Security")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("Manage your account security options.")}
          </p>
        </div>

        <div className="px-6">
          {/* Two-factor */}
          <div className="flex items-center justify-between gap-4 border-b border-border py-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/15 text-teal-600 dark:text-teal-300">
                <ShieldCheck className="h-4.5 w-4.5" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {t("Two-factor authentication")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("Require a one-time code at sign-in.")}
                </p>
                {prepareError && (
                  <p className="mt-1 text-xs text-red-500">
                    {prepareError.message}
                  </p>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              disabled={is2FAPending}
              onClick={() => prepare()}
              className="h-9 border-teal-600/40 px-4 text-teal-700 hover:bg-teal-500/10 hover:text-teal-700 dark:text-teal-300"
            >
              {is2FAPending
                ? t("Sending code…")
                : user?.is2FAEnabled
                  ? t("Disable")
                  : t("Enable")}
            </Button>
          </div>

          {/* Password */}
          <div className="py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/15 text-teal-600 dark:text-teal-300">
                  <KeyRound className="h-4.5 w-4.5" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {t("Password")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("Change your account password.")}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={handlePasswordToggle}
                className="h-9 border-teal-600/40 px-4 text-teal-700 hover:bg-teal-500/10 hover:text-teal-700 dark:text-teal-300"
              >
                {passwordOpen ? t("Cancel") : t("Change")}
              </Button>
            </div>

            {/* Expandable password form */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                passwordOpen
                  ? "mt-5 grid-rows-[1fr] opacity-100"
                  : "mt-0 grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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

                {passwordValidationError && (
                  <p className="mt-3 text-xs text-red-500">
                    {passwordValidationError}
                  </p>
                )}

                <div className="mt-4 flex justify-end">
                  <Button
                    disabled={isPasswordPending}
                    onClick={handlePasswordChange}
                    className="h-9 bg-teal-600 px-5 text-white hover:bg-teal-700"
                  >
                    {isPasswordPending ? t("Saving…") : t("Save new password")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showOTP && (
        <OTPPopUp
          mode={user?.is2FAEnabled ? "disable" : "enable"}
          email={user?.email ?? ""}
          onClose={() => setShowOTP(false)}
        />
      )}
    </PageTransition>
  );
};

export default SettingsPage;
