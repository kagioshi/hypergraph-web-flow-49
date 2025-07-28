import { useEffect } from 'react';

interface AnalyticsEvent {
  event_name: string;
  event_parameters?: Record<string, any>;
}

interface JobViewEvent {
  job_id: string;
  job_title: string;
  job_company: string;
  job_department: string;
  job_location: string;
}

interface SearchEvent {
  search_term?: string;
  department?: string;
  location?: string;
  job_type?: string;
  results_count: number;
}

export const useAnalytics = () => {
  useEffect(() => {
    // Initialize Google Analytics if tracking ID is available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_TRACKING_ID', {
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, []);

  const trackEvent = (event: AnalyticsEvent) => {
    // Track with Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.event_name, event.event_parameters);
    }

    // Track with console for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', event);
    }

    // Send to custom analytics endpoint if available
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(event)
    // }).catch(() => {});
  };

  const trackJobView = (job: JobViewEvent) => {
    trackEvent({
      event_name: 'job_view',
      event_parameters: {
        job_id: job.job_id,
        job_title: job.job_title,
        job_company: job.job_company,
        job_department: job.job_department,
        job_location: job.job_location,
        timestamp: Date.now(),
      }
    });
  };

  const trackJobBookmark = (jobId: string, action: 'add' | 'remove') => {
    trackEvent({
      event_name: 'job_bookmark',
      event_parameters: {
        job_id: jobId,
        action,
        timestamp: Date.now(),
      }
    });
  };

  const trackJobShare = (jobId: string, platform: string) => {
    trackEvent({
      event_name: 'job_share',
      event_parameters: {
        job_id: jobId,
        platform,
        timestamp: Date.now(),
      }
    });
  };

  const trackSearch = (searchParams: SearchEvent) => {
    trackEvent({
      event_name: 'job_search',
      event_parameters: {
        ...searchParams,
        timestamp: Date.now(),
      }
    });
  };

  const trackJobAlertCreated = (keywords: string[], department?: string) => {
    trackEvent({
      event_name: 'job_alert_created',
      event_parameters: {
        keywords_count: keywords.length,
        department,
        timestamp: Date.now(),
      }
    });
  };

  const trackPageView = (pageName: string) => {
    trackEvent({
      event_name: 'page_view',
      event_parameters: {
        page_name: pageName,
        page_location: window.location.href,
        timestamp: Date.now(),
      }
    });
  };

  return {
    trackEvent,
    trackJobView,
    trackJobBookmark,
    trackJobShare,
    trackSearch,
    trackJobAlertCreated,
    trackPageView,
  };
};

// Type declaration moved to global.d.ts to avoid conflicts