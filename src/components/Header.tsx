import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { key: 'allIndiaGovtJob', href: '/all-india-govt' },
    { key: 'stateGovtJobs', href: '/state-govt' },
    { key: 'bankJobs', href: '/bank-jobs' },
    { key: 'pscJobs', href: '/psc-jobs' },
    { key: 'railwayJobs', href: '/railway-jobs' },
    { key: 'defenseJobs', href: '/defense-jobs' },
  ];

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-gradient">
              {t('jobsite')}
            </h1>
            <Badge variant="secondary" className="hidden sm:block">
              BETA
            </Badge>
          </motion.div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="hidden sm:flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              {i18n.language === 'en' ? 'हिं' : 'EN'}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:block border-t border-border">
          <div className="flex items-center justify-center py-3">
            <div className="flex items-center gap-1 flex-wrap justify-center">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm hover:bg-primary/10 hover:text-primary transition-all duration-200"
                  >
                    {t(item.key)}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-border bg-background"
            >
              <div className="py-4 space-y-2">
                {navigationItems.map((item) => (
                  <Button
                    key={item.key}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-sm"
                  >
                    {t(item.key)}
                  </Button>
                ))}
                <div className="pt-2 border-t border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleLanguage}
                    className="w-full justify-start gap-2"
                  >
                    <Globe className="h-4 w-4" />
                    {i18n.language === 'en' ? 'हिंदी' : 'English'}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};