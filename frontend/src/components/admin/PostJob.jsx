import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Footer from "../shared/Footer";

const PostJob = () => {
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
  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
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
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-full my-5">
        <form onSubmit={submitHandler} className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md my-8">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="mb-3">Title</Label>
              <Input type="text" name="title" value={input.title} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>
            <div>
              <Label className="mb-3">Description</Label>
              <Input type="text" name="description" value={input.description} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>
            <div>
              <Label className="mb-3">Requirements</Label>
              <Input type="text" name="requirements" value={input.requirements} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>
            <div>
              <Label className="mb-3">Salary</Label>
              <Input type="text" name="salary" value={input.salary} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>
            <div>
              <Label className="mb-3">Location</Label>
              <Input type="text" name="location" value={input.location} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>
            <div>
              <Label className="mb-3">Job Type</Label>
              <Select onValueChange={(value) => setInput({ ...input, jobType: value })} value={input.jobType}>
                <SelectTrigger className="w-full focus-visible:ring-offset-0 focus-visible:ring-0 my-1">
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
            <div>
              <Label className="mb-3">Experience Level</Label>
              <Input type="text" name="experience" value={input.experience} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>
            <div>
              <Label className="mb-3">Number of Openings</Label>
              <Input type="number" name="jobOpenings" value={input.jobOpenings} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>
            {companies.length > 0 && (
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => {
                      return <SelectItem value={company?.name?.toLowerCase()}>{company.name}</SelectItem>;
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Post New Job
            </Button>
          )}
          {companies.length === 0 && <p className="text-xs text-red-600 font-bold text-center my-3">*Please register a company first, before posting a jobs</p>}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default PostJob;
