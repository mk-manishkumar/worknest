import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchJobHandler();
    }
  };

  return (
    <div className="text-center px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 sm:gap-5 my-6 sm:my-8 md:my-10">
        <span className="mx-auto px-3 sm:px-4 py-1 sm:py-2 rounded-full bg-gray-100 text-[#F83002] text-xs sm:text-sm font-medium">No.1 Job Hunting Platform</span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Search, Apply & <br className="hidden sm:inline" /> Crack Your <span className="text-[#6A38C2]">Dream Job</span>
        </h1>

        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis laborum dolorem voluptatem! Lorem ipsum dolor sit amet.</p>

        <div className="flex w-full sm:w-4/5 md:w-3/5 lg:w-2/5 shadow-lg border border-gray-200 rounded-full items-center pl-3 gap-2 mx-auto mt-2 sm:mt-4">
          <input type="text" placeholder="Find your dream jobs" className="outline-none border-none w-full py-2 text-sm sm:text-base" onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown} />
          <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2] h-10 px-3 sm:px-4 cursor-pointer">
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
