// Global type declarations for third-party libraries
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    fbq?: (...args: any[]) => void;
    hj?: (...args: any[]) => void;
  }
}

export {};