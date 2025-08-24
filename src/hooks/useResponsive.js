import { useEffect, useState } from 'react';

// Custom hook to detect device type and screen size
export const useResponsive = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    screenWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
    screenHeight: typeof window !== 'undefined' ? window.innerHeight : 0,
    orientation: 'portrait'
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setDeviceInfo({
        isMobile: width <= 768,
        isTablet: width > 768 && width <= 1024,
        isDesktop: width > 1024,
        screenWidth: width,
        screenHeight: height,
        orientation: width > height ? 'landscape' : 'portrait'
      });
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return deviceInfo;
};

// Breakpoint constants
export const BREAKPOINTS = {
  MOBILE_SMALL: 320,
  MOBILE_LARGE: 480,
  TABLET_SMALL: 768,
  TABLET_LARGE: 1024,
  DESKTOP: 1200,
  DESKTOP_LARGE: 1440
};

// Utility functions for responsive logic
export const getResponsiveValue = (values, screenWidth) => {
  if (screenWidth <= BREAKPOINTS.MOBILE_LARGE) return values.mobile || values.default;
  if (screenWidth <= BREAKPOINTS.TABLET_LARGE) return values.tablet || values.mobile || values.default;
  return values.desktop || values.tablet || values.mobile || values.default;
};

export const getGridColumns = (screenWidth) => {
  if (screenWidth <= BREAKPOINTS.MOBILE_LARGE) return 1;
  if (screenWidth <= BREAKPOINTS.TABLET_SMALL) return 2;
  if (screenWidth <= BREAKPOINTS.TABLET_LARGE) return 3;
  return 4;
};

export const getContainerPadding = (screenWidth) => {
  if (screenWidth <= BREAKPOINTS.MOBILE_LARGE) return '0.75rem';
  if (screenWidth <= BREAKPOINTS.TABLET_LARGE) return '1rem';
  return '2rem';
};

export default useResponsive;
