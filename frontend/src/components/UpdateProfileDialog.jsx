import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
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
    skills: user?.profile?.skills?.join(", ") || "",
    resume: null,
    profilePhoto: null,
  });
  const [photoPreview, setPhotoPreview] = useState(user?.profile?.profilePhoto || "");
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, [e.target.name]: file });

    // Preview for profile photo
    if (e.target.name === "profilePhoto" && file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.resume) formData.append("resume", input.resume);
    if (input.profilePhoto) formData.append("profilePhoto", input.profilePhoto);

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogContent className="w-[95%] max-w-md mx-auto p-4 sm:p-6" onInteractOutside={() => setOpen(false)}>
        <DialogHeader>
          <DialogTitle className="text-center sm:text-left">Update Profile</DialogTitle>
          <DialogDescription className="text-center sm:text-left text-muted-foreground">Update your profile information and settings below.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-3 py-3 sm:gap-4 sm:py-4">
            {/* Profile Photo Upload */}
            <div>
              <Label htmlFor="profilePhoto" className="text-sm sm:text-base">
                Profile Photo
              </Label>
              {photoPreview && <img src={photoPreview} alt="Profile Preview" className="mt-2 w-20 h-20 rounded-full object-cover" />}
              <Input id="profilePhoto" name="profilePhoto" type="file" accept="image/*" className="mt-2 text-sm sm:text-base file:mr-4 file:py-1 file:px-2 file:rounded-md file:text-sm" onChange={fileChangeHandler} />
            </div>

            <div>
              <Label htmlFor="name" className="text-sm sm:text-base">
                Name
              </Label>
              <Input id="name" name="fullname" type="text" value={input.fullname} onChange={changeEventHandler} />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm sm:text-base">
                Email
              </Label>
              <Input id="email" name="email" type="email" value={input.email} onChange={changeEventHandler} />
            </div>
            <div>
              <Label htmlFor="contact" className="text-sm sm:text-base">
                Contact
              </Label>
              <Input id="contact" name="phoneNumber" type="number" value={input.phoneNumber} onChange={changeEventHandler} />
            </div>
            <div>
              <Label htmlFor="bio" className="text-sm sm:text-base">
                Bio
              </Label>
              <Input id="bio" name="bio" type="text" value={input.bio} onChange={changeEventHandler} />
            </div>
            <div>
              <Label htmlFor="skills" className="text-sm sm:text-base">
                Skills (comma separated)
              </Label>
              <Input id="skills" name="skills" type="text" value={input.skills} onChange={changeEventHandler} />
            </div>
            <div>
              <Label htmlFor="resume" className="text-sm sm:text-base">
                Resume
              </Label>
              <Input id="resume" name="resume" type="file" accept="application/pdf" className="mt-2 text-sm sm:text-base file:mr-4 file:py-1 file:px-2 file:rounded-md file:text-sm" onChange={fileChangeHandler} />
            </div>
          </div>

          <DialogFooter className="flex justify-center sm:justify-end mt-2">{loading ? <Button disabled>Please wait...</Button> : <Button type="submit">Update</Button>}</DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
