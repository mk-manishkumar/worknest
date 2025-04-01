import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Bookmark } from "lucide-react";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

const JobList = () => {
  const navigate = useNavigate();
  const jobId = "cbwcibncuibwdciwbc"

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">2 days ago</p>
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
          <h1 className="font-medium text-lg">Company Name</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      <div>
        <h2 className="font-bold text-lg my-2">Title</h2>
        <p className="text-sm text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem illo modi quibusdam excepturi itaque quia veritatis earum labore atque alias?</p>
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

      <div className="flex items-center gap-4 mt-4">
        <Button onClick={() => navigate(`/description/${jobId}`)} variant="outline">
          See Details
        </Button>
        <Button className="bg-purple-700">Save for Later</Button>
      </div>
    </div>
  );
};

export default JobList;
