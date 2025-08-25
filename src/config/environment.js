// Environment configuration utility
export const ENV_CONFIG = {
  // Get current environment
  NODE_ENV: import.meta.env.MODE,
  
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  
  // App Environment
  APP_ENV: import.meta.env.VITE_APP_ENV || 'development',
  
  // Environment checks
  isDevelopment: import.meta.env.MODE === 'development',
  isProduction: import.meta.env.MODE === 'production',
  isStaging: import.meta.env.MODE === 'staging',
  
  // Debug mode
  isDebugMode: import.meta.env.MODE === 'development',
};

// API Endpoints
export const API_ENDPOINTS = {
  WELCOME_INFO: `${ENV_CONFIG.API_BASE_URL}/welcome-info`,
  SET_IDENTIFIER: `${ENV_CONFIG.API_BASE_URL}/set-identifier`,
  CHAT: `${ENV_CONFIG.API_BASE_URL}/chat`,
  PRODUCTS_STATIC: `${ENV_CONFIG.API_BASE_URL}/static/products`,
};

// Logging utility
export const logger = {
  log: (...args) => {
    if (ENV_CONFIG.isDebugMode) {
      console.log('[DEBUG]:', ...args);
    }
  },
  error: (...args) => {
    console.error('[ERROR]:', ...args);
  },
  warn: (...args) => {
    if (ENV_CONFIG.isDebugMode) {
      console.warn('[WARN]:', ...args);
    }
  }
};

export default ENV_CONFIG;
