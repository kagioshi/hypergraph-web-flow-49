import { 
  isMobile, 
  isTablet, 
  isDesktop, 
  isBrowser,
  isMobileOnly,
  browserName,
  osName,
  deviceType
} from "react-device-detect";
import { useState, useEffect } from "react";

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isBrowser: boolean;
  isMobileOnly: boolean;
  isTabletDevice: boolean;
  browserName: string;
  osName: string;
  deviceType: string;
  screenSize: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  orientation: 'portrait' | 'landscape';
  isOnline: boolean;
  connectionType: string;
}

export const useDeviceDetection = (): DeviceInfo => {
  const [screenSize, setScreenSize] = useState<'sm' | 'md' | 'lg' | 'xl' | '2xl'>('md');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionType, setConnectionType] = useState('unknown');

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) setScreenSize('sm');
      else if (width < 768) setScreenSize('md');
      else if (width < 1024) setScreenSize('lg');
      else if (width < 1280) setScreenSize('xl');
      else setScreenSize('2xl');
    };

    const updateOrientation = () => {
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
    };

    const updateConnection = () => {
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      if (connection) {
        setConnectionType(connection.effectiveType || 'unknown');
      }
    };

    updateScreenSize();
    updateOrientation();
    updateConnection();

    window.addEventListener('resize', updateScreenSize);
    window.addEventListener('resize', updateOrientation);
    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));

    return () => {
      window.removeEventListener('resize', updateScreenSize);
      window.removeEventListener('resize', updateOrientation);
      window.removeEventListener('online', () => setIsOnline(true));
      window.removeEventListener('offline', () => setIsOnline(false));
    };
  }, []);

  return {
    isMobile,
    isTablet,
    isDesktop,
    isBrowser,
    isMobileOnly,
    isTabletDevice: isTablet && !isMobile,
    browserName,
    osName,
    deviceType,
    screenSize,
    orientation,
    isOnline,
    connectionType
  };
};