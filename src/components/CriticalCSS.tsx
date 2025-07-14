import { useEffect } from "react";

// Critical CSS for above-the-fold content
const criticalStyles = `
  /* Critical styles for initial page load */
  .hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-foreground)) 100%);
  }
  
  .hero-content {
    text-align: center;
    animation: fadeInUp 0.6s ease-out;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Performance optimizations */
  * {
    box-sizing: border-box;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  /* Preload font display */
  @font-face {
    font-family: 'Inter';
    font-display: swap;
  }
`;

export const CriticalCSS = () => {
  useEffect(() => {
    // Inject critical CSS immediately
    const style = document.createElement('style');
    style.textContent = criticalStyles;
    style.id = 'critical-css';
    
    // Insert at the beginning of head for highest priority
    document.head.insertBefore(style, document.head.firstChild);
    
    return () => {
      const existingStyle = document.getElementById('critical-css');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return null;
};