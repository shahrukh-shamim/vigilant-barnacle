import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCookie, setCookie } from '../utils/cookies';

// Define theme configurations
export const themes = {
  light: {
    name: 'light',
    colors: {
      // Background colors
      background: '#ffffff',
      backgroundSecondary: '#f8fafc',
      backgroundTertiary: '#f1f5f9',
      
      // Text colors
      text: '#1e293b',
      textSecondary: '#475569',
      textMuted: '#64748b',
      
      // UI elements
      border: '#e2e8f0',
      borderHover: '#cbd5e1',
      shadow: 'rgba(0, 0, 0, 0.1)',
      
      // Interactive elements
      primary: '#3b82f6',
      primaryHover: '#2563eb',
      secondary: '#6b7280',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      
      // Chat specific
      chatBackground: '#ffffff',
      chatBorder: '#e5e7eb',
      userMessage: '#e0f2fe',
      botMessage: '#f0f9ff',
      
      // Loading spinner
      spinner: '#3b82f6'
    }
  },
  dark: {
    name: 'dark',
    colors: {
      // Background colors
      background: '#0f172a',
      backgroundSecondary: '#1e293b',
      backgroundTertiary: '#334155',
      
      // Text colors
      text: '#f8fafc',
      textSecondary: '#cbd5e1',
      textMuted: '#94a3b8',
      
      // UI elements
      border: '#374151',
      borderHover: '#4b5563',
      shadow: 'rgba(0, 0, 0, 0.3)',
      
      // Interactive elements
      primary: '#60a5fa',
      primaryHover: '#3b82f6',
      secondary: '#9ca3af',
      success: '#34d399',
      warning: '#fbbf24',
      error: '#f87171',
      
      // Chat specific
      chatBackground: '#1e293b',
      chatBorder: '#374151',
      userMessage: '#1e3a8a',
      botMessage: '#1e40af',
      
      // Loading spinner
      spinner: '#60a5fa'
    }
  }
};

// Create Theme Context
const ThemeContext = createContext({
  theme: themes.light,
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {}
});

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  // Initialize theme from cookie or default to light
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = getCookie('theme');
    return savedTheme === 'dark';
  });

  const theme = isDark ? themes.dark : themes.light;

  // Toggle between light and dark theme
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    setCookie('theme', newTheme ? 'dark' : 'light', 365); // Save for 1 year
  };

  // Set specific theme
  const setTheme = (themeName) => {
    const newIsDark = themeName === 'dark';
    setIsDark(newIsDark);
    setCookie('theme', themeName, 365);
  };

  // Apply theme to document root for CSS custom properties
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    // Add theme class to body for conditional styling
    document.body.className = `theme-${theme.name}`;
  }, [theme]);

  const value = {
    theme,
    isDark,
    toggleTheme,
    setTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
