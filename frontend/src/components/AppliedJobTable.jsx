import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-full">
        <TableCaption className="text-xs sm:text-sm my-2">A list of your applied jobs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs sm:text-sm md:text-base px-2 sm:px-4">Date</TableHead>
            <TableHead className="text-xs sm:text-sm md:text-base px-2 sm:px-4">Job Role</TableHead>
            <TableHead className="text-xs sm:text-sm md:text-base px-2 sm:px-4 hidden sm:table-cell">Company</TableHead>
            <TableHead className="text-xs sm:text-sm md:text-base px-2 sm:px-4 text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!allAppliedJobs || allAppliedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-xs sm:text-sm py-4">
                You haven't applied to any job yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id} onClick={() => navigate(`/description/${appliedJob.job?._id}`)} className="cursor-pointer hover:bg-gray-100 transition-all duration-200 ease-in-out">
                <TableCell className="text-xs sm:text-sm py-2 sm:py-3 px-2 sm:px-4 whitespace-nowrap">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="text-xs sm:text-sm py-2 sm:py-3 px-2 sm:px-4 font-medium truncate max-w-[150px] sm:max-w-none">{appliedJob.job?.title}</TableCell>
                <TableCell className="text-xs sm:text-sm py-2 sm:py-3 px-2 sm:px-4 truncate hidden sm:table-cell">{appliedJob.job?.company?.name}</TableCell>
                <TableCell className="text-xs sm:text-sm py-2 sm:py-3 px-2 sm:px-4 text-right">
                  <Badge className={`text-xs whitespace-nowrap ${appliedJob?.status === "rejected" ? "bg-red-400" : appliedJob.status === "pending" ? "bg-gray-400" : "bg-green-400"}`}>{appliedJob.status.toUpperCase()}</Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
