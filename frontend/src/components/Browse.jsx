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

  useEffect(() => {
    if (searchedQuery) {
      const filtered = allJobs.filter((job) => job.title.toLowerCase().includes(searchedQuery.toLowerCase()) || job.description.toLowerCase().includes(searchedQuery.toLowerCase()) || job.location.toLowerCase().includes(searchedQuery.toLowerCase()) || job.jobType?.toLowerCase().includes(searchedQuery.toLowerCase()));
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  const jobsToDisplay = searchedQuery ? filteredJobs : allJobs;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-5 sm:my-8 md:my-10 w-full">
        <h1 className="font-bold text-lg sm:text-xl my-5 sm:my-8 md:my-10">
          {searchedQuery ? `Results for "${searchedQuery}"` : "All Jobs"} ({jobsToDisplay.length})
        </h1>

        {jobsToDisplay.length === 0 ? (
          <div className="text-center py-10 text-gray-500">No jobs found. Please try a different search.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobsToDisplay.map((job, index) => (
              <div key={job._id || index}>
                <JobList job={job} />
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Browse;
