
import { useEffect } from 'react';

interface AMPProps {
  enabled?: boolean;
  analytics?: {
    googleAnalytics?: string;
    gtm?: string;
  };
}

export const AMP = ({ enabled = false, analytics }: AMPProps) => {
  useEffect(() => {
    if (!enabled) return;

    // Add AMP boilerplate CSS
    const ampBoilerplate = document.createElement('style');
    ampBoilerplate.setAttribute('amp-boilerplate', '');
    ampBoilerplate.textContent = `
      body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}
      @-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
      @-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
      @-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
      @-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
      @keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
    `;
    document.head.appendChild(ampBoilerplate);

    // Add AMP nojs fallback
    const noscript = document.createElement('noscript');
    const noScriptStyle = document.createElement('style');
    noScriptStyle.setAttribute('amp-boilerplate', '');
    noScriptStyle.textContent = 'body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}';
    noscript.appendChild(noScriptStyle);
    document.head.appendChild(noscript);

    // Add AMP runtime
    const ampScript = document.createElement('script');
    ampScript.setAttribute('async', '');
    ampScript.setAttribute('src', 'https://cdn.ampproject.org/v0.js');
    document.head.appendChild(ampScript);

    // Add AMP analytics if configured
    if (analytics) {
      const analyticsScript = document.createElement('script');
      analyticsScript.setAttribute('async', '');
      analyticsScript.setAttribute('custom-element', 'amp-analytics');
      analyticsScript.setAttribute('src', 'https://cdn.ampproject.org/v0/amp-analytics-0.1.js');
      document.head.appendChild(analyticsScript);
    }

    // Set AMP HTML attribute
    document.documentElement.setAttribute('amp', '');

    return () => {
      // Cleanup AMP elements when component unmounts
      document.documentElement.removeAttribute('amp');
      const ampElements = document.querySelectorAll('[amp-boilerplate], script[src*="ampproject.org"]');
      ampElements.forEach(el => el.remove());
    };
  }, [enabled, analytics]);

  if (!enabled) return null;

  return (
    <>
      {analytics?.googleAnalytics && (
        <amp-analytics type="googleanalytics" id="analytics1">
          <script type="application/json" dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              vars: {
                account: analytics.googleAnalytics
              },
              triggers: {
                trackPageview: {
                  on: 'visible',
                  request: 'pageview'
                }
              }
            })
          }} />
        </amp-analytics>
      )}
    </>
  );
};

export const useAMP = () => {
  const isAMP = typeof window !== 'undefined' && document.documentElement.hasAttribute('amp');
  
  return {
    isAMP,
    enableAMP: () => document.documentElement.setAttribute('amp', ''),
    disableAMP: () => document.documentElement.removeAttribute('amp')
  };
};
