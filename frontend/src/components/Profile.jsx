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

const isResume = true;

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-12 w-[90%]">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p className="text-gray-600">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div>
          <h2 className="font-semibold">Skills</h2>
          <div className="flex gap-1 my-2">{user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>}</div>
        </div>
        <div className="grid  w-full max-w-sm items-center gap-2">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a href={user?.profile?.resume} target="_blank" className="text-blue-500 w-full hover:underline cursor-pointer">
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl mb-10">
        <h2 className="font-bold text-lg my-5">All Applied Jobs</h2>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
      <Footer />
    </div>
  );
};
export default Profile;
