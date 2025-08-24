import React from 'react';
import { ClipLoader, BeatLoader, PulseLoader, DotLoader } from 'react-spinners';
import { useTheme } from '../contexts/ThemeContext';

const LoadingSpinner = ({ 
  type = 'clip', 
  color, 
  size = 50, 
  text = 'Loading...', 
  overlay = false 
}) => {
  const { theme } = useTheme();
  
  // Use theme color if no color is provided
  const spinnerColor = color || theme.colors.spinner;
  const spinnerComponents = {
    clip: <ClipLoader color={spinnerColor} size={size} />,
    beat: <BeatLoader color={spinnerColor} size={size} />,
    pulse: <PulseLoader color={spinnerColor} size={size} />,
    dot: <DotLoader color={spinnerColor} size={size} />
  };

  const spinner = spinnerComponents[type] || spinnerComponents.clip;

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    padding: '20px'
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.background + 'E6', // Add transparency
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const textStyle = {
    fontSize: '16px',
    color: theme.colors.textSecondary,
    fontWeight: '500'
  };

  const content = (
    <div style={containerStyle}>
      {spinner}
      {text && <p style={textStyle}>{text}</p>}
    </div>
  );

  return overlay ? (
    <div style={overlayStyle}>
      {content}
    </div>
  ) : content;
};

export default LoadingSpinner;
