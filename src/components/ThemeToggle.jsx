import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = ({ className = '', style = {} }) => {
  const { isDark, toggleTheme, theme } = useTheme();

  const buttonStyle = {
    position: 'relative',
    width: '60px',
    height: '30px',
    backgroundColor: theme.colors.backgroundTertiary,
    border: `2px solid ${theme.colors.border}`,
    borderRadius: '15px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    padding: '2px',
    ...style
  };

  const switchStyle = {
    position: 'absolute',
    width: '22px',
    height: '22px',
    backgroundColor: theme.colors.primary,
    borderRadius: '50%',
    transition: 'transform 0.3s ease',
    transform: isDark ? 'translateX(28px)' : 'translateX(0px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px'
  };

  const iconStyle = {
    color: '#ffffff',
    fontWeight: 'bold'
  };

  return (
    <div className={className}>
      <button
        onClick={toggleTheme}
        style={buttonStyle}
        title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      >
        <div style={switchStyle}>
          <span style={iconStyle}>
            {isDark ? '🌙' : '☀️'}
          </span>
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;
