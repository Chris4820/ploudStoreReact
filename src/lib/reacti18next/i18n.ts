import { initReactI18next } from "react-i18next";
import enTranslation from "./langs/en.json"
import ptTranslation from "./langs/pt.json"
import esTranslation from "./langs/es.json"
import frTranslation from "./langs/fr.json"
import svTranslation from "./langs/sv.json"
import itTranslation from "./langs/it.json"
import alTranslation from "./langs/al.json"
import nlTranslation from "./langs/nl.json"
import i18next from "i18next";

i18next.use(initReactI18next).init({
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

// Função para acessar o tradutor (t)
export const t = i18next.t.bind(i18next);

// Objeto i18n para controle global
export const i18n = i18next;

// Exportar os dois para uso global
export default { t, i18n };