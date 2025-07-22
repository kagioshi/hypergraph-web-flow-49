
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X, Globe } from 'lucide-react';

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
    <header className="bg-background border-b-brutal border-black sticky top-0 z-50 bg-white">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16 border-b-brutal border-black">
          <div className="flex items-center gap-4">
            <div className="bg-brutal-primary border-brutal shadow-card px-4 py-2">
              <h1 className="text-xl font-black text-black uppercase tracking-wider">
                {t('jobsite')}
              </h1>
            </div>
            <Badge variant="secondary" className="hidden sm:block bg-brutal-accent text-black border-brutal font-black uppercase">
              BETA
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="brutal"
              size="sm"
              onClick={toggleLanguage}
              className="hidden sm:flex items-center gap-2 bg-brutal-secondary text-black"
            >
              <Globe className="h-4 w-4" />
              <span className="font-black uppercase">{i18n.language === 'en' ? 'हिं' : 'EN'}</span>
            </Button>

            <Button
              variant="brutal"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden bg-brutal-accent text-black"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Navigation - Brutal Style */}
        <nav className="hidden md:block">
          <div className="flex items-center py-2 overflow-x-auto">
            <div className="flex items-center gap-1 min-w-max">
              {navigationItems.map((item, index) => (
                <div
                  key={item.key}
                  className={`
                    bg-white border-brutal shadow-card hover:shadow-hover transition-none
                    ${index % 2 === 0 ? 'transform -rotate-1' : 'transform rotate-1'}
                  `}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs font-black uppercase tracking-wide text-black border-none shadow-none hover:bg-brutal-accent px-3 py-2"
                  >
                    {t(item.key)}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* Mobile Menu - Brutal Style */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t-brutal border-black bg-white">
            <div className="py-4 space-y-2">
              {navigationItems.map((item) => (
                <div key={item.key} className="bg-brutal-accent border-brutal shadow-card mx-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-sm font-black uppercase text-black border-none shadow-none"
                  >
                    {t(item.key)}
                  </Button>
                </div>
              ))}
              <div className="pt-2 mx-2">
                <div className="bg-brutal-secondary border-brutal shadow-card">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleLanguage}
                    className="w-full justify-start gap-2 font-black uppercase text-black border-none shadow-none"
                  >
                    <Globe className="h-4 w-4" />
                    {i18n.language === 'en' ? 'हिंदी' : 'ENGLISH'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
