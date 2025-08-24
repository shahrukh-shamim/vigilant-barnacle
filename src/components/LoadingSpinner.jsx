import React from 'react';
import { ClipLoader, BeatLoader, PulseLoader, DotLoader } from 'react-spinners';

const LoadingSpinner = ({ 
  type = 'clip', 
  color = '#3b82f6', 
  size = 50, 
  text = 'Loading...', 
  overlay = false 
}) => {
  const spinnerComponents = {
    clip: <ClipLoader color={color} size={size} />,
    beat: <BeatLoader color={color} size={size} />,
    pulse: <PulseLoader color={color} size={size} />,
    dot: <DotLoader color={color} size={size} />
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const textStyle = {
    fontSize: '16px',
    color: '#6b7280',
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
