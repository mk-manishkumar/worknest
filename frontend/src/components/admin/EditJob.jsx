import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Footer from "../shared/Footer";

const EditJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    jobOpenings: 0,
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const jobId = params.id;

  const { companies } = useSelector((store) => store.company);

  // Fetch job details when component loads
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setFetchLoading(true);
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          const job = res.data.job;
          setInput({
            title: job.title || "",
            description: job.description || "",
            requirements: job.requirements ? job.requirements.join(",") : "",
            salary: job.salary || "",
            location: job.location || "",
            jobType: job.jobType || "",
            experience: job.experienceLevel || "",
            jobOpenings: job.jobOpenings || 0,
            companyId: job.company || "",
          });
        }
      } catch (error) {
        toast.error("Failed to fetch job details");
        console.error(error);
      } finally {
        setFetchLoading(false);
      }
    };

    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => company._id === value);
    if (selectedCompany) {
      setInput({ ...input, companyId: selectedCompany._id });
    }
  };

  // Add the update form submission handler
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(`${JOB_API_END_POINT}/update/${jobId}`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update job");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center flex-grow">
          <div className="flex items-center">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading job details...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center w-full px-4 py-5">
        <form onSubmit={submitHandler} className="p-4 sm:p-6 md:p-8 w-full max-w-4xl border border-gray-200 shadow-lg rounded-md my-4 sm:my-8">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Edit Job</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="space-y-1">
              <Label>Title</Label>
              <Input type="text" name="title" value={input.title} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0" />
            </div>
            <div className="space-y-1">
              <Label>Description</Label>
              <Input type="text" name="description" value={input.description} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0" />
            </div>
            <div className="space-y-1">
              <Label>Requirements</Label>
              <Input type="text" name="requirements" value={input.requirements} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0" />
            </div>
            <div className="space-y-1">
              <Label>Salary</Label>
              <Input type="text" name="salary" value={input.salary} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0" />
            </div>
            <div className="space-y-1">
              <Label>Location</Label>
              <Input type="text" name="location" value={input.location} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0" />
            </div>
            <div className="space-y-1">
              <Label>Job Type</Label>
              <Select onValueChange={(value) => setInput({ ...input, jobType: value })} value={input.jobType}>
                <SelectTrigger className="w-full focus-visible:ring-offset-0 focus-visible:ring-0">
                  <SelectValue placeholder="Select a job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Full time">Full time</SelectItem>
                    <SelectItem value="Part time">Part time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Freelance">Freelance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Experience Level</Label>
              <Input type="text" name="experience" value={input.experience} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0" />
            </div>
            <div className="space-y-1">
              <Label>Number of Openings</Label>
              <Input type="number" name="jobOpenings" value={input.jobOpenings} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0" />
            </div>
            {companies.length > 0 && (
              <div className="space-y-1 md:col-span-2">
                <Label>Company</Label>
                <Select onValueChange={selectChangeHandler} value={input.companyId}>
                  <SelectTrigger className="w-full focus-visible:ring-offset-0 focus-visible:ring-0">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem key={company._id} value={company._id}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          {loading ? (
            <Button disabled className="w-full mt-6 cursor-pointer">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full mt-6 cursor-pointer">
              Update Job
            </Button>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditJob;
