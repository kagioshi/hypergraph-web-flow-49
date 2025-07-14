import { useEffect, useCallback } from "react";

interface ScriptConfig {
  src: string;
  async?: boolean;
  defer?: boolean;
  strategy?: 'afterInteractive' | 'lazyOnload' | 'beforeInteractive';
  onLoad?: () => void;
  onError?: () => void;
  id?: string;
}

interface ThirdPartyScripts {
  googleAnalytics?: string;
  googleTagManager?: string;
  facebookPixel?: string;
  hotjar?: string;
  intercom?: string;
  crisp?: string;
}

export const useThirdPartyScripts = () => {
  const loadScript = useCallback((config: ScriptConfig) => {
    return new Promise<void>((resolve, reject) => {
      // Check if script already exists
      if (config.id && document.getElementById(config.id)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = config.src;
      script.async = config.async ?? true;
      script.defer = config.defer ?? false;
      
      if (config.id) {
        script.id = config.id;
      }

      script.onload = () => {
        config.onLoad?.();
        resolve();
      };

      script.onerror = () => {
        config.onError?.();
        reject(new Error(`Failed to load script: ${config.src}`));
      };

      // Load strategy
      if (config.strategy === 'beforeInteractive') {
        document.head.appendChild(script);
      } else if (config.strategy === 'afterInteractive') {
        if (document.readyState === 'complete') {
          document.head.appendChild(script);
        } else {
          window.addEventListener('load', () => {
            document.head.appendChild(script);
          });
        }
      } else if (config.strategy === 'lazyOnload') {
        setTimeout(() => {
          document.head.appendChild(script);
        }, 0);
      } else {
        document.head.appendChild(script);
      }
    });
  }, []);

  const loadGoogleAnalytics = useCallback((trackingId: string) => {
    loadScript({
      src: `https://www.googletagmanager.com/gtag/js?id=${trackingId}`,
      strategy: 'afterInteractive',
      id: 'google-analytics'
    });

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', trackingId);
  }, [loadScript]);

  const loadGoogleTagManager = useCallback((gtmId: string) => {
    // GTM Script
    loadScript({
      src: `https://www.googletagmanager.com/gtm.js?id=${gtmId}`,
      strategy: 'afterInteractive',
      id: 'google-tag-manager'
    });

    // GTM NoScript fallback
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });
  }, [loadScript]);

  const loadFacebookPixel = useCallback((pixelId: string) => {
    loadScript({
      src: 'https://connect.facebook.net/en_US/fbevents.js',
      strategy: 'afterInteractive',
      id: 'facebook-pixel',
      onLoad: () => {
        (window as any).fbq('init', pixelId);
        (window as any).fbq('track', 'PageView');
      }
    });
  }, [loadScript]);

  const loadHotjar = useCallback((hjid: string, hjsv: string) => {
    (window as any).hj = (window as any).hj || function (...args: any[]) {
      ((window as any).hj.q = (window as any).hj.q || []).push(args);
    };
    
    loadScript({
      src: `https://static.hotjar.com/c/hotjar-${hjid}.js?sv=${hjsv}`,
      strategy: 'afterInteractive',
      id: 'hotjar'
    });
  }, [loadScript]);

  const initializeThirdPartyServices = useCallback((services: ThirdPartyScripts) => {
    if (services.googleAnalytics) {
      loadGoogleAnalytics(services.googleAnalytics);
    }
    
    if (services.googleTagManager) {
      loadGoogleTagManager(services.googleTagManager);
    }
    
    if (services.facebookPixel) {
      loadFacebookPixel(services.facebookPixel);
    }
    
    if (services.hotjar) {
      loadHotjar(services.hotjar, '6');
    }
  }, [loadGoogleAnalytics, loadGoogleTagManager, loadFacebookPixel, loadHotjar]);

  return {
    loadScript,
    loadGoogleAnalytics,
    loadGoogleTagManager,
    loadFacebookPixel,
    loadHotjar,
    initializeThirdPartyServices
  };
};

// Extend window object for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    hj: (...args: any[]) => void;
  }
}