import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

interface JobAlert {
  id: string;
  keywords: string[];
  location: string;
  department: string;
  type: string;
  email?: string;
  createdAt: string;
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  department: string;
  applicationDeadline: string;
  ageLimit: string;
  fee: string;
  salary: string;
}

export const useJobAlerts = () => {
  const [alerts, setAlerts] = useState<JobAlert[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('jobAlerts');
    if (saved) {
      setAlerts(JSON.parse(saved));
    }
  }, []);

  const addAlert = (alert: Omit<JobAlert, 'id' | 'createdAt'>) => {
    const newAlert: JobAlert = {
      ...alert,
      id: `alert_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    const updated = [...alerts, newAlert];
    setAlerts(updated);
    localStorage.setItem('jobAlerts', JSON.stringify(updated));
    
    toast({
      title: "Job Alert Created",
      description: "You'll be notified when matching jobs are posted."
    });
  };

  const removeAlert = (alertId: string) => {
    const updated = alerts.filter(alert => alert.id !== alertId);
    setAlerts(updated);
    localStorage.setItem('jobAlerts', JSON.stringify(updated));
  };

  const checkJobAgainstAlerts = (job: Job) => {
    const matchingAlerts = alerts.filter(alert => {
      const titleMatch = alert.keywords.some(keyword => 
        job.title.toLowerCase().includes(keyword.toLowerCase())
      );
      const locationMatch = !alert.location || 
        job.location.toLowerCase().includes(alert.location.toLowerCase());
      const departmentMatch = !alert.department || alert.department === job.department;
      const typeMatch = !alert.type || alert.type === job.type;

      return titleMatch && locationMatch && departmentMatch && typeMatch;
    });

    if (matchingAlerts.length > 0) {
      toast({
        title: "New Job Alert!",
        description: `${job.title} at ${job.company} matches your alerts.`,
        duration: 5000
      });
    }

    return matchingAlerts;
  };

  return {
    alerts,
    addAlert,
    removeAlert,
    checkJobAgainstAlerts
  };
};