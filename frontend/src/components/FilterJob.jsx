import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { X } from "lucide-react";
import { Button } from "./ui/button";

const filterData = [
  {
    filterType: "Location",
    array: ["Banglore", "Noida", "Gurgaon", "Hyderabad", "Remote"],
  },
  {
    filterType: "Job Role",
    array: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "DevOps", "ML/AI"],
  },
  {
    filterType: "Job Type",
    array: ["Full Time", "Part Time", "Contract", "Internship", "Freelance"],
  },
];

const FilterJob = ({ setShowFilter }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  const clearFilter = () => {
    setSelectedValue("");
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full bg-white p-3 sm:p-4 rounded-md shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">Filter Jobs</h1>
        <div className="flex gap-2">
          {selectedValue && (
            <Button variant="ghost" onClick={clearFilter} className="text-xs h-8 px-2 text-red-600 hover:text-red-700">
              Clear
            </Button>
          )}
          <Button onClick={() => setShowFilter && setShowFilter(false)} className="lg:hidden">
            <X size={20} />
          </Button>
        </div>
      </div>
      <hr className="mt-3" />

      <div className="mt-4 max-h-[70vh] overflow-y-auto pr-1">
        <RadioGroup onValueChange={changeHandler} value={selectedValue}>
          {filterData.map((data, index) => (
            <div key={`filter-${index}`} className="mb-4">
              <h2 className="font-bold text-base sm:text-lg">{data.filterType}</h2>
              <div className="mt-2">
                {data.array.map((item, idx) => {
                  const itemId = `id${index}-${idx}`;
                  return (
                    <div key={itemId} className="flex items-center space-x-2 my-2">
                      <RadioGroupItem value={item} id={itemId} />
                      <Label htmlFor={itemId} className="text-sm sm:text-base cursor-pointer">
                        {item}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterJob;
