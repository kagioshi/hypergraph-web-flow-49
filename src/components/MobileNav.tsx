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
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-brutal">
      <div className="grid grid-cols-4 gap-1 p-2">
        {navItems.slice(0, 3).map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className="flex flex-col gap-1 h-auto py-2 px-1"
          >
            <item.icon className="h-4 w-4" />
            <span className="text-xs font-bold truncate">{item.label}</span>
          </Button>
        ))}
        
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col gap-1 h-auto py-2 px-1"
            >
              <Menu className="h-4 w-4" />
              <span className="text-xs font-bold">More</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-80">
            <div className="grid grid-cols-2 gap-4 pt-6">
              {navItems.map((item, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="flex items-center gap-3 h-12 justify-start"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-bold">{item.label}</span>
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};