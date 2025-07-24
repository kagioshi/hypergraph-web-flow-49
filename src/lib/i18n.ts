import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Header
      jobsite: 'SARKARI RESULT',
      allIndiaGovtJob: 'All India Govt Job',
      allIndiaGovtJobs: 'All India Govt Jobs',
      stateGovtJobs: 'State Govt Jobs',
      bankJobs: 'Bank Jobs',
      pscJobs: 'PSC Jobs',
      railwayJobs: 'Railway Jobs',
      defenseJobs: 'Defense Jobs',
      admitCard: 'Admit Card',
      results: 'Results',
      answerKey: 'Answer Key',
      cutOff: 'Cut Off',
      syllabus: 'Syllabus',
      
      // Hero Section
      findYourDreamJob: 'FIND GOVERNMENT JOBS',
      heroSubtitle: 'Latest Government Job Notifications, Results, Admit Cards and Answer Keys from across India.',
      searchPlaceholder: 'Search for government jobs, exams, or departments',
      searchJobs: 'Search Jobs',
      
      // Stats
      activeJobs: 'Active Notifications',
      companies: 'Departments',
      jobSeekers: 'Candidates',
      
      // Categories
      browseByCategory: 'Browse Job Categories',
      ssc: 'SSC Jobs',
      upsc: 'UPSC Jobs',
      railway: 'Railway Jobs',
      banking: 'Banking Jobs',
      defense: 'Defense Jobs',
      statePsc: 'State PSC',
      police: 'Police & Security',
      teaching: 'Teaching Jobs',
      medical: 'Medical Jobs',
      postal: 'Postal Jobs',
      
      // Jobs
      latestJobOpportunities: 'Latest Government Job Notifications',
      latestJobs: 'Latest Notifications',
      salaryRange: 'Salary Range',
      applicationDeadline: 'Application Deadline',
      ageLimit: 'Age Limit',
      fee: 'Application Fee',
      eligibility: 'Eligibility',
      apply: 'Apply Now',
      viewDetails: 'View Details',
      downloadNotification: 'Download Notification',
      officialWebsite: 'Official Website',
      viewAllJobs: 'View All Notifications',
      bookmark: 'Bookmark',
      share: 'Share',
      
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
      jobsite: 'सरकारी रिजल्ट',
      allIndiaGovtJob: 'अखिल भारतीय सरकारी नौकरी',
      allIndiaGovtJobs: 'अखिल भारतीय सरकारी नौकरी',
      stateGovtJobs: 'राज्य सरकारी नौकरियां',
      bankJobs: 'बैंक नौकरियां',
      pscJobs: 'पीएससी नौकरियां',
      railwayJobs: 'रेलवे नौकरियां',
      defenseJobs: 'रक्षा नौकरियां',
      admitCard: 'प्रवेश पत्र',
      results: 'परिणाम',
      answerKey: 'उत्तर कुंजी',
      cutOff: 'कट ऑफ',
      syllabus: 'पाठ्यक्रम',
      
      // Hero Section (Hindi)
      findYourDreamJob: 'सरकारी नौकरी खोजें',
      heroSubtitle: 'भारत भर से नवीनतम सरकारी नौकरी अधिसूचना, परिणाम, प्रवेश पत्र और उत्तर कुंजी।',
      searchPlaceholder: 'सरकारी नौकरी, परीक्षा या विभाग खोजें',
      searchJobs: 'नौकरी खोजें',
      
      // Stats (Hindi)
      activeJobs: 'सक्रिय अधिसूचनाएं',
      companies: 'विभाग',
      jobSeekers: 'उम्मीदवार',
      
      // Categories (Hindi)
      browseByCategory: 'श्रेणी के अनुसार ब्राउज़ करें',
      ssc: 'SSC नौकरियां',
      upsc: 'UPSC नौकरियां',
      railway: 'रेलवे नौकरियां',
      banking: 'बैंकिंग नौकरियां',
      defense: 'रक्षा नौकरियां',
      statePsc: 'राज्य PSC',
      police: 'पुलिस और सुरक्षा',
      teaching: 'शिक्षण नौकरियां',
      medical: 'चिकित्सा नौकरियां',
      postal: 'डाक नौकरियां',
      
      // Jobs (Hindi)
      latestJobOpportunities: 'नवीनतम सरकारी नौकरी अधिसूचना',
      latestJobs: 'नवीनतम अधिसूचनाएं',
      salaryRange: 'वेतन सीमा',
      applicationDeadline: 'आवेदन की अंतिम तिथि',
      ageLimit: 'आयु सीमा',
      fee: 'आवेदन शुल्क',
      eligibility: 'योग्यता',
      apply: 'अभी आवेदन करें',
      viewDetails: 'विवरण देखें',
      downloadNotification: 'अधिसूचना डाउनलोड करें',
      officialWebsite: 'आधिकारिक वेबसाइट',
      viewAllJobs: 'सभी अधिसूचनाएं देखें',
      bookmark: 'बुकमार्क',
      share: 'साझा करें',
      
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