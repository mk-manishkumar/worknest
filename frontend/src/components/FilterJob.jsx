import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "@/components/ui/label";

const filterData = [
  {
    filterType: "Location",
    array: ["Banglore", "Noida", "Gurgaon", "Hyderabad", "Jaipur"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Development", "Backend Development", "Full Stack Development", "DevOps", "ML/AI"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "41k-100k", "100k-500k"],
  },
];

const FilterJob = () => {
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup>
        {filterData.map((data, index) => (
          <div>
            <h2 className="font-bold text-lg">{data.filterType}</h2>
            {data.array.map((item, index) => {
              return (
                <div className="flex items-center space-x-2 my-3">
                  <RadioGroupItem value={item} />
                  <Label>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterJob;
