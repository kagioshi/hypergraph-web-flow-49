import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, ChevronUp, MapPin, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const JobSidebar = () => {
  const { t } = useTranslation();
  const [isStatesExpanded, setIsStatesExpanded] = useState(true);
  const [isDepartmentsExpanded, setIsDepartmentsExpanded] = useState(true);

  const states = [
    'Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Gujarat', 
    'West Bengal', 'Rajasthan', 'Uttar Pradesh', 'Telangana', 'Punjab'
  ];

  const departments = [
    'Information Technology', 'Banking & Finance', 'Healthcare', 
    'Education', 'Public Works', 'Transportation', 'Agriculture', 
    'Defense', 'Police', 'Revenue'
  ];

  return (
    <div className="w-full lg:w-80 space-y-6">
      {/* States Filter */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="card-shadow hover:shadow-hover transition-all duration-300">
          <CardHeader 
            className="cursor-pointer"
            onClick={() => setIsStatesExpanded(!isStatesExpanded)}
          >
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                {t('filterByState')}
              </div>
              {isStatesExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </CardTitle>
          </CardHeader>
          <AnimatePresence>
            {isStatesExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="all-states" />
                      <label 
                        htmlFor="all-states" 
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {t('allStates')}
                      </label>
                    </div>
                    <Separator />
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {states.map((state, index) => (
                        <motion.div
                          key={state}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={`state-${state}`} />
                          <label 
                            htmlFor={`state-${state}`} 
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer hover:text-primary transition-colors"
                          >
                            {state}
                          </label>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>

      {/* Departments Filter */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="card-shadow hover:shadow-hover transition-all duration-300">
          <CardHeader 
            className="cursor-pointer"
            onClick={() => setIsDepartmentsExpanded(!isDepartmentsExpanded)}
          >
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                {t('filterByDepartment')}
              </div>
              {isDepartmentsExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </CardTitle>
          </CardHeader>
          <AnimatePresence>
            {isDepartmentsExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="all-departments" />
                      <label 
                        htmlFor="all-departments" 
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {t('allDepartments')}
                      </label>
                    </div>
                    <Separator />
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {departments.map((dept, index) => (
                        <motion.div
                          key={dept}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={`dept-${dept}`} />
                          <label 
                            htmlFor={`dept-${dept}`} 
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer hover:text-primary transition-colors"
                          >
                            {dept}
                          </label>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>

      {/* Apply Filters Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button className="w-full animate-pulse-glow">
          Apply Filters
        </Button>
      </motion.div>
    </div>
  );
};