import { type ChangeEvent, useState } from "react";
import { Plus } from "lucide-react";
import logo from "../../assets/images/logo.png";
import { useUserStore } from "../../store/userStore";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import ComposeLetter from "../common/ComposeLetter";
import BroadcastLetter from "../common/BroadcastLetter";

type Language = "en" | "ku" | "ar";

const languages: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "ku", label: "KU" },
  { code: "ar", label: "AR" },
];

const BRAND_TITLE = "e-Zanko";

const getSupportedLanguage = (currentLanguage: string): Language => {
  const language = currentLanguage.split("-")[0].toLowerCase();

  return languages.some((item) => item.code === language)
    ? (language as Language)
    : "en";
};

export default function Header() {
  const [language, setLanguage] = useState<Language>(() =>
    getSupportedLanguage(i18n.resolvedLanguage || i18n.language),
  );

  const { t } = useTranslation();
  const [composePopup, setComposePopup] = useState(false);

  const user = useUserStore((state) => state.user);

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value as Language;

    setLanguage(selectedLanguage);
    void i18n.changeLanguage(selectedLanguage);
  };

  const ministryName = t("Ministry of Higher Education");

  const letterButtonText =
    user?.roles[0]?.name === "MINISTRY_ADMIN"
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
        </div>

        {composePopup &&
          (user?.roles[0]?.name === "MINISTRY_ADMIN" ? (
            <BroadcastLetter onClose={() => setComposePopup(false)} />
          ) : (
            <ComposeLetter onClose={() => setComposePopup(false)} />
          ))}
      </div>
    </header>
  );
}
