import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
      console.log(res);

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="overflow-x-auto w-full">
      <Table>
        <TableCaption>A list of your recent applied applicants</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">FullName</TableHead>
            <TableHead className="whitespace-nowrap hidden sm:table-cell">Email</TableHead>
            <TableHead className="whitespace-nowrap hidden md:table-cell">Contact</TableHead>
            <TableHead className="whitespace-nowrap">Resume</TableHead>
            <TableHead className="whitespace-nowrap hidden sm:table-cell">Date</TableHead>
            <TableHead className="text-right whitespace-nowrap">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants && applicants?.applications?.length > 0 ? (
            applicants.applications.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">{item?.applicant?.fullname}</TableCell>
                <TableCell className="hidden sm:table-cell">{item?.applicant?.email}</TableCell>
                <TableCell className="hidden md:table-cell">{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item.applicant?.profile?.resume ? (
                    <a className="text-blue-600 cursor-pointer truncate block max-w-[120px] sm:max-w-full" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer" title={item?.applicant?.profile?.resumeOriginalName}>
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell className="hidden sm:table-cell">{item?.applicant.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="ml-auto block">
                      <MoreHorizontal className="h-5 w-5" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 p-2">
                      {shortlistingStatus.map((status, index) => (
                        <div onClick={() => statusHandler(status, item?._id)} key={index} className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                No applicants found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
