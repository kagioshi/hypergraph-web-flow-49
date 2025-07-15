import { useSEO, SEOHelmet } from "@/hooks/useSEO";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import { useTranslation } from "react-i18next";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Header } from "@/components/Header";
import { JobSidebar } from "@/components/JobSidebar";
import { JobFooter } from "@/components/JobFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Briefcase, Users, TrendingUp, Star, Laptop, Heart, Building2, GraduationCap, Megaphone, Palette } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const { t } = useTranslation();
  const seoData = useSEO({
    title: t('jobsite') + " - " + t('findYourDreamJob'),
    description: t('heroSubtitle'),
    keywords: "jobs, careers, employment, hiring, job search, remote jobs, full-time jobs, government jobs",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "JobBoard",
      "name": "Job Board",
      "description": "Modern job board with 10K+ active jobs",
      "url": "https://yourjobboard.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://yourjobboard.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  });

  const { isMobile, screenSize } = useDeviceDetection();

  const stats = [
    { label: "Active Jobs", value: "10K+", icon: Briefcase, labelKey: "activeJobs" },
    { label: "Companies", value: "500+", icon: Users, labelKey: "companies" },
    { label: "Job Seekers", value: "50K+", icon: TrendingUp, labelKey: "jobSeekers" }
  ];

  const categories = [
    { name: t('technology'), count: "2.5K", icon: Laptop, color: "text-blue-600" },
    { name: t('healthcare'), count: "1.1K", icon: Heart, color: "text-red-500" },
    { name: t('finance'), count: "900", icon: TrendingUp, color: "text-green-600" },
    { name: t('education'), count: "800", icon: GraduationCap, color: "text-purple-600" },
    { name: t('marketing'), count: "1.2K", icon: Megaphone, color: "text-orange-500" },
    { name: t('design'), count: "600", icon: Palette, color: "text-pink-500" }
  ];

  const latestJobs = [
    {
      title: "Senior React Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      salary: "$120K - $180K",
      type: "Full-time",
      tags: ["React", "TypeScript", "Remote"]
    },
    {
      title: "Product Manager",
      company: "StartupXYZ",
      location: "New York, NY", 
      salary: "$100K - $150K",
      type: "Full-time",
      tags: ["Product", "Strategy", "Agile"]
    },
    {
      title: "UX Designer",
      company: "DesignStudio",
      location: "Remote",
      salary: "$80K - $120K",
      type: "Contract",
      tags: ["Figma", "User Research", "Prototyping"]
    }
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
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <meta name="twitter:image" content={seoData.image} />
      </SEOHelmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Navigation Tabs */}
        <section className="bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 py-4 text-sm">
              <button className="px-4 py-2 bg-primary text-white rounded-md">{t('allIndiaGovtJobs')}</button>
              <button className="px-4 py-2 hover:bg-muted rounded-md">{t('stateGovtJobs')}</button>
              <button className="px-4 py-2 hover:bg-muted rounded-md">{t('bankJobs')}</button>
              <button className="px-4 py-2 hover:bg-muted rounded-md">{t('railwayJobs')}</button>
              <button className="px-4 py-2 hover:bg-muted rounded-md">{t('defenseJobs')}</button>
              <button className="px-4 py-2 hover:bg-muted rounded-md">{t('admitCard')}</button>
              <button className="px-4 py-2 hover:bg-muted rounded-md">{t('results')}</button>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="hero-brutal bg-brutal-primary relative overflow-hidden py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="hero-content max-w-4xl mx-auto text-center"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-5xl md:text-7xl font-black text-black mb-6 uppercase tracking-wider">
                FIND YOUR <span className="text-black bg-brutal-accent px-4 py-2 border-brutal shadow-brutal inline-block">DREAM JOB</span>
              </h1>
              <p className="text-xl md:text-2xl text-black mb-8 max-w-2xl mx-auto font-black uppercase">
                DISCOVER THOUSANDS OF OPPORTUNITIES FROM TOP COMPANIES WORLDWIDE
              </p>
              
              {/* Search Bar */}
              <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto p-4 bg-white border-brutal shadow-brutal">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black h-5 w-5" />
                  <Input 
                    placeholder={t('searchPlaceholder').toUpperCase()}
                    className="pl-10 h-12"
                  />
                </div>
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black h-5 w-5" />
                  <Input 
                    placeholder={t('locationPlaceholder').toUpperCase()}
                    className="pl-10 h-12"
                  />
                </div>
                <Button size="lg" className="h-12 px-8" variant="brutal">
                  {t('searchJobs')}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Startup Credits Banner */}
        <section className="py-4 bg-brutal-secondary border-t-brutal border-b-brutal">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-black font-black uppercase tracking-wider">
              {t('startupCredits')}
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="card-brutal p-6 bg-brutal-accent">
                    <CardContent className="p-0">
                      <stat.icon className="h-12 w-12 text-black mx-auto mb-4" />
                      <div className="text-4xl font-black text-black mb-2 uppercase tracking-wider">{stat.value}</div>
                      <div className="text-black font-black uppercase text-sm">{t(stat.labelKey)}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content with Sidebar */}
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-80">
              <JobSidebar />
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {/* Categories Section */}
              <section className="mb-16">
                <h2 className="text-3xl font-black text-center mb-12 uppercase tracking-wider">
                  {t('browseByCategory')}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {categories.map((category, index) => (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 1, scale: 1 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <Card className="card-brutal cursor-pointer bg-brutal-accent">
                        <CardContent className="p-6 text-center">
                          <category.icon className="h-12 w-12 mx-auto mb-3 text-black" />
                          <h3 className="font-black mb-1 uppercase tracking-wide text-black">{category.name}</h3>
                          <p className="text-sm text-black font-black uppercase">{category.count} JOBS</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Filter Tabs */}
              <section className="mb-8">
                <div className="flex flex-wrap gap-4 mb-6">
                  <button className="px-6 py-3 bg-primary text-black border-brutal shadow-card font-black uppercase text-sm">{t('latestJobs')}</button>
                  <button className="px-6 py-3 bg-white border-brutal shadow-card hover:shadow-hover font-black uppercase text-sm text-black">{t('salaryRange')}</button>
                  <button className="px-6 py-3 bg-white border-brutal shadow-card hover:shadow-hover font-black uppercase text-sm text-black">{t('admitCard')}</button>
                  <button className="px-6 py-3 bg-white border-brutal shadow-card hover:shadow-hover font-black uppercase text-sm text-black">{t('results')}</button>
                  <button className="px-6 py-3 bg-white border-brutal shadow-card hover:shadow-hover font-black uppercase text-sm text-black">{t('syllabus')}</button>
                </div>
              </section>

              {/* Latest Jobs Section */}
              <section>
                <h2 className="text-3xl font-black mb-12 uppercase tracking-wider">
                  {t('latestJobOpportunities')}
                </h2>
                <div className="grid gap-6">
                  {latestJobs.map((job, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 1, y: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="card-brutal bg-white">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <Badge variant="outline" className="bg-brutal-secondary text-black border-brutal font-black uppercase">{job.type}</Badge>
                            <button className="text-black hover:text-primary">
                              <Star className="h-5 w-5" />
                            </button>
                          </div>
                          <h3 className="font-black text-lg mb-2 uppercase tracking-wide text-black">{job.title}</h3>
                          <p className="text-black mb-2 font-bold uppercase text-sm">{job.company}</p>
                          <div className="flex items-center text-sm text-black mb-3 font-bold uppercase">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="text-lg font-black text-primary mb-4 uppercase">
                            {job.salary}
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs bg-brutal-accent text-black border-brutal font-black uppercase">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Button className="w-full" variant="brutal">APPLY NOW</Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Button variant="outline" size="lg" className="bg-white text-black border-brutal shadow-card hover:shadow-hover font-black uppercase">
                    {t('viewAllJobs')}
                  </Button>
                </div>
              </section>
            </main>
          </div>
        </div>

        <JobFooter />
      </div>
    </>
  );
};

export default Index;
