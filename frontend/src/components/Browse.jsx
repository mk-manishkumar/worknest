import React from "react";
import Navbar from "./shared/Navbar";
import JobList from "./JobList";
import Footer from "./shared/Footer";

const randomJobs = [1, 2, 3];

const Browse = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow max-w-7xl mx-auto my-10 w-full">
        <h1 className="font-bold text-xl my-10">Search Results ({randomJobs.length})</h1>
        <div className="grid grid-cols-3 gap-4">
          {randomJobs.map((item, index) => (
            <div key={index}>
              <JobList />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Browse;
