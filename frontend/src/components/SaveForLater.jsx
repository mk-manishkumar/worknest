import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import JobList from "./JobList";

const SaveForLater = () => {
  const savedJobs = useSelector((state) => state.job.savedJobs || []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Saved Jobs</h1>
        {savedJobs.length > 0 ? (
          <div className="grid gap-4">
            {savedJobs.map((job) => (
              <JobList key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No jobs saved yet.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SaveForLater;
