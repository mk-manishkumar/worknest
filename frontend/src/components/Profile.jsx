import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "@/components/ui/label";
import AppliedJobTable from "./AppliedJobTable";
import Footer from "./shared/Footer";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../hooks/useGetAppliedJobs";
import { motion } from "framer-motion";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />

      <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.3 }} className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-lg sm:rounded-2xl my-3 sm:my-5 p-4 sm:p-6 md:p-8 mx-4 sm:mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 md:gap-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 md:gap-12 w-full sm:w-[90%]">
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24">
              <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
            </Avatar>
            <div className="mt-2 sm:mt-0">
              <h1 className="font-medium text-lg sm:text-xl">{user?.fullname}</h1>
              <p className="text-gray-600 text-sm sm:text-base">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="text-right self-end sm:self-auto" variant="outline" size="sm">
            <Pen size={16} />
          </Button>
        </div>

        <div className="my-4 sm:my-5">
          <div className="flex items-center gap-2 sm:gap-3 my-1 sm:my-2 text-sm sm:text-base">
            <Mail size={16} className="sm:size-5" />
            <span className="break-all">{user?.email}</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 my-1 sm:my-2 text-sm sm:text-base">
            <Contact size={16} className="sm:size-5" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-sm sm:text-base">Skills</h2>
          <div className="flex flex-wrap gap-1 my-2">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index} className="text-xs sm:text-sm my-1">
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-sm">NA</span>
            )}
          </div>
        </div>

        <div className="w-full max-w-sm items-center gap-1 sm:gap-2 mt-3 sm:mt-4">
          <Label className="text-sm sm:text-base font-bold">Resume</Label>
          {isResume ? (
            <a href={user?.profile?.resume} target="_blank" className="text-blue-500 w-full hover:underline cursor-pointer text-sm sm:text-base block mt-1">
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-sm sm:text-base">NA</span>
          )}
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto bg-white rounded-lg sm:rounded-2xl mb-6 sm:mb-10 px-4 sm:px-6">
        <h2 className="font-bold text-base sm:text-lg my-3 sm:my-5">All Applied Jobs</h2>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
      <Footer />
    </div>
  );
};

export default Profile;
