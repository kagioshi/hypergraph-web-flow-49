import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if Performance API is supported
    if (typeof window !== 'undefined' && 'performance' in window) {
      setIsSupported(true);
      
      // Measure page load time
      const pageLoadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      setMetrics(prev => ({ ...prev, pageLoadTime }));

      // Observe Web Vitals
      if ('PerformanceObserver' in window) {
        // First Contentful Paint
        try {
          const fcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
              if (entry.name === 'first-contentful-paint') {
                setMetrics(prev => ({ ...prev, firstContentfulPaint: entry.startTime }));
              }
            });
          });
          fcpObserver.observe({ entryTypes: ['paint'] });
        } catch (e) {
          console.warn('FCP observer not supported');
        }

        // Largest Contentful Paint
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            setMetrics(prev => ({ ...prev, largestContentfulPaint: lastEntry.startTime }));
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          console.warn('LCP observer not supported');
        }

        // Cumulative Layout Shift
        try {
          let clsValue = 0;
          const clsObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              const layoutShiftEntry = entry as any;
              if (!layoutShiftEntry.hadRecentInput) {
                clsValue += layoutShiftEntry.value;
                setMetrics(prev => ({ ...prev, cumulativeLayoutShift: clsValue }));
              }
            }
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
          console.warn('CLS observer not supported');
        }

        // First Input Delay
        try {
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
              const fidEntry = entry as any;
              setMetrics(prev => ({ ...prev, firstInputDelay: fidEntry.processingStart - fidEntry.startTime }));
            });
          });
          fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
          console.warn('FID observer not supported');
        }
      }
    }

    return () => {
      // Cleanup observers if needed
    };
  }, []);

  const reportMetrics = () => {
    if (isSupported && Object.keys(metrics).length > 0) {
      // Report to analytics service
      console.log('Performance Metrics:', metrics);
      
      // You can integrate with your analytics service here
      // analytics.track('performance_metrics', metrics);
    }
  };

  const getPerformanceScore = (): 'good' | 'needs-improvement' | 'poor' => {
    const { largestContentfulPaint, cumulativeLayoutShift, firstInputDelay } = metrics;
    
    if (largestContentfulPaint && cumulativeLayoutShift && firstInputDelay) {
      const lcpScore = largestContentfulPaint <= 2500 ? 100 : largestContentfulPaint <= 4000 ? 50 : 0;
      const clsScore = cumulativeLayoutShift <= 0.1 ? 100 : cumulativeLayoutShift <= 0.25 ? 50 : 0;
      const fidScore = firstInputDelay <= 100 ? 100 : firstInputDelay <= 300 ? 50 : 0;
      
      const averageScore = (lcpScore + clsScore + fidScore) / 3;
      
      if (averageScore >= 80) return 'good';
      if (averageScore >= 50) return 'needs-improvement';
      return 'poor';
    }
    
    return 'needs-improvement';
  };

  return {
    metrics,
    isSupported,
    reportMetrics,
    performanceScore: getPerformanceScore(),
  };
};