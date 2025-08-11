import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = ["Graphic Design", "Data Science", "Digital Marketing", "Software Development", "Content Writing", "Cybersecurity", "Project Management", "Cloud Computing", "Full Stack Development", "Mobile App Development"];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Carousel className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto my-8 sm:my-12 md:my-16 lg:my-20">
        <CarouselContent>
          {category.map((cat) => (
            <CarouselItem key={cat} className="md:basis-1/2 lg:basis-1/3">
              <div className="flex justify-center p-1">
                <Button onClick={() => searchJobHandler(cat)} variant="outline" className="rounded-full text-xs sm:text-sm w-full h-auto py-2 px-3 sm:px-4 truncate cursor-pointer">
                  {cat}
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 sm:-left-6 bg-white" />
        <CarouselNext className="-right-4 sm:-right-6 bg-white" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
