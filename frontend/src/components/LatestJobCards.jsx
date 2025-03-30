import React from "react";
import { Badge } from "./ui/badge";

const LatestJobCards = () => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border-gray-100 cursor-pointer">
      <div>
        <h1 className="font-medium text-lg">Company Name</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h2 className="font-bold text-lg my-2">Job Title</h2>
        <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem ipsum dolor sit amet.</p>
      </div>
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
  );
};

export default LatestJobCards;
