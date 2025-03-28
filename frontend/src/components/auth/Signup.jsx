import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center mx-auto max-w-7xl ">
        <form action="" className="w-1/2 border-gray-200 rounded-md p-4 my-18">
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input type="text" placeholder="Enter your full name" />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input type="email" placeholder="Enter your email" />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input type="number" placeholder="Enter your phone number" />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input type="password" placeholder="Enter your password" />
          </div>
          <div className="flex justify-between items-center">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input type="radio" value="student" name="role" className="cursor-pointer" />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input type="radio" value="recruiter" name="role" className="cursor-pointer" />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile Image</Label>
              <input accept="image/*" type="file" className="border-2 p-1 rounded-sm cursor-pointer" />
            </div>
          </div>

          <Button type="submit" className="w-full my-4">
            Sign up
          </Button>
          <span>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 text-sm">
              Click here to login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
