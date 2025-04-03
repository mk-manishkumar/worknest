import React from "react";
import Navbar from "./shared/Navbar";
import FilterJob from "./FilterJob";
import JobList from "./JobList";
import Footer from "./shared/Footer";
import { useSelector } from "react-redux";

const Jobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-5 mb-10">
        <div className="flex gap-5">
          <div className="w-[20%]">
            <FilterJob />
          </div>

          {allJobs.length <= 0 ? (
            <span className="mx-auto">No Jobs available</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {allJobs.map((job) => (
                  <div key={job?._id}>
                    <JobList job={job} />
                  </div>
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
