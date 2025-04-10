import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterJob from "./FilterJob";
import JobList from "./JobList";
import Footer from "./shared/Footer";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) || job.description.toLowerCase().includes(searchedQuery.toLowerCase()) || job.location.toLowerCase().includes(searchedQuery.toLowerCase()) || job.jobType?.toLowerCase().includes(searchedQuery.toLowerCase());
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-5 mb-10">
        <div className="flex gap-5">
          <div className="w-[20%]">
            <FilterJob />
          </div>

          {filterJobs.length <= 0 ? (
            <span className="mx-auto">No Jobs available</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.3 }} key={job?._id}>
                    <JobList job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Jobs;
