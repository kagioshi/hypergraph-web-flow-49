import { useState, useEffect, useMemo } from 'react';
import { JobCard } from '@/components/JobCard';
import { JobListSkeleton } from '@/components/LoadingSkeletons';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useAnalytics } from '@/hooks/useAnalytics';

interface Job {
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
}

interface Filters {
  searchTerm: string;
  department: string;
  location: string;
  jobType: string;
}

interface InfiniteJobListProps {
  allJobs: Job[];
  filters: Filters;
  itemsPerPage?: number;
}

export const InfiniteJobList = ({ 
  allJobs, 
  filters, 
  itemsPerPage = 6 
}: InfiniteJobListProps) => {
  const [displayedJobs, setDisplayedJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { trackSearch } = useAnalytics();

  // Filter jobs based on current filters
  const filteredJobs = useMemo(() => {
    let jobs = allJobs;

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      jobs = jobs.filter(job => 
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters.department) {
      jobs = jobs.filter(job => job.department === filters.department);
    }

    if (filters.location) {
      jobs = jobs.filter(job => 
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.jobType) {
      jobs = jobs.filter(job => job.type === filters.jobType);
    }

    return jobs;
  }, [allJobs, filters]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const hasNextPage = currentPage < totalPages;

  const fetchNextPage = () => {
    if (hasNextPage && !isLoading) {
      setIsLoading(true);
      
      // Simulate loading delay for better UX
      setTimeout(() => {
        const nextPageStart = currentPage * itemsPerPage;
        const nextPageEnd = nextPageStart + itemsPerPage;
        const nextPageJobs = filteredJobs.slice(nextPageStart, nextPageEnd);
        
        setDisplayedJobs(prev => [...prev, ...nextPageJobs]);
        setCurrentPage(prev => prev + 1);
        setIsLoading(false);
      }, 500);
    }
  };

  const { isFetching } = useInfiniteScroll({
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage: isLoading,
    threshold: 200
  });

  // Reset when filters change
  useEffect(() => {
    const initialJobs = filteredJobs.slice(0, itemsPerPage);
    setDisplayedJobs(initialJobs);
    setCurrentPage(1);

    // Track search analytics
    trackSearch({
      search_term: filters.searchTerm,
      department: filters.department,
      location: filters.location,
      job_type: filters.jobType,
      results_count: filteredJobs.length
    });
  }, [filteredJobs, itemsPerPage, trackSearch, filters]);

  return (
    <div className="space-y-6">
      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {displayedJobs.length} of {filteredJobs.length} jobs
      </div>

      {/* Job cards */}
      <div className="space-y-6">
        {displayedJobs.map((job, index) => (
          <JobCard key={job.id} job={job} index={index} />
        ))}
      </div>

      {/* Loading state */}
      {(isLoading || isFetching) && (
        <JobListSkeleton count={3} />
      )}

      {/* No more jobs message */}
      {!hasNextPage && displayedJobs.length > 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            You've reached the end! No more jobs to show.
          </p>
        </div>
      )}

      {/* No jobs found */}
      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No jobs found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters to see more results.
          </p>
        </div>
      )}
    </div>
  );
};