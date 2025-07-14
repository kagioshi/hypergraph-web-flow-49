import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SEOProvider } from "@/providers/SEOProvider";
import { PWAPrompt } from "@/components/PWAPrompt";
import { CriticalCSS } from "@/components/CriticalCSS";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import { useThirdPartyScripts } from "@/hooks/useThirdPartyScripts";
import { useEffect } from "react";
import "./lib/i18n";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const AppContent = () => {
  const { initializeThirdPartyServices } = useThirdPartyScripts();

  useEffect(() => {
    // Initialize third-party services
    initializeThirdPartyServices({
      // Add your tracking IDs here
      // googleAnalytics: 'GA_TRACKING_ID',
      // googleTagManager: 'GTM_ID',
      // facebookPixel: 'PIXEL_ID',
      // hotjar: 'HOTJAR_ID'
    });
  }, [initializeThirdPartyServices]);

  return (
    <>
      <CriticalCSS />
      <PerformanceMonitor />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <PWAPrompt />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SEOProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </SEOProvider>
  </QueryClientProvider>
);

export default App;
