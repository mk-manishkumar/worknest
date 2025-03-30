import React from "react";
import { Search } from "lucide-react";
import {Button} from "./ui/button";

const HeroSection = () => {
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">No.1 Job Hunting Platform</span>
        <h1 className="text-5xl font-bold">
          Search, Apply & <br /> Crack Your <span className="text-[#6A38C2]">Dream Job</span>{" "}
        </h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis laborum dolorem voluptatem! Lorem ipsum dolor sit amet.</p>

        <div className="flex w-[40%] shadow-lg border border-gray-200 rounded-full items-center pl-3 gap-4 mx-auto mt-4">
          <input type="text" placeholder="Find your dream jobs" className="outline-none border-none w-full " />
          <Button className="rounded-r-full bg-[#6A38C2]">
            <Search className="" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
