import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import ar from "./locales/ar/translation.json";
import ku from "./locales/ku/translation.json";

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

export default i18n;
