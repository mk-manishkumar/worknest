import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import JobsAdminTable from "./JobsAdminTable";
import useGetAllAdminJobs from "../../hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "../../redux/jobSlice";
import Footer from "../shared/Footer";

const JobsAdmin = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-10 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-5">
          <Input className="w-full sm:w-64" placeholder="Filter by name, role" onChange={(e) => setInput(e.target.value)} />
          <Button onClick={() => navigate("/admin/jobs/create")} className="cursor-pointer w-full sm:w-auto">
            New Job
          </Button>
        </div>
        <JobsAdminTable />
      </div>
      <Footer />
    </div>
  );
};

export default JobsAdmin;
