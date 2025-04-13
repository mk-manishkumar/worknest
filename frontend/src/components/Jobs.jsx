import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterJob from "./FilterJob";
import JobList from "./JobList";
import Footer from "./shared/Footer";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [showFilter, setShowFilter] = useState(false);

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

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow max-w-7xl mx-auto mt-3 md:mt-5 mb-6 md:mb-10 px-4 sm:px-6 lg:px-8">
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">Jobs ({filterJobs.length})</h2>
          <button onClick={toggleFilter} className="flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-2 rounded-md">
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          {/* Filter sidebar - hidden on mobile unless toggled */}
          <div className={`${showFilter ? "block" : "hidden"} lg:block lg:w-1/5 mb-4 lg:mb-0 sticky top-4`}>
            <FilterJob setShowFilter={setShowFilter} />
          </div>

          {filterJobs.length <= 0 ? (
            <div className="flex-1 flex items-center justify-center p-8 bg-white rounded-md shadow text-gray-500">No Jobs available</div>
          ) : (
            <div className="flex-1 max-h-[85vh] lg:h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} key={job?._id}>
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
