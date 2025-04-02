import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "../redux/authSlice";
import { USER_API_END_POINT } from "../utils/constant";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill) => skill),
    file: user?.profile?.resume,
  });
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3 mt-2" name="fullname" type="text" value={input.fullname} onChange={changeEventHandler} />
              </div>
              <div>
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" className="col-span-3 mt-2" name="email" type="email" value={input.email} onChange={changeEventHandler} />
              </div>
              <div>
                <Label htmlFor="contact" className="text-right">
                  Contact
                </Label>
                <Input id="contact" className="col-span-3 mt-2" name="phoneNumber" type="number" value={input.phoneNumber} onChange={changeEventHandler} />
              </div>
              <div>
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Input id="bio" className="col-span-3 mt-2" name="bio" type="text" value={input.bio} onChange={changeEventHandler} />
              </div>
              <div>
                <Label htmlFor="skills" className="text-right">
                  Skills
                </Label>
                <Input id="skills" className="col-span-3 mt-2" name="skills" type="text" value={input.skills} onChange={changeEventHandler} />
              </div>
              <div>
                <Label htmlFor="resume" className="text-right">
                  Resume
                </Label>
                <Input id="resume" className="col-span-3 mt-2" name="resume" type="file" accept="application/pdf" onChange={fileChangeHandler} />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4" disabled>
                  Please wait..
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4">
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
