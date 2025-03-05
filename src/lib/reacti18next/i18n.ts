import { initReactI18next } from "react-i18next";
import enTranslation from "./langs/en.json"
import ptTranslation from "./langs/pt.json"
import i18next from "i18next";

// Função para inicializar i18n com o idioma do usuário
export function initializeI18n(userLanguage?: string) {
  i18next.use(initReactI18next).init({
    lng: userLanguage || "pt", // Usa o idioma do usuário, ou pt como fallback
    fallbackLng: "pt",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: { translation: enTranslation.translation },
      pt: { translation: ptTranslation.translation },
    },
  });

  return i18next;
}

// Função para acessar o tradutor (t)
export const t = i18next.t.bind(i18next);

// Objeto i18n para controle global
export const i18n = i18next;

// Exportar os métodos para uso global
export default { t, i18n, initializeI18n };