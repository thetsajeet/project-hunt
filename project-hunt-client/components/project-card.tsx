import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function ProjectCard() {
  const title = "Rege.ai";
  const shortDescription = "This is rege.ai";
  const logo = "/project-cover.avif";

  return (
    <Card className="hover:scale-105 transition-all duration-200 w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          <div className="flex">
            <div className="size-8 rounded-md relative">
              <Image
                src={logo}
                alt="project logo"
                fill
                className="absolute object-cover"
              />
            </div>
            <span className="mt-2 ml-2">{title}</span>
          </div>
        </CardTitle>
        <CardDescription>{shortDescription}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Visit
        </Button>
      </CardFooter>
    </Card>
  );
}
