import { useSEO, SEOHelmet } from "@/hooks/useSEO";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Briefcase, Users, TrendingUp, Star } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const seoData = useSEO({
    title: "Job Board - Find Your Dream Job | 10K+ Active Jobs",
    description: "Discover your next career opportunity with our modern job board. Browse 10K+ active jobs across multiple industries and locations.",
    keywords: "jobs, careers, employment, hiring, job search, remote jobs, full-time jobs",
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
    { name: "Technology", count: "2.5K", icon: "💻" },
    { name: "Marketing", count: "1.2K", icon: "📈" },
    { name: "Design", count: "800", icon: "🎨" },
    { name: "Sales", count: "1.5K", icon: "📊" },
    { name: "Finance", count: "900", icon: "💰" },
    { name: "Healthcare", count: "1.1K", icon: "🏥" }
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
        {/* Hero Section */}
        <section className="hero-section relative overflow-hidden">
          <div className="container mx-auto px-4 py-20">
            <motion.div 
              className="hero-content max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6">
                Find Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                  Dream Job
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
                Discover amazing opportunities with top companies. 
                10K+ active jobs waiting for you.
              </p>
              
              {/* Search Bar */}
              <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input 
                    placeholder="Job title, keywords, or company"
                    className="pl-10 h-12"
                  />
                </div>
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input 
                    placeholder="City, state, or remote"
                    className="pl-10 h-12"
                  />
                </div>
                <Button size="lg" className="h-12 px-8">
                  Search Jobs
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Browse by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-3">{category.icon}</div>
                      <h3 className="font-semibold mb-1">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.count} jobs</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Jobs Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Latest Job Opportunities
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {latestJobs.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <Badge variant="outline">{job.type}</Badge>
                        <button className="text-muted-foreground hover:text-primary">
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
                      <div className="flex flex-wrap gap-2">
                        {job.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                View All Jobs
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Index;
