import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import ar from "./locales/ar/translation.json";
import ku from "./locales/ku/translation.json";

const rtlLanguages = new Set(["ar", "ku"]);

const updateDocumentDirection = (language: string) => {
  const baseLanguage = language.split("-")[0].toLowerCase();
  const direction = rtlLanguages.has(baseLanguage) ? "rtl" : "ltr";

  document.documentElement.lang = baseLanguage;
  document.documentElement.dir = direction;
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
    ku: { translation: ku },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  ns: ["translation"],
  defaultNS: "translation",
});

i18n.on("languageChanged", updateDocumentDirection);

updateDocumentDirection(i18n.resolvedLanguage || i18n.language);

export default i18n;
