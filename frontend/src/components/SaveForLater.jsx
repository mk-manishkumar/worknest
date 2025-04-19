import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import JobList from "./JobList";
import useGetSavedJobs from "./../hooks/useGetSavedJobs";
import { removeSavedJob } from "../redux/jobSlice";

const SaveForLater = () => {
  useGetSavedJobs();
  const dispatch = useDispatch();
  const savedJobs = useSelector((state) => state.job.savedJobs || []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 sm:px-6 py-4 sm:py-6 w-full sm:w-[90%] md:w-[85%] lg:w-[75%]">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 mt-2 sm:my-5">Saved Jobs</h1>
        {savedJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {savedJobs.map((job) => (
              <JobList key={job._id} job={job} isSavedPage onUnsave={() => dispatch(removeSavedJob(job._id))} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-600">No jobs saved yet.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SaveForLater;
