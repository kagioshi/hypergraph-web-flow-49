import { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Users, ArrowRight } from 'lucide-react';

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

interface RelatedJobsProps {
  currentJob: Job;
  allJobs: Job[];
  onJobSelect: (job: Job) => void;
  maxSuggestions?: number;
}

export const RelatedJobs = ({ 
  currentJob, 
  allJobs, 
  onJobSelect, 
  maxSuggestions = 4 
}: RelatedJobsProps) => {
  const relatedJobs = useMemo(() => {
    const calculateSimilarity = (job: Job) => {
      let score = 0;
      
      // Same department gets highest priority
      if (job.department === currentJob.department) score += 5;
      
      // Same job type
      if (job.type === currentJob.type) score += 3;
      
      // Same location
      if (job.location === currentJob.location) score += 2;
      
      // Similar title keywords
      const currentWords = currentJob.title.toLowerCase().split(' ');
      const jobWords = job.title.toLowerCase().split(' ');
      const commonWords = currentWords.filter(word => 
        jobWords.includes(word) && word.length > 3
      );
      score += commonWords.length;
      
      return score;
    };

    return allJobs
      .filter(job => job.id !== currentJob.id)
      .map(job => ({ job, score: calculateSimilarity(job) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxSuggestions)
      .map(({ job }) => job);
  }, [currentJob, allJobs, maxSuggestions]);

  if (relatedJobs.length === 0) return null;

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg">Related Jobs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {relatedJobs.map((job) => (
            <div 
              key={job.id}
              className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => onJobSelect(job)}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm line-clamp-2 mb-1">
                    {job.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {job.company}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {job.department}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {job.type}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Deadline: {job.applicationDeadline}</span>
                    </div>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm" className="shrink-0">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};