import { useEffect } from "react";

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint  
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

export const PerformanceMonitor = () => {
  useEffect(() => {
    // Web Vitals monitoring
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log performance metrics
        console.log(`${entry.name}: ${entry.startTime}`);
        
        // Send to analytics if needed
        if (window.gtag) {
          window.gtag('event', 'timing_complete', {
            name: entry.name,
            value: Math.round(entry.startTime)
          });
        }
      }
    });

    // Observe different performance metrics
    observer.observe({ entryTypes: ['measure', 'navigation', 'paint'] });

    // Monitor FCP (First Contentful Paint)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          console.log('FCP:', entry.startTime);
        }
      }
    }).observe({ entryTypes: ['paint'] });

    // Monitor LCP (Largest Contentful Paint)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // Monitor FID (First Input Delay)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const perfEntry = entry as any;
        const fid = perfEntry.processingStart - perfEntry.startTime;
        console.log('FID:', fid);
      }
    }).observe({ entryTypes: ['first-input'] });

    // Monitor CLS (Cumulative Layout Shift)
    let clsScore = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsScore += (entry as any).value;
        }
      }
      console.log('CLS:', clsScore);
    }).observe({ entryTypes: ['layout-shift'] });

    // Resource loading performance
    const measureResourcePerformance = () => {
      const resources = performance.getEntriesByType('resource');
      const slowResources = resources.filter(resource => resource.duration > 1000);
      
      if (slowResources.length > 0) {
        console.warn('Slow loading resources:', slowResources);
      }
    };

    // Check performance after page load
    if (document.readyState === 'complete') {
      measureResourcePerformance();
    } else {
      window.addEventListener('load', measureResourcePerformance);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
};