import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/description/${job._id}`)} className="p-4 md:p-5 rounded-md shadow-md hover:shadow-xl transition-shadow duration-300 bg-white border border-gray-100 cursor-pointer h-full flex flex-col">
      <div>
        <h1 className="font-medium text-base md:text-lg line-clamp-1">{job?.company?.name}</h1>
        <p className="text-xs md:text-sm text-gray-500">{job?.location}</p>
      </div>
      <div className="flex-grow">
        <h2 className="font-bold text-base md:text-lg my-2 line-clamp-1">{job?.title}</h2>
        <p className="text-xs md:text-sm text-gray-600 line-clamp-3">{job?.description}</p>
      </div>
      <div className="flex flex-wrap gap-2 mt-4 items-center">
        <Badge className="text-xs md:text-sm text-blue-700 font-medium" variant="ghost">
          {job?.jobOpenings} {job?.jobOpenings === 1 ? "Position" : "Positions"}
        </Badge>
        <Badge className="text-xs md:text-sm text-red-700 font-medium" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-xs md:text-sm text-purple-700 font-medium" variant="ghost">
          {job?.salary}
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
