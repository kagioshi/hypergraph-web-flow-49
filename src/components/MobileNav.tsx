import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Menu, 
  Home, 
  FileText, 
  Award, 
  Key, 
  BarChart3,
  BookOpen,
  Bookmark
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const navItems = [
    { icon: Home, label: t('allIndiaGovtJobs'), href: '/' },
    { icon: FileText, label: t('admitCard'), href: '/admit-card' },
    { icon: Award, label: t('results'), href: '/results' },
    { icon: Key, label: t('answerKey'), href: '/answer-key' },
    { icon: BarChart3, label: t('cutOff'), href: '/cut-off' },
    { icon: BookOpen, label: t('syllabus'), href: '/syllabus' },
    { icon: Bookmark, label: t('bookmark'), href: '/bookmarks' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t-brutal border-black">
      <div className="grid grid-cols-4 gap-2 p-3">
        {navItems.slice(0, 3).map((item, index) => (
          <div key={index} className={`bg-brutal-accent border-brutal shadow-card transform ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}>
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col gap-1 h-auto py-3 px-2 w-full bg-transparent border-none shadow-none"
            >
              <div className="bg-white border-brutal shadow-card p-1 mb-1">
                <item.icon className="h-4 w-4 text-black" />
              </div>
              <span className="text-xs font-black truncate uppercase text-black">{item.label}</span>
            </Button>
          </div>
        ))}
        
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <div className="bg-brutal-primary border-brutal shadow-card transform rotate-1">
              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col gap-1 h-auto py-3 px-2 w-full bg-transparent border-none shadow-none"
              >
                <div className="bg-white border-brutal shadow-card p-1 mb-1">
                  <Menu className="h-4 w-4 text-black" />
                </div>
                <span className="text-xs font-black uppercase text-black">MORE</span>
              </Button>
            </div>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-80 bg-white border-t-brutal border-black">
            <div className="bg-brutal-secondary border-brutal shadow-card p-4 mb-6 transform -rotate-1">
              <h3 className="text-lg font-black uppercase text-black text-center tracking-wider">QUICK MENU</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {navItems.map((item, index) => (
                <div key={index} className={`bg-brutal-accent border-brutal shadow-card transform ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 h-12 justify-start w-full bg-transparent border-none shadow-none"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="bg-white border-brutal shadow-card p-2">
                      <item.icon className="h-4 w-4 text-black" />
                    </div>
                    <span className="font-black uppercase text-black text-xs">{item.label}</span>
                  </Button>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};