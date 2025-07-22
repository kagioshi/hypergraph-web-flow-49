
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
  jobPostings?: Array<{
    title: string;
    company: string;
    location: string;
    salary?: string;
    description: string;
    datePosted: string;
    validThrough?: string;
    employmentType?: string;
  }>;
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
  jsonLd,
  jobPostings = []
}: SEOProps = {}) => {
  
  const seoTitle = title.includes("Job Board") ? title : `${title} | Job Board`;
  
  // Generate comprehensive JSON-LD schemas
  const generateSchemas = () => {
    const schemas = [];

    // Main Website Schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Job Board",
      "url": window.location.origin,
      "description": description,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${window.location.origin}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    });

    // Organization Schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Job Board",
      "url": window.location.origin,
      "logo": `${window.location.origin}/logo.png`,
      "description": description,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-800-JOB-BOARD",
        "contactType": "Customer Service"
      },
      "sameAs": [
        "https://facebook.com/jobboard",
        "https://twitter.com/jobboard",
        "https://linkedin.com/company/jobboard"
      ]
    });

    // JobBoard Schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "JobBoard",
      "name": "Job Board",
      "description": description,
      "url": window.location.origin,
      "publisher": {
        "@type": "Organization",
        "name": "Job Board",
        "url": window.location.origin
      }
    });

    // Job Postings Schemas
    jobPostings.forEach((job, index) => {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "JobPosting",
        "title": job.title,
        "description": job.description,
        "datePosted": job.datePosted,
        "validThrough": job.validThrough || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        "employmentType": job.employmentType || "FULL_TIME",
        "hiringOrganization": {
          "@type": "Organization",
          "name": job.company
        },
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": job.location
          }
        },
        "baseSalary": job.salary ? {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": {
            "@type": "QuantitativeValue",
            "value": job.salary
          }
        } : undefined
      });
    });

    // Breadcrumb Schema for navigation
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": window.location.origin
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Jobs",
          "item": `${window.location.origin}/jobs`
        }
      ]
    });

    return schemas;
  };

  useEffect(() => {
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Add comprehensive structured data
    const schemas = generateSchemas();
    
    // Remove existing JSON-LD scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    // Add new schemas
    schemas.forEach((schema, index) => {
      const script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-schema-index', index.toString());
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Add additional meta tags for better SEO
    const metaTags = [
      { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
      { name: 'googlebot', content: 'index, follow' },
      { name: 'bingbot', content: 'index, follow' },
      { name: 'revisit-after', content: '1 day' },
      { name: 'language', content: 'en' },
      { name: 'distribution', content: 'global' },
      { name: 'rating', content: 'general' },
      { name: 'theme-color', content: '#00FF00' },
      { name: 'msapplication-TileColor', content: '#00FF00' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    ];

    metaTags.forEach(({ name, content }) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

  }, [url, jobPostings]);

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
