
import { useSEO, SEOHelmet } from "@/hooks/useSEO";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { JobSidebar } from "@/components/JobSidebar";
import { JobFooter } from "@/components/JobFooter";
import { AdSpace } from "@/components/AdSpace";
import { AMP } from "@/components/AMP";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Briefcase, Users, TrendingUp, Star, Laptop, Heart, Building2, GraduationCap, Megaphone, Palette } from "lucide-react";

const Index = () => {
  const { t } = useTranslation();
  
  const latestJobs = [
    {
      title: "Senior React Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      salary: "$120K - $180K",
      type: "Full-time",
      tags: ["React", "TypeScript", "Remote"],
      description: "Build scalable web applications using React and TypeScript",
      datePosted: new Date().toISOString(),
      employmentType: "FULL_TIME"
    },
    {
      title: "Product Manager",
      company: "StartupXYZ",
      location: "New York, NY", 
      salary: "$100K - $150K",
      type: "Full-time",
      tags: ["Product", "Strategy", "Agile"],
      description: "Lead product strategy and development for innovative solutions",
      datePosted: new Date().toISOString(),
      employmentType: "FULL_TIME"
    },
    {
      title: "UX Designer",
      company: "DesignStudio",
      location: "Remote",
      salary: "$80K - $120K",
      type: "Contract",
      tags: ["Figma", "User Research", "Prototyping"],
      description: "Create intuitive user experiences and design systems",
      datePosted: new Date().toISOString(),
      employmentType: "CONTRACTOR"
    }
  ];

  const seoData = useSEO({
    title: t('jobsite') + " - " + t('findYourDreamJob'),
    description: t('heroSubtitle'),
    keywords: "jobs, careers, employment, hiring, job search, remote jobs, full-time jobs, government jobs",
    jobPostings: latestJobs,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "JobBoard",
      "name": "Job Board",
      "description": "Modern job board with 10K+ active jobs",
      "url": "https://yourjobboard.com"
    }
  });

  const { isMobile } = useDeviceDetection();

  const stats = [
    { label: "Active Jobs", value: "10K+", icon: Briefcase, labelKey: "activeJobs" },
    { label: "Companies", value: "500+", icon: Users, labelKey: "companies" },
    { label: "Job Seekers", value: "50K+", icon: TrendingUp, labelKey: "jobSeekers" }
  ];

  const categories = [
    { name: t('technology'), count: "2.5K", icon: Laptop, color: "text-black" },
    { name: t('healthcare'), count: "1.1K", icon: Heart, color: "text-black" },
    { name: t('finance'), count: "900", icon: TrendingUp, color: "text-black" },
    { name: t('education'), count: "800", icon: GraduationCap, color: "text-black" },
    { name: t('marketing'), count: "1.2K", icon: Megaphone, color: "text-black" },
    { name: t('design'), count: "600", icon: Palette, color: "text-black" }
  ];

  return (
    <>
      <SEOHelmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        
        {/* Open Graph */}
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:image" content={seoData.image} />
        <meta property="og:url" content={seoData.url} />
        <meta property="og:type" content={seoData.type} />
        <meta property="og:site_name" content="Job Board" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <meta name="twitter:image" content={seoData.image} />
        <meta name="twitter:site" content="@jobboard" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href={seoData.url} />
      </SEOHelmet>

      <AMP enabled={isMobile} analytics={{ googleAnalytics: 'GA_TRACKING_ID' }} />

      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Top Banner Ad */}
        <AdSpace variant="banner" size="large" className="mx-auto max-w-6xl my-4" />
        
        {/* Navigation Tabs - Brutal Style */}
        <section className="bg-white border-b-brutal border-black">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 py-4 text-sm">
              <div className="bg-primary border-brutal shadow-card">
                <button className="px-4 py-2 text-black font-black uppercase">{t('allIndiaGovtJobs')}</button>
              </div>
              {[
                'stateGovtJobs', 'bankJobs', 'railwayJobs', 'defenseJobs', 'admitCard', 'results'
              ].map((key, index) => (
                <div key={key} className={`bg-white border-brutal shadow-card hover:shadow-hover transition-none ${index % 2 === 0 ? 'transform rotate-1' : 'transform -rotate-1'}`}>
                  <button className="px-4 py-2 text-black font-black uppercase text-xs">{t(key)}</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hero Section - Complete Brutal Redesign */}
        <section className="bg-brutal-primary border-t-brutal border-b-brutal border-black relative overflow-hidden py-20">
          <div className="container mx-auto px-4">
            <div className="hero-content max-w-4xl mx-auto text-center">
              <div className="bg-brutal-accent border-brutal shadow-hover p-8 mb-8 transform -rotate-1">
                <h1 className="text-4xl md:text-6xl font-black text-black mb-6 uppercase tracking-wider leading-none">
                  FIND YOUR 
                  <span className="block bg-brutal-secondary border-brutal shadow-card px-4 py-2 mt-2 transform rotate-2 inline-block">
                    DREAM JOB
                  </span>
                </h1>
              </div>
              
              <div className="bg-white border-brutal shadow-card p-6 mb-8 transform rotate-1">
                <p className="text-lg md:text-xl text-black font-black uppercase tracking-wide">
                  DISCOVER THOUSANDS OF OPPORTUNITIES FROM TOP COMPANIES WORLDWIDE
                </p>
              </div>
              
              {/* Search Bar - Brutal Style */}
              <div className="bg-white border-brutal shadow-hover p-6 transform -rotate-1">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black h-5 w-5" />
                    <Input 
                      placeholder={t('searchPlaceholder').toUpperCase()}
                      className="pl-10 h-14 text-black font-black uppercase"
                    />
                  </div>
                  <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black h-5 w-5" />
                    <Input 
                      placeholder={t('locationPlaceholder').toUpperCase()}
                      className="pl-10 h-14 text-black font-black uppercase"
                    />
                  </div>
                  <Button size="lg" className="h-14 px-8 bg-brutal-secondary text-black" variant="brutal">
                    {t('searchJobs').toUpperCase()}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Startup Credits Banner - Brutal */}
        <section className="py-4 bg-brutal-secondary border-b-brutal border-black">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-black font-black uppercase tracking-wider">
              {t('startupCredits')}
            </p>
          </div>
        </section>

        {/* Stats Section - Brutal Cards */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <Card className={`card-brutal p-6 bg-brutal-accent transform ${index % 2 === 0 ? 'rotate-2' : '-rotate-2'}`}>
                    <CardContent className="p-0">
                      <div className="bg-white border-brutal shadow-card p-4 mb-4 inline-block">
                        <stat.icon className="h-12 w-12 text-black" />
                      </div>
                      <div className="text-4xl font-black text-black mb-2 uppercase tracking-wider">{stat.value}</div>
                      <div className="text-black font-black uppercase text-sm">{t(stat.labelKey)}</div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content with Sidebar and Ads */}
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar with Ads */}
            <aside className="lg:w-80 space-y-6">
              <JobSidebar />
              <AdSpace variant="sidebar" size="large" title="SPONSORED" />
              <AdSpace variant="sidebar" size="medium" title="FEATURED" />
            </aside>

            {/* Main Content */}
            <main className="flex-1 space-y-8">
              {/* Inline Ad */}
              <AdSpace variant="inline" title="NATIVE AD" />
              
              {/* Categories Section - Brutal Grid */}
              <section>
                <div className="bg-brutal-primary border-brutal shadow-hover p-6 mb-8 transform rotate-1">
                  <h2 className="text-3xl font-black text-center text-black uppercase tracking-wider">
                    {t('browseByCategory')}
                  </h2>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {categories.map((category, index) => (
                    <Card key={category.name} className={`card-brutal cursor-pointer bg-brutal-accent transform ${index % 3 === 0 ? 'rotate-2' : index % 3 === 1 ? '-rotate-1' : 'rotate-1'} hover:shadow-hover transition-none`}>
                      <CardContent className="p-6 text-center">
                        <div className="bg-white border-brutal shadow-card p-3 mb-3 inline-block">
                          <category.icon className="h-8 w-8 text-black" />
                        </div>
                        <h3 className="font-black mb-1 uppercase tracking-wide text-black text-sm">{category.name}</h3>
                        <p className="text-xs text-black font-black uppercase">{category.count} JOBS</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Another Inline Ad */}
              <AdSpace variant="inline" title="PROMOTED" />

              {/* Filter Tabs - Brutal */}
              <section>
                <div className="flex flex-wrap gap-4 mb-6">
                  {['latestJobs', 'salaryRange', 'admitCard', 'results', 'syllabus'].map((key, index) => (
                    <div key={key} className={`${index === 0 ? 'bg-primary' : 'bg-white'} border-brutal shadow-card hover:shadow-hover transition-none transform ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}>
                      <button className="px-6 py-3 font-black uppercase text-xs text-black">
                        {t(key)}
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Latest Jobs Section - Brutal Cards */}
              <section>
                <div className="bg-brutal-secondary border-brutal shadow-hover p-6 mb-8 transform -rotate-1">
                  <h2 className="text-3xl font-black text-black uppercase tracking-wider">
                    {t('latestJobOpportunities')}
                  </h2>
                </div>
                
                <div className="grid gap-8">
                  {latestJobs.map((job, index) => (
                    <Card key={index} className={`card-brutal bg-white transform ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <Badge variant="outline" className="bg-brutal-secondary text-black border-brutal font-black uppercase text-xs">
                            {job.type}
                          </Badge>
                          <div className="bg-brutal-accent border-brutal shadow-card p-2">
                            <Star className="h-5 w-5 text-black" />
                          </div>
                        </div>
                        
                        <div className="bg-brutal-primary border-brutal shadow-card p-4 mb-4 transform rotate-1">
                          <h3 className="font-black text-lg uppercase tracking-wide text-black">{job.title}</h3>
                        </div>
                        
                        <p className="text-black mb-2 font-black uppercase text-sm">{job.company}</p>
                        <div className="flex items-center text-sm text-black mb-3 font-black uppercase">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </div>
                        
                        <div className="bg-brutal-accent border-brutal shadow-card p-3 mb-4 inline-block">
                          <div className="text-lg font-black text-black uppercase">
                            {job.salary}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs bg-white border-brutal font-black uppercase text-black">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <Button className="w-full bg-brutal-primary text-black" variant="brutal">
                          APPLY NOW
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="text-center mt-8">
                  <div className="bg-white border-brutal shadow-card hover:shadow-hover transition-none transform rotate-1 inline-block">
                    <Button variant="outline" size="lg" className="bg-white text-black border-none shadow-none font-black uppercase px-8 py-4">
                      {t('viewAllJobs')}
                    </Button>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>

        {/* Sticky Bottom Ad */}
        <AdSpace variant="sticky" title="BOTTOM AD" />

        <JobFooter />
      </div>
    </>
  );
};

export default Index;
