import { useState, useEffect } from 'react';

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

export const useJobBookmarks = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Job[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('bookmarkedJobs');
    if (saved) {
      setBookmarkedJobs(JSON.parse(saved));
    }
  }, []);

  const addBookmark = (job: Job) => {
    const updated = [...bookmarkedJobs, job];
    setBookmarkedJobs(updated);
    localStorage.setItem('bookmarkedJobs', JSON.stringify(updated));
  };

  const removeBookmark = (jobId: string) => {
    const updated = bookmarkedJobs.filter(job => job.id !== jobId);
    setBookmarkedJobs(updated);
    localStorage.setItem('bookmarkedJobs', JSON.stringify(updated));
  };

  const isBookmarked = (jobId: string) => {
    return bookmarkedJobs.some(job => job.id === jobId);
  };

  return {
    bookmarkedJobs,
    addBookmark,
    removeBookmark,
    isBookmarked
  };
};