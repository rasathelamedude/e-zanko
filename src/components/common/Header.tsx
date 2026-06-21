import { useState } from "react";
import logo from "../../assets/images/logo.png";

type Language = "EN" | "KU" | "AR";

type Header = {
  logoSrc?: string;
  brandTitle?: string;
  ministryName?: string;
  userName?: string;
  userRole?: string;
  userInitials?: string;
  language?: Language;
  notificationCount?: number;
  onCompose?: () => void;
  onLanguageChange?: (language: Language) => void;
};

const languages: Language[] = ["EN", "KU", "AR"];

const PlusIcon = () => (
  <svg
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    aria-hidden="true"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const BellIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    aria-hidden="true"
  >
    <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.7 21a2 2 0 0 1-3.4 0" />
  </svg>
);

export default function EZankoHeader({
  logoSrc = logo,
  brandTitle = "e-Zanko",
  ministryName = "Ministry of Higher Education",
  userName = "Ahmed Mohammed",
  userRole = "University Admin",
  userInitials = "AM",
  language = "EN",
  notificationCount = 1,
  onCompose,
  onLanguageChange,
}: Header) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-[82px] items-center border-b border-[#e4e9ef] bg-white shadow-[0_8px_28px_rgba(18,35,55,0.06)] max-md:static max-md:grid max-md:h-auto max-md:min-h-[82px]">
      {/* Top-left logo / brand area */}
      <div className="flex h-full w-[270px] shrink-0 items-center gap-3 border-r border-[#e4e9ef] bg-white px-[18px] max-lg:w-[240px] max-md:h-[82px] max-md:w-full max-md:border-r-0 max-md:border-b">
        <img
          src={logoSrc}
          alt="Kurdistan Regional Government logo"
          className="h-[100px] w-[100px] shrink-0 object-contain max-sm:h-[46px] max-sm:w-[46px]"
        />

        <div className="min-w-0">
          <div className="text-[19px] font-[850] leading-none tracking-[-0.03em] text-[#172033]">
            {brandTitle}
          </div>
          <div className="mt-1.5 text-[11.5px] font-semibold leading-tight text-[#758498]">
            {ministryName}
          </div>
        </div>
      </div>

      {/* Main header area */}
      <div className="flex h-full min-w-0 flex-1 items-center justify-between gap-5 bg-white px-[26px] max-md:h-auto max-md:flex-wrap max-md:p-4">
        <div className="min-w-0">
          <h1 className="truncate text-xl font-[850] tracking-[-0.025em] text-[#172033] max-sm:text-[17px]">
            {ministryName}
          </h1>
        </div>

        <div className="flex shrink-0 items-center gap-2.5 max-md:w-full max-md:flex-wrap">
          <button
            type="button"
            onClick={onCompose}
            className="inline-flex h-[42px] items-center gap-2 rounded-xl border border-[#0f7576] bg-[#0f7576] px-[13px] font-bold text-white shadow-[0_8px_18px_rgba(15,117,118,0.2)] transition hover:bg-[#0b5f60]"
          >
            <PlusIcon />
            <span className="max-lg:hidden">Compose Letter</span>
          </button>

          <button
            type="button"
            aria-label="Notifications"
            className="relative inline-flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-[#e4e9ef] bg-white text-[#46566a] transition hover:border-[#bfe0e0] hover:bg-[#f8fbfb] hover:text-[#0f7576]"
          >
            <BellIcon />
            {notificationCount > 0 && (
              <span className="absolute right-2 top-2 h-[9px] w-[9px] rounded-full border-2 border-white bg-[#cc7a2b]" />
            )}
          </button>

          <select
            aria-label="Language"
            value={language}
            onChange={(event) =>
              onLanguageChange?.(event.target.value as Language)
            }
            className="h-[42px] cursor-pointer rounded-xl border border-[#e4e9ef] bg-white px-3 font-bold text-[#46566a] outline-none transition hover:border-[#bfe0e0] hover:bg-[#f8fbfb]"
          >
            {languages.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <div className="relative flex h-[50px] cursor-pointer items-center gap-2.5 border-l border-[#e4e9ef] pl-3.5 max-sm:pl-2">
            <button
              type="button"
              onClick={() => setIsUserMenuOpen((current) => !current)}
              className="flex items-center gap-2.5 text-left"
              aria-expanded={isUserMenuOpen}
              aria-haspopup="menu"
            >
              <span className="grid h-[38px] w-[38px] place-items-center rounded-full bg-[#dceeee] text-[13px] font-[850] text-[#0f7576]">
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
                className="absolute right-0 top-14 z-[100] w-[210px] rounded-[14px] border border-[#e4e9ef] bg-white p-2 shadow-[0_22px_45px_rgba(18,35,55,0.14)]"
              >
                <a
                  href="#profile"
                  className="flex rounded-[10px] px-2.5 py-2.5 text-[13px] font-bold text-[#46566a] hover:bg-[#f4f7f7] hover:text-[#0f7576]"
                >
                  Profile
                </a>
                <a
                  href="#account-settings"
                  className="flex rounded-[10px] px-2.5 py-2.5 text-[13px] font-bold text-[#46566a] hover:bg-[#f4f7f7] hover:text-[#0f7576]"
                >
                  Account Settings
                </a>
                <a
                  href="#security"
                  className="flex rounded-[10px] px-2.5 py-2.5 text-[13px] font-bold text-[#46566a] hover:bg-[#f4f7f7] hover:text-[#0f7576]"
                >
                  Security
                </a>
                <a
                  href="#logout"
                  className="flex rounded-[10px] px-2.5 py-2.5 text-[13px] font-bold text-[#46566a] hover:bg-[#f4f7f7] hover:text-[#0f7576]"
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
