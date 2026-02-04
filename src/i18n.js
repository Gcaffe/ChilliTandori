import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importar traducciones
import es from './locales/es.json';
import en from './locales/en.json';

// Configuración de i18next
i18n
  .use(initReactI18next) // Conectar con React
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en }
    },
    lng: 'es', // Idioma por defecto
    fallbackLng: 'es', // Idioma de respaldo
    interpolation: {
      escapeValue: false // React ya hace el escape
    }
  });

export default i18n;
