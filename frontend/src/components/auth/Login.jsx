import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";

const Login = () => {
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex justify-center items-center px-4 sm:px-6 py-8">
        <form onSubmit={handleSubmit} className="w-full max-w-md sm:max-w-lg md:max-w-xl border border-gray-200 rounded-md p-4 sm:p-6 my-4 sm:my-6 md:my-10 shadow-md">
          <h1 className="font-bold text-xl mb-4 sm:mb-5">Login</h1>

          <div className="my-3">
            <Label className="text-sm sm:text-base">Email</Label>
            <Input type="email" placeholder="Enter your email" value={input.email} name="email" onChange={handleChange} className="mt-1 sm:mt-2 outline-none text-sm sm:text-base" />
          </div>

          <div className="my-3">
            <Label className="text-sm sm:text-base">Password</Label>
            <Input type="password" placeholder="Enter your password" value={input.password} name="password" onChange={handleChange} className="mt-1 sm:mt-2 outline-none text-sm sm:text-base" />
          </div>

          <div className="my-4 sm:my-5">
            <Label className="block mb-2 text-sm sm:text-base">Select your role</Label>
            <RadioGroup value={input.role} onValueChange={(value) => setInput({ ...input, role: value })} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="student" className="cursor-pointer" />
                <Label htmlFor="student" className="text-sm sm:text-base cursor-pointer">
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="recruiter" id="recruiter" className="cursor-pointer" />
                <Label htmlFor="recruiter" className="text-sm sm:text-base cursor-pointer">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
          </div>

          {loading ? (
            <Button className="w-full my-3 sm:my-4" disabled>
              Please wait..
            </Button>
          ) : (
            <Button type="submit" className="w-full my-3 sm:my-4">
              Login
            </Button>
          )}

          <div className="text-xs sm:text-sm text-center sm:text-left">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Click here to create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
