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
    { name: 'Andhra Pradesh', count: '12' },
    { name: 'Arunachal Pradesh', count: '8' },
    { name: 'Assam', count: '24' },
    { name: 'Bihar', count: '31' },
    { name: 'Chhattisgarh', count: '15' },
    { name: 'Delhi', count: '45' },
    { name: 'Goa', count: '6' },
    { name: 'Gujarat', count: '38' },
    { name: 'Haryana', count: '28' },
    { name: 'Himachal Pradesh', count: '11' },
    { name: 'Jharkhand', count: '19' },
    { name: 'Karnataka', count: '42' },
    { name: 'Kerala', count: '33' },
    { name: 'Madhya Pradesh', count: '26' },
    { name: 'Maharashtra', count: '67' },
    { name: 'Manipur', count: '5' },
    { name: 'Meghalaya', count: '4' },
    { name: 'Mizoram', count: '3' },
    { name: 'Nagaland', count: '7' },
    { name: 'Odisha', count: '22' },
    { name: 'Punjab', count: '18' },
    { name: 'Rajasthan', count: '35' },
    { name: 'Sikkim', count: '2' },
    { name: 'Tamil Nadu', count: '48' },
    { name: 'Telangana', count: '29' },
    { name: 'Tripura', count: '6' },
    { name: 'Uttar Pradesh', count: '89' },
    { name: 'Uttarakhand', count: '14' },
    { name: 'West Bengal', count: '41' }
  ];

  const departments = [
    { name: 'SSC (Staff Selection Commission)', count: '425' },
    { name: 'UPSC (Union Public Service Commission)', count: '180' },
    { name: 'Railway Recruitment Board', count: '890' },
    { name: 'Banking (IBPS/SBI/RBI)', count: '650' },
    { name: 'Defense (Army/Navy/Air Force)', count: '320' },
    { name: 'State PSC (Public Service Commission)', count: '1200' },
    { name: 'Police & Security Forces', count: '480' },
    { name: 'Teaching (TGT/PGT/Assistant Professor)', count: '750' },
    { name: 'Medical & Healthcare', count: '290' },
    { name: 'Postal Services', count: '150' }
  ];

  return (
    <div className="w-full lg:w-80 space-y-6">
      {/* States Filter - Brutal Box Design */}
      <div className="bg-white border-brutal shadow-card transform rotate-1">
        <div 
          className="cursor-pointer bg-brutal-primary border-b-brutal border-black p-4"
          onClick={() => setIsStatesExpanded(!isStatesExpanded)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-white border-brutal shadow-card p-2">
                <MapPin className="h-5 w-5 text-black" />
              </div>
              <span className="font-black uppercase text-black tracking-wide">FILTER BY STATE</span>
            </div>
            <div className="bg-white border-brutal shadow-card p-1">
              {isStatesExpanded ? (
                <ChevronUp className="h-4 w-4 text-black" />
              ) : (
                <ChevronDown className="h-4 w-4 text-black" />
              )}
            </div>
          </div>
        </div>
        {isStatesExpanded && (
          <div className="p-4 bg-white">
            <div className="space-y-3">
              <div className="bg-brutal-secondary border-brutal shadow-card p-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="all-states" />
                  <label 
                    htmlFor="all-states" 
                    className="text-sm font-black uppercase text-black"
                  >
                    ALL STATES
                  </label>
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto space-y-2">
                {states.map((state, index) => (
                  <div
                    key={state.name}
                    className={`bg-brutal-accent border-brutal shadow-card p-2 transform ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:shadow-hover transition-none cursor-pointer`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id={`state-${state.name}`} />
                        <label 
                          htmlFor={`state-${state.name}`} 
                          className="text-sm font-black uppercase text-black cursor-pointer"
                        >
                          {state.name}
                        </label>
                      </div>
                      <div className="bg-white border-brutal shadow-card px-2 py-1">
                        <span className="text-xs font-black text-black">
                          {state.count}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Departments Filter - Brutal Box Design */}
      <div className="bg-white border-brutal shadow-card transform -rotate-1">
        <div 
          className="cursor-pointer bg-brutal-secondary border-b-brutal border-black p-4"
          onClick={() => setIsDepartmentsExpanded(!isDepartmentsExpanded)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-white border-brutal shadow-card p-2">
                <Building2 className="h-5 w-5 text-black" />
              </div>
              <span className="font-black uppercase text-black tracking-wide">FILTER BY DEPARTMENT</span>
            </div>
            <div className="bg-white border-brutal shadow-card p-1">
              {isDepartmentsExpanded ? (
                <ChevronUp className="h-4 w-4 text-black" />
              ) : (
                <ChevronDown className="h-4 w-4 text-black" />
              )}
            </div>
          </div>
        </div>
        {isDepartmentsExpanded && (
          <div className="p-4 bg-white">
            <div className="space-y-3">
              <div className="bg-brutal-primary border-brutal shadow-card p-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="all-departments" />
                  <label 
                    htmlFor="all-departments" 
                    className="text-sm font-black uppercase text-black"
                  >
                    ALL DEPARTMENTS
                  </label>
                </div>
              </div>
              <div className="max-h-60 overflow-y-auto space-y-2">
                {departments.map((dept, index) => (
                  <div
                    key={dept.name}
                    className={`bg-brutal-accent border-brutal shadow-card p-2 transform ${index % 2 === 0 ? '-rotate-1' : 'rotate-1'} hover:shadow-hover transition-none cursor-pointer`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id={`dept-${dept.name}`} />
                        <label 
                          htmlFor={`dept-${dept.name}`} 
                          className="text-xs font-black uppercase text-black cursor-pointer"
                        >
                          {dept.name}
                        </label>
                      </div>
                      <div className="bg-white border-brutal shadow-card px-2 py-1">
                        <span className="text-xs font-black text-black">
                          {dept.count}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Apply Filters Button - Brutal Style */}
      <div className="bg-brutal-primary border-brutal shadow-hover transform rotate-1 hover:shadow-card transition-none">
        <Button className="w-full bg-transparent border-none shadow-none font-black uppercase text-black py-4">
          APPLY FILTERS
        </Button>
      </div>
    </div>
  );
};