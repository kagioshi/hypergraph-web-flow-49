import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export const JobFooter = () => {
  const { t } = useTranslation();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const footerSections = [
    {
      title: 'State Job Notifications',
      links: [
        'Uttar Pradesh Jobs', 'Maharashtra Jobs', 'Bihar Jobs', 'West Bengal Jobs',
        'Tamil Nadu Jobs', 'Karnataka Jobs', 'Gujarat Jobs', 'Rajasthan Jobs',
        'Madhya Pradesh Jobs', 'Telangana Jobs'
      ],
      showViewAll: true
    },
    {
      title: 'Answer Keys',
      links: [
        'SSC Answer Key', 'UPSC Answer Key', 'Banking Answer Key', 'Railway Answer Key',
        'Police Answer Key', 'Teacher Answer Key', 'Defence Answer Key', 'Medical Answer Key',
        'Engineering Answer Key', 'Legal Answer Key'
      ],
      showViewAll: true
    },
    {
      title: 'Syllabus',
      links: [
        'SSC Syllabus', 'UPSC Syllabus', 'Banking Syllabus', 'Railway Syllabus',
        'Police Syllabus', 'Teacher Syllabus', 'Defence Syllabus', 'Medical Syllabus',
        'Engineering Syllabus', 'Legal Syllabus'
      ],
      showViewAll: true
    },
    {
      title: 'Cutoff Marks',
      links: [
        'SSC Cutoff', 'UPSC Cutoff', 'Banking Cutoff', 'Railway Cutoff',
        'Police Cutoff', 'Teacher Cutoff', 'Defence Cutoff', 'Medical Cutoff',
        'Engineering Cutoff', 'Legal Cutoff'
      ],
      showViewAll: true
    },
    {
      title: 'Education',
      links: [
        'Online Courses', 'Mock Tests', 'Study Materials', 'Video Lectures',
        'Practice Papers', 'Current Affairs', 'GK Updates', 'Exam Tips',
        'Career Guidance', 'Skill Development'
      ],
      showViewAll: true
    }
  ];

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Footer Sections */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div 
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
              className="space-y-4"
            >
              <h4 className="font-semibold text-lg text-foreground border-b border-primary/20 pb-2">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.slice(0, 8).map((link, linkIndex) => (
                  <motion.li 
                    key={link}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: (sectionIndex * 0.1) + (linkIndex * 0.05) }}
                  >
                    <Button
                      variant="link"
                      className="h-auto p-0 text-sm text-muted-foreground hover:text-primary transition-colors justify-start"
                    >
                      {link}
                    </Button>
                  </motion.li>
                ))}
              </ul>
              {section.showViewAll && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: (sectionIndex * 0.1) + 0.4 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs border-primary/30 hover:border-primary hover:bg-primary/5"
                  >
                    View all
                  </Button>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Startup Credits Section */}
        <motion.div 
          className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              {t('startupCredits')}
            </p>
            <p className="text-xs text-muted-foreground/80">
              Made with ❤️ for job seekers across India
            </p>
          </div>
        </motion.div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.p 
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {t('copyright')}
          </motion.p>

          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <span className="text-sm text-muted-foreground">{t('followUs')}:</span>
            <div className="flex items-center gap-2">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 1.2 + (index * 0.1) }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                  >
                    <social.icon className="h-4 w-4" />
                    <span className="sr-only">{social.label}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};