"use client";

import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { notFound } from "next/navigation";

export default function ProjectsPage() {
  const categories = ["entertainment", "fintech"];
  const reviews = [
    {
      id: "1",
      text: "Good project",
    },
    {
      id: "2",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque tempora rerum dignissimos dolorem beatae at, aspernatur corporis quod voluptate delectus.",
    },
  ];
  const techStack = ["react", "mongodb", "express", "node", "aws"];
  const rating = 3.72;
  const totalRating = 5;
  const longDescription =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam voluptatibus sequi fugiat id rem deserunt possimus quod ullam dolores vitae praesentium dicta facilis ducimus dolore necessitatibus quaerat ex excepturi doloribus labore, at sint repudiandae.Quae, ducimus. Fuga magnam cupiditate perferendis quo autem, dolores consectetur alias, ea laboriosam odit consequuntur nostrum.";

  const queryClient = useQueryClient();

  const { data, status, error } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/posts/1");
      if (!response.ok)
        throw new Error("something went wrong: " + response.statusText);
      return response.json();
    },
  });

  console.log(data, status, error);

  if (status === "error") return notFound();

  if (status === "pending") return <div>loading...</div>;

  return (
    <div className="mx-4 flex flex-col">
      <div className="flex flex-row mt-5 mb-7">
        <div className="mr-2">
          <div className="size-16 rounded-md relative">
            <Image
              src="/project-cover.avif"
              alt="project-cover"
              fill
              className="absolute object-cover"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="text-2xl mb-1">Tyce</div>
          <div className="text-sm mb-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, quos!
          </div>
          <div className="flex mb-1">
            {Array.from({ length: Math.floor(rating) }).map((_, index) => (
              <span key={index}>
                <Star className="yellow fill-yellow-300 stroke-yellow-400" />
              </span>
            ))}
            <div className="flex mb-1">
              {Array.from({ length: totalRating - Math.floor(rating) }).map(
                (_, index) => (
                  <span key={index}>
                    <Star />
                  </span>
                ),
              )}
            </div>
            <span className="flex ml-1 items-center text-sm">
              {rating} / {totalRating}
            </span>
          </div>
        </div>
        <div className="flex flex-col w-20 ml-2">
          <span className="relative"></span>
        </div>
      </div>
      <div className="w-full mb-7">{longDescription}</div>
      <div className="w-full mb-7 flex items-center">
        <span className="mr-2 font-bold">Categories</span>
        {categories.map((category) => (
          <Badge className="mr-1 rounded-sm" key={category}>
            {category}
          </Badge>
        ))}
      </div>
      <div className="flex mb-7 px-10">
        <ImageSlider />
      </div>
      <div className="w-full mb-7 flex items-center">
        <span className="mr-2 font-bold">Tech Stack</span>
        {techStack.map((stack) => (
          <Badge className="mr-1 rounded-sm" key={stack}>
            {stack}
          </Badge>
        ))}
      </div>
      <div className="flex flex-col mb-7">
        <div className="w-full mb-7">
          <Textarea className="resize-none" placeholder="Leave a review..." />
        </div>
        <div className="flex flex-col mb-7">
          {reviews.map((review) => (
            <span key={review.id} className="mb-2">
              {review.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const ImageSlider = () => {
  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      className="flex-1 mx-auto"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="basis-1/1 md:basis-1/3 lg:basis-1/4"
          >
            <div className="p-1">
              <Card className="border-none">
                <CardContent className="relative flex aspect-square items-center justify-center p-6">
                  <Image
                    alt="project sliders"
                    src={`/project-slider-${index + 1}.avif`}
                    fill
                    className="absolute object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
