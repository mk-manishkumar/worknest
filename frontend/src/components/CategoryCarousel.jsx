import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";

const category = ["Graphic Design", "Data Science", "Digital Marketing", "Software Development", "Content Writing", "Cybersecurity", "Project Management", "Cloud Computing", "Full Stack Development", "Mobile App Development"];

const CategoryCarousel = () => {
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((cat) => (
            <CarouselItem key={cat} className="md:basis-1/2 lg-basis-1/3">
              <Button variant="outline" className="rounded-full">{cat}</Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
