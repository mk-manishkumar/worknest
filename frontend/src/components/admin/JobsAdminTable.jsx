import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Delete, Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setAllAdminJobs } from "@/redux/jobSlice";

const JobsAdminTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  // Delete job from DB + Redux
  const handleDeleteClick = async (jobId) => {
    try {
      const res = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);

        const updatedJobs = allAdminJobs.filter((job) => job._id !== jobId);
        dispatch(setAllAdminJobs(updatedJobs));
      }
    } catch (error) {
      console.error("Delete job error:", error);
      toast.error(error.response?.data?.message || "Failed to delete job");
    }
  };

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="overflow-x-auto w-full">
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap hidden sm:table-cell">Company Name</TableHead>
            <TableHead className="whitespace-nowrap">Role</TableHead>
            <TableHead className="whitespace-nowrap hidden sm:table-cell">Date</TableHead>
            <TableHead className="text-right whitespace-nowrap">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="cursor-pointer">
          {filterJobs && filterJobs.length > 0 ? (
            filterJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell className="hidden sm:table-cell">{job?.company?.name}</TableCell>
                <TableCell>
                  <div>
                    <div>{job?.title}</div>
                    <div className="text-sm text-gray-500 sm:hidden">{job?.company?.name}</div>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{job?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger className="ml-auto block">
                      <MoreHorizontal className="h-5 w-5" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 p-2">
                      <button onClick={() => navigate(`/admin/jobs/${job._id}/edit`)} className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer w-full text-left">
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </button>
                      <button onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer mt-1 w-full text-left">
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </button>
                      <button onClick={() => handleDeleteClick(job._id)} className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer mt-1 text-red-600 w-full text-left">
                        <Delete className="w-4" />
                        <span>Delete</span>
                      </button>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6">
                No jobs found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobsAdminTable;
