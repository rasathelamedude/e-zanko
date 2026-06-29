import { useTranslation } from "react-i18next";
import PageHeader from "../../../components/common/PageHeader";
import { useUserStore } from "../../../store/userStore";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { prepare2FA } from "../../../api/auth";
import OTPPopUp from "../../../components/common/OTPPopUp";

const MinistrySettingsPage = () => {
  const [showOTP, setShowOTP] = useState(false);

  const { t } = useTranslation();
  const { user } = useUserStore();

  const {
    mutate: prepare,
    isPending,
    error,
  } = useMutation({
    mutationFn: prepare2FA,
    onSuccess: () => {
      setShowOTP(true);
    },
  });

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
              {error && (
                <p className="text-xs text-red-500 mt-1">{error.message}</p>
              )}
            </div>

            <button
              className={`border border-[#0f7576] text-[#0f7576] px-5 py-2 rounded-lg text-sm font-medium ${isPending ? "pointer-events-none opacity-40" : "cursor-pointer"}`}
              onClick={() => prepare()}
            >
              {isPending
                ? t("Sending code…")
                : user?.is2FAEnabled
                  ? t("Disable")
                  : t("Enable")}
            </button>
          </div>

          <div className="py-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                {t("Password")}
              </h3>
              <p className="text-sm text-slate-500">
                {t("Change your account password.")}
              </p>
            </div>

            <button className="border border-[#0f7576] text-[#0f7576] px-5 py-2 rounded-lg text-sm font-medium">
              {t("Change")}
            </button>
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

export default MinistrySettingsPage;
