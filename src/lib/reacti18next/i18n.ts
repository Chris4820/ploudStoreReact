import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./langs/en.json"
import ptTranslation from "./langs/pt.json"
import esTranslation from "./langs/es.json"
import frTranslation from "./langs/fr.json"
import svTranslation from "./langs/sv.json"
import itTranslation from "./langs/it.json"
import alTranslation from "./langs/al.json"
import nlTranslation from "./langs/nl.json"

i18n.use(initReactI18next).init({
  lng: "pt",
  fallbackLng: "pt",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
        translation: enTranslation.translation
      },
      pt: {
        translation: ptTranslation.translation
      },
      es: {
        translation: esTranslation.translation
      },
      fr: {
        translation: frTranslation.translation
      },
      sv: {
        translation: svTranslation.translation
      },
      it: {
        translation: itTranslation.translation
      },
      al: {
        translation: alTranslation.translation
      },
      nl: {
        translation: nlTranslation.translation
      }

  },
});

export default i18n;