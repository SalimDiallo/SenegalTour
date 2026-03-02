import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import i18next from "i18next";

// Initialize only on client side
if (typeof window !== 'undefined') {
  i18next
    .use(initReactI18next)
    .use(Backend)
    .init({
      fallbackLng: "en",
      backend: {
        loadPath: "/translations/{{lng}}/translations.json",
      },
    });
} else {
  // Minimal initialization for server side
  i18next
    .use(initReactI18next)
    .init({
      fallbackLng: "en",
      resources: {},
    });
}

export default i18next;
