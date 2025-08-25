import { useState, useEffect } from 'react';
import { getCookie } from '../utils/cookies';

// Custom hook to get current language and listen for changes
export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return getCookie('lang') || 'en';
  });

  useEffect(() => {
    // Listen for language change events
    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);

    // Cleanup
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  return currentLanguage;
};

// Language configurations
export const LANGUAGES = {
  en: {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    direction: 'ltr'
  },
  ar: {
    code: 'ar',
    name: 'العربية',
    flag: '🇸🇦',
    direction: 'rtl'
  },
  ur: {
    code: 'ur',
    name: 'اردو',
    flag: '🇵🇰',
    direction: 'rtl'
  }
};

// Helper function to get language config
export const getLanguageConfig = (langCode) => {
  return LANGUAGES[langCode] || LANGUAGES.en;
};

// Helper function to check if language is RTL
export const isRTL = (langCode) => {
  const config = getLanguageConfig(langCode);
  return config.direction === 'rtl';
};

export default useLanguage;
