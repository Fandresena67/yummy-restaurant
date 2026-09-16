import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// ============================================================
// i18n — Configuration de base react-i18next (Phase A)
// - Ressources statiques : en / fr / de (namespace `translation`)
// - Langue par défaut : 'en', repli : 'en'
// - escapeValue: false (React échappe déjà le XSS)
// - NOTE : i18next-browser-languagedetector est installé pour plus
//   tard, mais volontairement NON branché ici afin de garder un
//   démarrage déterministe en 'en'.
// - Tous les composants traduits consomment ces ressources via
//   useTranslation() + t() ; le sélecteur Navbar appelle changeLanguage().
// ============================================================

import en from "./locales/en/translation.json";
import fr from "./locales/fr/translation.json";
import de from "./locales/de/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    de: { translation: de },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

// Accessibilité/SEO : <html lang="..."> suit toujours la langue active
// (au lieu du "fr" statique de index.html).
const syncHtmlLang = (lng) => {
  document.documentElement.lang = lng.split("-")[0];
};
syncHtmlLang(i18n.language);
i18n.on("languageChanged", syncHtmlLang);

export default i18n;
