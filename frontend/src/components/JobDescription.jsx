import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Footer from "./shared/Footer";
import { useParams } from "react-router-dom";
import { setSingleJob } from "../redux/jobSlice";
import axios from "axios";
import { JOB_API_END_POINT } from "../utils/constant";
import { APPLICATION_API_END_POINT } from "../utils/constant";
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
        setIsApplied(true); //update the local state
        const updateSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
        dispatch(setSingleJob(updateSingleJob)); // for real time UI update
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
          //ensure the state is in sync with fetched data
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

      <div className="max-w-7xl mx-auto my-10 flex justify-between">
        <div>
          <h1 className="font-bold text-xl ">{singleJob?.title}</h1>
          <div className="flex gap-2 mt-4 items-center">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob?.jobOpenings} positions
            </Badge>
            <Badge className="text-red-700 font-bold" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-purple-700 font-bold" variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button onClick={isApplied ? null : applyJobHandler} disabled={isApplied} className={`rounded-lg ${isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-purple-700 hover:bg-[#5f32y] cursor-pointer"}`}>
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <div className="max-w-7xl mx-auto my-12">
        <h2 className="border-b-2 border-b-gray-300 font-medium py-4">Job Description</h2>
        <div className="my-4">
          <h2 className="font-bold my-1">
            Role: <span className="pl-4 font-normal text-gray-800">{singleJob?.title}</span>
          </h2>
          <h2 className="font-bold my-1">
            Location: <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span>
          </h2>
          <h2 className="font-bold my-1">
            Description: <span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span>
          </h2>
          <h2 className="font-bold my-1">
            Experience: <span className="pl-4 font-normal text-gray-800">{singleJob?.experienceLevel} years</span>
          </h2>
          <h2 className="font-bold my-1">
            Salary: <span className="pl-4 font-normal text-gray-800">{singleJob?.salary} LPA</span>
          </h2>
          <h2 className="font-bold my-1">
            Total Applicants: <span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length}</span>
          </h2>
          <h2 className="font-bold my-1">
            Job Posted On: <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split("T")[0]}</span>
          </h2>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JobDescription;
