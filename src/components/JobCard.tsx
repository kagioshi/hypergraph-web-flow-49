import { useState } from 'react';
import { useJobBookmarks } from '@/hooks/useJobBookmarks';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bookmark, MapPin, Calendar, Users, IndianRupee, Clock, ExternalLink, Share2 } from 'lucide-react';
import { JobShare } from '@/components/JobShare';
import { useToast } from '@/hooks/use-toast';

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    type: string;
    tags: string[];
    description: string;
    datePosted: string;
    employmentType: string;
    applicationDeadline: string;
    ageLimit: string;
    fee: string;
    department: string;
  };
  index: number;
}

export const JobCard = ({ job, index }: JobCardProps) => {
  const { addBookmark, removeBookmark, isBookmarked } = useJobBookmarks();
  const { trackJobView, trackJobBookmark } = useAnalytics();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleBookmark = () => {
    const action = isBookmarked(job.id) ? 'remove' : 'add';
    
    if (isBookmarked(job.id)) {
      removeBookmark(job.id);
      toast({
        title: "Bookmark Removed",
        description: "Job removed from bookmarks",
      });
    } else {
      addBookmark(job);
      toast({
        title: "Job Bookmarked",
        description: "Job added to your bookmarks",
      });
    }
    
    trackJobBookmark(job.id, action);
  };

  const handleViewDetails = () => {
    setShowDetails(!showDetails);
    if (!showDetails) {
      trackJobView({
        job_id: job.id,
        job_title: job.title,
        job_company: job.company,
        job_department: job.department,
        job_location: job.location,
      });
    }
  };

  return (
    <Card 
      className={`card-brutal bg-white transform ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:shadow-hover transition-none cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-4">
          <div className="bg-brutal-secondary border-brutal shadow-card p-2 transform rotate-1">
            <Badge variant="outline" className="bg-white text-black border-brutal font-black uppercase text-xs">
              {job.type}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            className={`p-2 ${
              isBookmarked(job.id) 
                ? 'bg-brutal-primary border-brutal shadow-card' 
                : 'bg-brutal-accent border-brutal shadow-card hover:bg-brutal-primary'
            } transition-none`}
          >
            <Bookmark 
              className={`h-5 w-5 ${
                isBookmarked(job.id) ? 'fill-white text-white' : 'text-black'
              }`} 
            />
          </Button>
        </div>

        {/* Title Section */}
        <div className="bg-brutal-primary border-brutal shadow-card p-4 mb-4 transform -rotate-1">
          <h3 className="font-black text-lg uppercase tracking-wide text-white leading-tight">
            {job.title}
          </h3>
        </div>

        {/* Company and Location */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-white border-brutal shadow-card p-1">
              <Users className="h-4 w-4 text-black" />
            </div>
            <span className="text-black font-black uppercase text-sm">{job.company}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-white border-brutal shadow-card p-1">
              <MapPin className="h-4 w-4 text-black" />
            </div>
            <span className="text-black font-black uppercase text-sm">{job.location}</span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-brutal-accent border-brutal shadow-card p-3 transform rotate-1">
            <div className="flex items-center gap-1 mb-1">
              <IndianRupee className="h-3 w-3 text-black" />
              <span className="text-xs font-black text-black uppercase">Salary</span>
            </div>
            <div className="text-sm font-black text-black">
              {job.salary}
            </div>
          </div>
          <div className="bg-brutal-secondary border-brutal shadow-card p-3 transform -rotate-1">
            <div className="flex items-center gap-1 mb-1">
              <Calendar className="h-3 w-3 text-white" />
              <span className="text-xs font-black text-white uppercase">Deadline</span>
            </div>
            <div className="text-sm font-black text-white">
              {job.applicationDeadline}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white border-brutal shadow-card p-3">
            <div className="flex items-center gap-1 mb-1">
              <Clock className="h-3 w-3 text-black" />
              <span className="text-xs font-black text-black uppercase">Age Limit</span>
            </div>
            <div className="text-sm font-black text-black">
              {job.ageLimit}
            </div>
          </div>
          <div className="bg-brutal-primary border-brutal shadow-card p-3">
            <div className="flex items-center gap-1 mb-1">
              <IndianRupee className="h-3 w-3 text-white" />
              <span className="text-xs font-black text-white uppercase">Fee</span>
            </div>
            <div className="text-sm font-black text-white">
              {job.fee}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {job.tags.map((tag, tagIndex) => (
            <div key={tag} className={`bg-brutal-accent border-brutal shadow-card transform ${tagIndex % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}>
              <Badge variant="secondary" className="text-xs bg-transparent border-none shadow-none font-black uppercase text-black px-2 py-1">
                {tag}
              </Badge>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-brutal-primary border-brutal shadow-card hover:shadow-hover transition-none transform rotate-1">
            <Button 
              className="w-full bg-transparent border-none shadow-none font-black uppercase text-white py-3 text-xs"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              APPLY
            </Button>
          </div>
          <div className="bg-white border-brutal shadow-card hover:shadow-hover transition-none transform -rotate-1">
            <Button 
              variant="outline"
              onClick={handleViewDetails}
              className="w-full bg-transparent border-none shadow-none font-black uppercase text-black py-3 text-xs"
            >
              {showDetails ? 'HIDE' : 'DETAILS'}
            </Button>
          </div>
          <div className="bg-brutal-accent border-brutal shadow-card hover:shadow-hover transition-none">
            <JobShare job={job} className="w-full bg-transparent border-none shadow-none font-black text-black py-3" />
          </div>
        </div>

        {/* Details Section */}
        {showDetails && (
          <div className="mt-4 bg-white border-brutal shadow-card p-4 transform rotate-1">
            <p className="text-sm font-black text-black uppercase mb-2">Description:</p>
            <p className="text-sm text-black">{job.description}</p>
            <p className="text-xs font-black text-black uppercase mt-2">Department: {job.department}</p>
            <p className="text-xs font-black text-black uppercase">Posted: {job.datePosted}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};