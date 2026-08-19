import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type Language, type SupportedLanguage, getTranslations, normalizeLanguage, loadLegacyTranslations } from "./i18n";

const STORAGE_KEY = "solimax_lang";

type Translations = ReturnType<typeof getTranslations>;

type LanguageContextType = {
  language: SupportedLanguage;
  setLanguage: (lang: Language) => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

const detectBrowserLanguage = (): SupportedLanguage => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const normalizedStored = normalizeLanguage(stored);
    if (stored !== normalizedStored) {
      localStorage.setItem(STORAGE_KEY, normalizedStored);
    }
    return normalizedStored;
  }
  
  const navLang = navigator.language.toLowerCase();
  return normalizeLanguage(navLang);
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>(detectBrowserLanguage);
  // Словник ua/de лежить в окремому чанку. Поки він їде, на екрані
  // лишається попередній переклад — порожнечі не буває.
  const [legacyTranslations, setLegacyTranslations] = useState<Translations | null>(null);

  const setLanguage = (lang: Language) => {
    const normalizedLanguage = normalizeLanguage(lang);
    setLanguageState(normalizedLanguage);
    localStorage.setItem(STORAGE_KEY, normalizedLanguage);
    document.documentElement.lang = normalizedLanguage;

    void loadLegacyTranslations(lang)
      .then((loaded) => setLegacyTranslations(loaded))
      .catch(() => setLegacyTranslations(null));
  };

  useEffect(() => {
    // Set initial document lang
    document.documentElement.lang = language;
  }, [language]);

  const t = legacyTranslations ?? getTranslations(language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
