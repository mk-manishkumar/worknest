import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) formData.append("file", input.file);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center px-4 md:px-6 mx-auto max-w-7xl">
        <form onSubmit={handleSubmit} className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 border border-gray-200 rounded-md p-4 my-8 md:my-16">
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label className="my-2">Full Name</Label>
            <Input type="text" placeholder="Enter your full name" value={input.fullname} name="fullname" onChange={handleChange} />
          </div>
          <div className="my-2">
            <Label className="my-2">Email</Label>
            <Input type="email" placeholder="Enter your email" value={input.email} name="email" onChange={handleChange} />
          </div>
          <div className="my-2">
            <Label className="my-2">Phone Number</Label>
            <Input type="number" placeholder="Enter your phone number" value={input.phoneNumber} name="phoneNumber" onChange={handleChange} />
          </div>
          <div className="my-2">
            <Label className="my-2">Password</Label>
            <Input type="password" placeholder="Enter your password" value={input.password} name="password" onChange={handleChange} />
          </div>

          {/* Responsive radio and file upload layout */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <RadioGroup className="flex items-center gap-4 my-3">
              <div className="flex items-center space-x-2">
                <Input type="radio" value="student" name="role" className="cursor-pointer" checked={input.role === "student"} onChange={handleChange} />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input type="radio" value="recruiter" name="role" className="cursor-pointer" checked={input.role === "recruiter"} onChange={handleChange} />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <Label className="whitespace-nowrap">Profile Image</Label>
              <input accept="image/*" type="file" className="border-2 p-1 rounded-sm cursor-pointer w-full sm:w-auto text-sm" onChange={handleFile} />
            </div>
          </div>

          {loading ? (
            <Button className="w-full my-4" disabled>
              Please wait..
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Sign Up
            </Button>
          )}
          <div className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Click here to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
