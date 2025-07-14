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
    { label: "Active Jobs", value: "10K+", icon: Briefcase },
    { label: "Companies", value: "500+", icon: Users },
    { label: "Success Rate", value: "95%", icon: TrendingUp },
    { label: "Average Rating", value: "4.8", icon: Star }
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
        
        {/* Hero Section */}
        <section className="hero-gradient relative overflow-hidden py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="hero-content max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                {t('findYourDreamJob')}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
                {t('heroSubtitle')}
              </p>
              
              {/* Search Bar */}
              <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input 
                    placeholder={t('searchPlaceholder')}
                    className="pl-10 h-12 bg-white/95 backdrop-blur-sm"
                  />
                </div>
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input 
                    placeholder={t('locationPlaceholder')}
                    className="pl-10 h-12 bg-white/95 backdrop-blur-sm"
                  />
                </div>
                <Button size="lg" className="h-12 px-8 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  {t('searchJobs')}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="card-shadow card-hover p-6">
                    <CardContent className="p-0">
                      <stat.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                      <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                      <div className="text-muted-foreground">{t(stat.labelKey)}</div>
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
                <h2 className="text-3xl font-bold text-center mb-12">
                  {t('browseByCategory')}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {categories.map((category, index) => (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="card-shadow card-hover cursor-pointer">
                        <CardContent className="p-6 text-center">
                          <category.icon className={`h-12 w-12 mx-auto mb-3 ${category.color}`} />
                          <h3 className="font-semibold mb-1">{category.name}</h3>
                          <p className="text-sm text-muted-foreground">{category.count} jobs</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Latest Jobs Section */}
              <section>
                <h2 className="text-3xl font-bold mb-12">
                  {t('latestJobOpportunities')}
                </h2>
                <div className="grid gap-6">
                  {latestJobs.map((job, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="card-shadow card-hover">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <Badge variant="outline">{t(job.type)}</Badge>
                            <button className="text-muted-foreground hover:text-primary transition-colors">
                              <Star className="h-5 w-5" />
                            </button>
                          </div>
                          <h3 className="font-semibold text-lg mb-2">{job.title}</h3>
                          <p className="text-muted-foreground mb-2">{job.company}</p>
                          <div className="flex items-center text-sm text-muted-foreground mb-3">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="text-lg font-semibold text-primary mb-4">
                            {job.salary}
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Button className="w-full">{t('apply')}</Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Button variant="outline" size="lg">
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
