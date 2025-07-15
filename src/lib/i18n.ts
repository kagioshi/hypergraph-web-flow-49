import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Header
      jobsite: 'JOBSITE',
      allIndiaGovtJob: 'All India Govt Job',
      allIndiaGovtJobs: 'All India Govt Jobs',
      stateGovtJobs: 'State Govt Jobs',
      bankJobs: 'Bank Jobs',
      pscJobs: 'PSC Jobs',
      railwayJobs: 'Railway Jobs',
      defenseJobs: 'Defense Jobs',
      admitCard: 'Admit Card',
      results: 'Results',
      
      // Hero Section
      findYourDreamJob: 'FIND YOUR DREAM JOB',
      heroSubtitle: 'Discover amazing opportunities with top companies. Join thousands who found their dream careers.',
      searchPlaceholder: 'Search for jobs, companies, or keywords',
      locationPlaceholder: 'City, state, or remote',
      searchJobs: 'Search Jobs',
      
      // Stats
      activeJobs: 'Active Jobs',
      companies: 'Companies',
      jobSeekers: 'Job Seekers',
      
      // Categories
      browseByCategory: 'Browse Job Categories',
      technology: 'Technology',
      healthcare: 'Healthcare',
      finance: 'Finance',
      education: 'Education',
      marketing: 'Marketing',
      design: 'Design',
      
      // Jobs
      latestJobOpportunities: 'Latest Job Opportunities',
      latestJobs: 'Latest Jobs',
      salaryRange: 'Salary Range',
      syllabus: 'Syllabus',
      fullTime: 'Full-time',
      partTime: 'Part-time',
      contract: 'Contract',
      remote: 'Remote',
      apply: 'Apply Now',
      viewAllJobs: 'View All Jobs',
      
      // Banners
      startupCredits: 'This website is supported by startup credits and partnerships',
      
      // Sidebar
      filterByState: 'Filter by State',
      filterByDepartment: 'Filter by Department',
      allStates: 'All States',
      allDepartments: 'All Departments',
      
      // Footer
      aboutUs: 'About Us',
      contactUs: 'Contact Us',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      followUs: 'Follow Us',
      copyright: '© 2024 JOBSITE. All rights reserved.',
    }
  },
  hi: {
    translation: {
      // Header (Hindi)
      jobsite: 'जॉबसाइट',
      allIndiaGovtJob: 'अखिल भारतीय सरकारी नौकरी',
      allIndiaGovtJobs: 'अखिल भारतीय सरकारी नौकरी',
      stateGovtJobs: 'राज्य सरकारी नौकरियां',
      bankJobs: 'बैंक नौकरियां',
      pscJobs: 'पीएससी नौकरियां',
      railwayJobs: 'रेलवे नौकरियां',
      defenseJobs: 'रक्षा नौकरियां',
      admitCard: 'प्रवेश पत्र',
      results: 'परिणाम',
      
      // Hero Section (Hindi)
      findYourDreamJob: 'अपना सपनों का काम खोजें',
      heroSubtitle: 'शीर्ष कंपनियों के साथ अद्भुत अवसर खोजें। हजारों लोग जो अपना सपनों का करियर पा चुके हैं।',
      searchPlaceholder: 'नौकरी, कंपनी या कीवर्ड खोजें',
      locationPlaceholder: 'शहर, राज्य या रिमोट',
      searchJobs: 'नौकरी खोजें',
      
      // Stats (Hindi)
      activeJobs: 'सक्रिय नौकरियां',
      companies: 'कंपनियां',
      jobSeekers: 'नौकरी तलाशने वाले',
      
      // Categories (Hindi)
      browseByCategory: 'श्रेणी के अनुसार ब्राउज़ करें',
      technology: 'प्रौद्योगिकी',
      healthcare: 'स्वास्थ्य सेवा',
      finance: 'वित्त',
      education: 'शिक्षा',
      marketing: 'मार्केटिंग',
      design: 'डिज़ाइन',
      
      // Jobs (Hindi)
      latestJobOpportunities: 'नवीनतम नौकरी के अवसर',
      latestJobs: 'नवीनतम नौकरी',
      salaryRange: 'वेतन सीमा',
      syllabus: 'पाठ्यक्रम',
      fullTime: 'पूर्णकालिक',
      partTime: 'अंशकालिक',
      contract: 'अनुबंध',
      remote: 'रिमोट',
      apply: 'अभी आवेदन करें',
      viewAllJobs: 'सभी नौकरियां देखें',
      
      // Banners (Hindi)
      startupCredits: 'यह वेबसाइट स्टार्टअप क्रेडिट और साझेदारी द्वारा समर्थित है',
      
      // Sidebar (Hindi)
      filterByState: 'राज्य के अनुसार फ़िल्टर करें',
      filterByDepartment: 'विभाग के अनुसार फ़िल्टर करें',
      allStates: 'सभी राज्य',
      allDepartments: 'सभी विभाग',
      
      // Footer (Hindi)
      aboutUs: 'हमारे बारे में',
      contactUs: 'संपर्क करें',
      privacyPolicy: 'गोपनीयता नीति',
      termsOfService: 'सेवा की शर्तें',
      followUs: 'हमें फॉलो करें',
      copyright: '© 2024 जॉबसाइट। सभी अधिकार सुरक्षित।',
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;