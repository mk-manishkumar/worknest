import React from "react";
import Navbar from "./shared/Navbar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Footer from "./shared/Footer";

const JobDescription = () => {
  const isApplied = false;

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto my-10 flex justify-between">
        <div>
          <h1 className="font-bold text-xl ">Frontend Developer</h1>
          <div className="flex gap-2 mt-4 items-center">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              12 positions
            </Badge>
            <Badge className="text-red-700 font-bold" variant="ghost">
              Part Time
            </Badge>
            <Badge className="text-purple-700 font-bold" variant="ghost">
              12 LPA
            </Badge>
          </div>
        </div>
        <Button disabled={isApplied} className={`rounded-lg ${isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-purple-700 hover:bg-[#5f32y]"}`}>
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <div className="max-w-7xl mx-auto my-12">
        <h2 className="border-b-2 border-b-gray-300 font-medium py-4">Job Description</h2>
        <div className="my-4">
          <h2 className="font-bold my-1">
            Role: <span className="pl-4 font-normal text-gray-800">Frontend Developer</span>
          </h2>
          <h2 className="font-bold my-1">
            Location: <span className="pl-4 font-normal text-gray-800">Gurgaon</span>
          </h2>
          <h2 className="font-bold my-1">
            Description: <span className="pl-4 font-normal text-gray-800">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi distinctio non animi necessitatibus minima iure doloremque, ipsum rerum quo? Veritatis!</span>
          </h2>
          <h2 className="font-bold my-1">
            Experience: <span className="pl-4 font-normal text-gray-800">2 years</span>
          </h2>
          <h2 className="font-bold my-1">
            Salary: <span className="pl-4 font-normal text-gray-800">10 LPA</span>
          </h2>
          <h2 className="font-bold my-1">
            Total Applicants: <span className="pl-4 font-normal text-gray-800">40</span>
          </h2>
          <h2 className="font-bold my-1">
            Job Posted On: <span className="pl-4 font-normal text-gray-800">20-12-2024</span>
          </h2>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JobDescription;
