import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import JobList from "./JobList";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import Footer from "./shared/Footer";

const Browse = () => {
  useGetAllJobs();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const [filteredJobs, setFilteredJobs] = useState([]);

  // Filter jobs based on search query from HeroSection
  useEffect(() => {
    if (searchedQuery) {
      const filtered = allJobs.filter((job) => job.title.toLowerCase().includes(searchedQuery.toLowerCase()) || job.description.toLowerCase().includes(searchedQuery.toLowerCase()) || job.location.toLowerCase().includes(searchedQuery.toLowerCase()) || job.jobType?.toLowerCase().includes(searchedQuery.toLowerCase()));
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  // Clear search query when leaving the page
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  // Use filteredJobs if there's a search query, otherwise use all jobs
  const jobsToDisplay = searchedQuery ? filteredJobs : allJobs;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow max-w-7xl mx-auto my-10 w-full">
        <h1 className="font-bold text-xl my-10">
          {searchedQuery ? `Results for "${searchedQuery}"` : "All Jobs"} ({jobsToDisplay.length})
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {jobsToDisplay.map((job, index) => (
            <div key={job._id || index}>
              <JobList job={job} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Browse;
