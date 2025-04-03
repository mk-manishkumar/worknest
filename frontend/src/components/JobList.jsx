import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Bookmark } from "lucide-react";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

const JobList = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunc = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{job?.createdAt ? `${daysAgoFunc(job?.createdAt)} days ago` : "Today"}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="bg-transparent">
          <Avatar>
            <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>

      <div>
        <h2 className="font-bold text-lg my-2">{job?.title}</h2>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>

      <div className="flex gap-2 mt-4 items-center">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.jobOpenings} Positions
        </Badge>
        <Badge className="text-red-700 font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-purple-700 font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">
          See Details
        </Button>
        <Button className="bg-purple-700">Save for Later</Button>
      </div>
    </div>
  );
};

export default JobList;
