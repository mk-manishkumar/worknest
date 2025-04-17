import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Footer from "./shared/Footer";
import { useParams } from "react-router-dom";
import { setSingleJob } from "../redux/jobSlice";
import axios from "axios";
import { JOB_API_END_POINT, APPLICATION_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const isInitiallyApplied = singleJob?.applications?.some((application) => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        setIsApplied(true);
        const updateSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
        dispatch(setSingleJob(updateSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some((application) => application.applicant === user?._id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto my-6 md:my-10 px-4 md:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-bold text-lg md:text-xl break-words">{singleJob?.title}</h1>
            <div className="flex flex-wrap gap-2 mt-3 items-center">
              <Badge className="text-blue-700 font-bold text-xs md:text-sm" variant="ghost">
                {singleJob?.jobOpenings} positions
              </Badge>
              <Badge className="text-red-700 font-bold text-xs md:text-sm" variant="ghost">
                {singleJob?.jobType}
              </Badge>
              <Badge className="text-purple-700 font-bold text-xs md:text-sm" variant="ghost">
                {singleJob?.salary}
              </Badge>
            </div>
          </div>
          <Button onClick={isApplied ? null : applyJobHandler} disabled={isApplied} className={`rounded-lg w-full sm:w-auto mt-3 sm:mt-0 ${isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-purple-700 hover:bg-purple-800 cursor-pointer"}`}>
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto my-6 md:my-12 px-4 md:px-6">
        <h2 className="border-b-2 border-b-gray-300 font-medium py-3 md:py-4">Job Description</h2>
        <div className="my-4 space-y-2 md:space-y-3">
          <div className="flex flex-col sm:flex-row">
            <h2 className="font-bold min-w-24">Role:</h2>
            <span className="text-gray-800 sm:pl-4">{singleJob?.title}</span>
          </div>
          <div className="flex flex-col sm:flex-row">
            <h2 className="font-bold min-w-24">Location:</h2>
            <span className="text-gray-800 sm:pl-4">{singleJob?.location}</span>
          </div>
          <div className="flex flex-col sm:flex-row">
            <h2 className="font-bold min-w-24">Description:</h2>
            <span className="text-gray-800 sm:pl-4">{singleJob?.description}</span>
          </div>
          <div className="flex flex-col sm:flex-row">
            <h2 className="font-bold min-w-24">Experience:</h2>
            <span className="text-gray-800 sm:pl-4">
              {singleJob?.experienceLevel} {singleJob?.experienceLevel > 1 ? "years" : "year"}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row">
            <h2 className="font-bold min-w-24">Salary:</h2>
            <span className="text-gray-800 sm:pl-4">{singleJob?.salary}</span>
          </div>
          <div className="flex flex-col sm:flex-row">
            <h2 className="font-bold min-w-24">Total Applicants:</h2>
            <span className="text-gray-800 sm:pl-4">{singleJob?.applications?.length}</span>
          </div>
          <div className="flex flex-col sm:flex-row">
            <h2 className="font-bold min-w-24">Job Posted On:</h2>
            <span className="text-gray-800 sm:pl-4">{singleJob?.createdAt?.split("T")[0]}</span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JobDescription;
