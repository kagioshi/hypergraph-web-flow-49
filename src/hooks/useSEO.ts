import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  jsonLd?: object;
}

export const useSEO = ({
  title = "Job Board - Find Your Dream Job",
  description = "Modern job board with 10K+ active jobs across multiple industries",
  image = "/og-image.jpg",
  url = window.location.href,
  type = "website",
  keywords = "jobs, careers, employment, hiring, job search",
  author = "Job Board Team",
  publishedTime,
  modifiedTime,
  jsonLd
}: SEOProps = {}) => {
  
  const seoTitle = title.includes("Job Board") ? title : `${title} | Job Board`;
  
  useEffect(() => {
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Add structured data
    if (jsonLd) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    }
  }, [url, jsonLd]);

  return {
    title: seoTitle,
    description,
    image,
    url,
    type,
    keywords,
    author,
    publishedTime,
    modifiedTime
  };
};

export { Helmet as SEOHelmet };