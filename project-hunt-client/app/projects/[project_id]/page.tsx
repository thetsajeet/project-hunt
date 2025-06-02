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
import { notFound, useParams } from "next/navigation";

type ProjectType = {
  id: string;
  title: string;
  shortDescription: string;
  longDescription?: string;
  imageUrls?: string[];
  logoUrl?: string;
  rating: number;
  categories?: string[];
  techStack?: string[];
};

export default function ProjectsPage() {
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
  const totalRating = 5;

  // TODO: Use for mutation
  // const queryClient = useQueryClient();

  const { project_id } = useParams();

  console.log(project_id);
  const { data, status, error } = useQuery({
    queryKey: ["projects", project_id],
    async queryFn(): Promise<ProjectType> {
      const response = await fetch(
        "http://localhost:3000/projects/" + project_id,
      );
      if (!response.ok)
        throw new Error("something went wrong: " + response.statusText);
      return response.json();
    },
  });

  console.log(data, status, error);

  if (status === "error") return <div>Invalid project id</div>;

  if (status === "pending") return <div>loading...</div>;

  return (
    <div className="mx-4 flex flex-col">
      <div className="flex flex-row mt-5 mb-7">
        <div className="mr-2">
          <div className="size-16 rounded-md relative">
            <Image
              src={data.logoUrl || ""}
              alt="project logo"
              fill
              className="absolute object-cover"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="text-2xl mb-1">{data.title}</div>
          <div className="text-sm mb-1">{data.shortDescription}</div>
          <div className="flex mb-1">
            {Array.from({ length: Math.floor(data.rating) }).map((_, index) => (
              <span key={index}>
                <Star className="yellow fill-yellow-300 stroke-yellow-400" />
              </span>
            ))}
            <div className="flex mb-1">
              {Array.from({
                length: totalRating - Math.floor(data.rating),
              }).map((_, index) => (
                <span key={index}>
                  <Star />
                </span>
              ))}
            </div>
            <span className="flex ml-1 items-center text-sm">
              {data.rating} / {totalRating}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full mb-4 flex flex-col">
        <span className="text-lg underline underline-offset-2 font-semibold text-zinc-500 mb-1">
          About
        </span>
        <span>{data.longDescription}</span>
      </div>
      <div className="w-full mb-7 flex flex-col justify-center">
        <span className="text-lg mr-2 underline underline-offset-2 font-semibold text-zinc-500 mb-1">
          Categories
        </span>
        {data.categories && data.categories.length > 0 && (
          <span className="flex flex-row">
            {data.categories.map((category) => (
              <Badge className="mr-1 rounded-sm" key={category}>
                {category}
              </Badge>
            ))}
          </span>
        )}
      </div>
      {data.imageUrls && (
        <div className="flex mb-7 px-10">
          <ImageSlider imageUrls={data.imageUrls} />
        </div>
      )}
      <div className="w-full mb-7 flex flex-col justify-center">
        <span className="text-lg mr-2 underline underline-offset-2 font-semibold text-zinc-500 mb-1">
          Technologies
        </span>
        {data.techStack && data.techStack.length > 0 && (
          <span className="flex flex-row">
            {data.techStack.map((tech) => (
              <Badge className="mr-1 rounded-sm" key={tech}>
                {tech}
              </Badge>
            ))}
          </span>
        )}
      </div>
      {/*<div className="flex flex-col mb-7">
        <span className="text-lg mr-2 underline underline-offset-2 font-semibold text-zinc-500 mb-1">
          Reviews
        </span>
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
      </div>*/}
    </div>
  );
}

const ImageSlider = ({ imageUrls }: { imageUrls: string[] }) => {
  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      className="flex-1 mx-auto"
    >
      <CarouselContent>
        {imageUrls.map((imageUrl, index) => (
          <CarouselItem
            key={index}
            className="basis-1/1 md:basis-1/3 lg:basis-1/4"
          >
            <div className="p-1">
              <Card className="border-none">
                <CardContent className="relative flex aspect-square items-center justify-center p-6">
                  <Image
                    alt={`image-slider-${index + 1}`}
                    src={imageUrl}
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
