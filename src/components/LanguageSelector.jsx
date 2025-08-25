import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { getCookie, setCookie } from '../utils/cookies';

const LanguageSelector = () => {
  const { theme } = useTheme();
  
  // Language options with flags and codes
  const languages = [
    { 
      code: 'en', 
      name: 'English', 
      flag: '🇺🇸', 
      country: 'US' 
    },
    { 
      code: 'ar', 
      name: 'العربية', 
      flag: '🇸🇦', 
      country: 'SA' 
    },
    { 
      code: 'ur', 
      name: 'اردو', 
      flag: '🇵🇰', 
      country: 'PK' 
    }
  ];

  // Get initial language from cookie or default to English
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const savedLang = getCookie('lang');
    return savedLang || 'en';
  });
  
  const [isOpen, setIsOpen] = useState(false);

  // Get current language object
  const currentLanguage = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  // Handle language change
  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    setCookie('lang', langCode, 365); // Save for 1 year
    setIsOpen(false);
    
    // Optional: Trigger a custom event for other components to listen to
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: langCode } 
    }));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.language-selector')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const dropdownStyle = {
    position: 'relative',
    display: 'inline-block',
    zIndex: 1001
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    backgroundColor: theme.colors.backgroundSecondary,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '6px',
    color: theme.colors.text,
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    minWidth: '120px',
    justifyContent: 'space-between'
  };

  const dropdownListStyle = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: '4px',
    backgroundColor: theme.colors.background,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '6px',
    boxShadow: `0 4px 12px ${theme.colors.shadow}`,
    overflow: 'hidden',
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
    transition: 'all 0.3s ease'
  };

  const optionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 12px',
    cursor: 'pointer',
    fontSize: '14px',
    color: theme.colors.text,
    transition: 'background-color 0.2s ease',
    borderBottom: `1px solid ${theme.colors.border}`
  };

  const flagStyle = {
    fontSize: '18px',
    width: '24px',
    textAlign: 'center'
  };

  return (
    <div className="language-selector" style={dropdownStyle}>
      <button
        style={buttonStyle}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = theme.colors.backgroundTertiary;
          e.target.style.borderColor = theme.colors.borderHover;
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = theme.colors.backgroundSecondary;
          e.target.style.borderColor = theme.colors.border;
        }}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={flagStyle}>{currentLanguage.flag}</span>
          <span>{currentLanguage.name}</span>
        </div>
        <span style={{ 
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease',
          fontSize: '12px',
          color: theme.colors.textMuted
        }}>
          ▼
        </span>
      </button>

      <div style={dropdownListStyle}>
        {languages.map((language, index) => (
          <div
            key={language.code}
            style={{
              ...optionStyle,
              backgroundColor: selectedLanguage === language.code ? theme.colors.backgroundTertiary : 'transparent',
              borderBottom: index === languages.length - 1 ? 'none' : `1px solid ${theme.colors.border}`
            }}
            onClick={() => handleLanguageChange(language.code)}
            onMouseEnter={(e) => {
              if (selectedLanguage !== language.code) {
                e.target.style.backgroundColor = theme.colors.backgroundSecondary;
              }
            }}
            onMouseLeave={(e) => {
              if (selectedLanguage !== language.code) {
                e.target.style.backgroundColor = 'transparent';
              }
            }}
          >
            <span style={flagStyle}>{language.flag}</span>
            <span style={{ flex: 1 }}>{language.name}</span>
            {selectedLanguage === language.code && (
              <span style={{ 
                color: theme.colors.primary, 
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                ✓
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
