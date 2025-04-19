import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Bookmark, BookmarkPlus } from "lucide-react";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveJobForLater } from "../redux/jobSlice";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";

const JobList = ({ job, isSavedPage = false, onUnsave }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const savedJobs = useSelector((state) => state.job.savedJobs || []);
  const isSaved = savedJobs.some((j) => j._id === job._id);

  const daysAgoFunc = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const saveForLater = async () => {
    try {
      const res = await axios.post(`${USER_API_END_POINT}/save-job`, { jobId: job._id }, { withCredentials: true });

      if (res.data.success) {
        dispatch(saveJobForLater(job));
        toast.success("Job saved for later!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to save job.");
    }
  };

  return (
    <div className="p-3 sm:p-4 md:p-5 rounded-md shadow-md hover:shadow-xl transition-shadow bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm text-gray-500">{job?.createdAt ? `${daysAgoFunc(job?.createdAt)} days ago` : "Today"}</p>
        {!isSavedPage && (
          <Button onClick={saveForLater} variant="outline" className="rounded-full h-8 w-8 p-0 cursor-pointer" size="icon" disabled={isSaved}>
            {isSaved ? <Bookmark className="text-gray-500" size={16} /> : <BookmarkPlus size={16} />}
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="bg-transparent p-0 sm:p-1 md:p-2" variant="outline" size="icon">
          <Avatar className="h-10 w-10">
            <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-base sm:text-lg line-clamp-1">{job?.company?.name}</h1>
          <p className="text-xs sm:text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>

      <div>
        <h2 className="font-bold text-base sm:text-lg my-2 line-clamp-1">{job?.title}</h2>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">{job?.description}</p>
      </div>

      <div className="flex flex-wrap gap-2 mt-3 md:mt-4 items-center">
        <Badge className="text-xs text-blue-700 font-medium" variant="ghost">
          {job?.jobOpenings} {job?.jobOpenings === 1 ? "Position" : "Positions"}
        </Badge>
        <Badge className="text-xs text-red-700 font-medium" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-xs text-purple-700 font-medium" variant="ghost">
          {job?.salary}
        </Badge>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-3 md:mt-4">
        <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline" className="w-full sm:w-auto text-xs sm:text-sm py-1 h-8 sm:h-9 cursor-pointer">
          See Details
        </Button>

        {isSavedPage ? (
          <Button onClick={onUnsave} className=" cursor-pointer bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto text-xs sm:text-sm py-1 h-8 sm:h-9">
            <Bookmark className="mr-2" size={16} /> Unsave Job
          </Button>
        ) : (
          <Button onClick={saveForLater} className={`w-full sm:w-auto text-xs sm:text-sm py-1 h-8 sm:h-9 ${isSaved ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-purple-700 hover:bg-purple-800 text-white"}`} disabled={isSaved}>
            {isSaved ? (
              <>
                <Bookmark className="mr-2" size={16} /> Saved
              </>
            ) : (
              <>
                <BookmarkPlus className="mr-2" size={16} /> Save for Later
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default JobList;
