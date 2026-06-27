import { type ChangeEvent, useState } from "react";
import { Bell, Plus } from "lucide-react";
import logo from "../../assets/images/logo.png";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../api/auth";
import { useUserStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import ComposeLetter from "../common/ComposeLetter";

type Language = "en" | "ku" | "ar";

const languages: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "ku", label: "KU" },
  { code: "ar", label: "AR" },
];

const BRAND_TITLE = "e-Zanko";
const NOTIFICATION_COUNT = 1;

const getInitials = (name?: string) => {
  if (!name) return "U";

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

const getSupportedLanguage = (currentLanguage: string): Language => {
  const language = currentLanguage.split("-")[0].toLowerCase();

  return languages.some((item) => item.code === language)
    ? (language as Language)
    : "en";
};

export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>(() =>
    getSupportedLanguage(i18n.resolvedLanguage || i18n.language),
  );

  const { t } = useTranslation();
  const [composePopup, setComposePopup] = useState(false);
  const { setUser } = useUserStore();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setUser(null);
      navigate("/login", { replace: true });
    },
  });

  const user = useUserStore((state) => state.user);

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value as Language;

    setLanguage(selectedLanguage);
    void i18n.changeLanguage(selectedLanguage);
  };

  const handleLogout = () => {
    mutate();
  };

  const ministryName = t("Ministry of Higher Education");
  const userName = user?.name ?? t("User");
  const userRole = user?.role ?? t("User");
  const userInitials = getInitials(userName);

  const letterButtonText =
    user?.role === "MINISTRY_ADMIN"
      ? t("Broadcast Letter")
      : t("Compose Letter");

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-20.5 items-center border-b border-[#e4e9ef] bg-white shadow-[0_8px_28px_rgba(18,35,55,0.06)] max-md:static max-md:grid max-md:h-auto max-md:min-h-20.5">
      <div className="flex h-full w-67.5 shrink-0 items-center gap-3 border-e border-[#e4e9ef] bg-white px-4.5 max-lg:w-60 max-md:h-20.5 max-md:w-full max-md:border-e-0 max-md:border-b">
        <img
          src={logo}
          alt={t("Kurdistan Regional Government logo")}
          className="h-25 w-25 shrink-0 object-contain max-sm:h-11.5 max-sm:w-11.5"
        />

        <div className="min-w-0">
          <div className="text-[19px] font-[850] leading-none tracking-[-0.03em] text-[#172033]">
            {BRAND_TITLE}
          </div>

          <div className="mt-1.5 text-[11.5px] font-semibold leading-tight text-[#758498]">
            {ministryName}
          </div>
        </div>
      </div>

      <div className="flex h-full min-w-0 flex-1 items-center justify-between gap-5 bg-white px-6.5 max-md:h-auto max-md:flex-wrap max-md:p-4">
        <div className="min-w-0">
          <h1 className="truncate text-xl font-[850] tracking-tight text-[#172033] max-sm:text-[17px]">
            {ministryName}
          </h1>
        </div>

        <div className="flex shrink-0 items-center gap-2.5 max-md:w-full max-md:flex-wrap">
          <button
            onClick={() => setComposePopup(true)}
            type="button"
            className="inline-flex h-10.5 items-center gap-2 rounded-xl border border-[#0f7576] bg-[#0f7576] px-3.25 font-bold text-white shadow-[0_8px_18px_rgba(15,117,118,0.2)] transition hover:bg-[#0b5f60]"
          >
            <Plus className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
            <span className="max-lg:hidden">{letterButtonText}</span>
          </button>

          <button
            type="button"
            aria-label={t("Notifications")}
            className="relative inline-flex h-10.5 w-10.5 items-center justify-center rounded-xl border border-[#e4e9ef] bg-white text-[#46566a] transition hover:border-[#bfe0e0] hover:bg-[#f8fbfb] hover:text-[#0f7576]"
          >
            <Bell className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />

            {NOTIFICATION_COUNT > 0 && (
              <span className="absolute end-2 top-2 h-2.25 w-2.25 rounded-full border-2 border-white bg-[#cc7a2b]" />
            )}
          </button>

          <select
            aria-label={t("Language")}
            value={language}
            onChange={handleLanguageChange}
            className="h-10.5 cursor-pointer rounded-xl border border-[#e4e9ef] bg-white px-3 font-bold text-[#46566a] outline-none transition hover:border-[#bfe0e0] hover:bg-[#f8fbfb]"
          >
            {languages.map((item) => (
              <option key={item.code} value={item.code}>
                {item.label}
              </option>
            ))}
          </select>

          <div className="relative flex h-12.5 cursor-pointer items-center gap-2.5 border-s border-[#e4e9ef] ps-3.5 max-sm:ps-2">
            <button
              type="button"
              onClick={() => setIsUserMenuOpen((current) => !current)}
              className="flex items-center gap-2.5 text-start"
              aria-expanded={isUserMenuOpen}
              aria-haspopup="menu"
            >
              <span className="grid h-9.5 w-9.5 place-items-center rounded-full bg-[#dceeee] text-[13px] font-[850] text-[#0f7576]">
                {userInitials}
              </span>

              <span className="leading-tight max-sm:hidden">
                <span className="block whitespace-nowrap text-[13px] font-[850] text-[#172033]">
                  {userName}
                </span>

                <span className="mt-1 inline-block rounded-md bg-[#e0f0f0] px-2 py-0.5 text-[10.5px] font-[850] text-[#0f7576]">
                  {userRole}
                </span>
              </span>
            </button>

            {isUserMenuOpen && (
              <div
                role="menu"
                className="absolute end-0 top-14 z-100 w-52.5 rounded-[14px] border border-[#e4e9ef] bg-white p-2 shadow-[0_22px_45px_rgba(18,35,55,0.14)]"
              >
                <a
                  href="#profile"
                  className="flex rounded-[10px] px-2.5 py-2.5 text-[13px] font-bold text-[#46566a] hover:bg-[#f4f7f7] hover:text-[#0f7576]"
                >
                  {t("Profile")}
                </a>

                <a
                  href="#account-settings"
                  className="flex rounded-[10px] px-2.5 py-2.5 text-[13px] font-bold text-[#46566a] hover:bg-[#f4f7f7] hover:text-[#0f7576]"
                >
                  {t("Account Settings")}
                </a>

                <a
                  href="#security"
                  className="flex rounded-[10px] px-2.5 py-2.5 text-[13px] font-bold text-[#46566a] hover:bg-[#f4f7f7] hover:text-[#0f7576]"
                >
                  {t("Security")}
                </a>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full rounded-[10px] px-2.5 py-2.5 text-start text-[13px] font-bold text-[#46566a] hover:bg-[#f4f7f7] hover:text-[#0f7576]"
                >
                  {t("Logout")}
                </button>
              </div>
            )}
          </div>
        </div>

        {composePopup && (
          <ComposeLetter onClose={() => setComposePopup(false)} />
        )}
      </div>
    </header>
  );
}
