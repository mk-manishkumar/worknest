import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  const navigate = useNavigate();

  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!allAppliedJobs || allAppliedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                You haven't applied to any job yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id} onClick={() => navigate(`/description/${appliedJob.job?._id}`)} className="cursor-pointer hover:bg-gray-100 transition-all duration-200 ease-in-out">
                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{appliedJob.job?.title}</TableCell>
                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge className={`${appliedJob?.status === "rejected" ? "bg-red-400" : appliedJob.status === "pending" ? "bg-gray-400" : "bg-green-400"}`}>{appliedJob.status.toUpperCase()}</Badge>
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
