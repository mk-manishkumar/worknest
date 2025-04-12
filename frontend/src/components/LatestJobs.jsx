import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-10 md:my-20 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center md:text-left">
        <span className="text-[#6A38C2]">Latest </span>Job Openings
      </h1>

      {allJobs.length <= 0 ? (
        <div className="my-8 text-center text-gray-500">No Job Available</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 my-5">
          {allJobs.slice(0, 6).map((job) => (
            <LatestJobCards key={job?._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestJobs;
