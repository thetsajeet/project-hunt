import { UserProject } from "@/app/users/[user_id]/page";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({ proj }: { proj: UserProject }) {
  return (
    <Card className="hover:scale-105 transition-all duration-200 w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          <div className="flex">
            <div className="size-8 rounded-md relative">
              <Image
                src={proj.logoUrl || ""}
                alt="project logo"
                fill
                className="absolute object-cover"
              />
            </div>
            <span className="mt-2 ml-2">{proj.title}</span>
          </div>
        </CardTitle>
        <CardDescription>{proj.shortDescription}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex-col gap-2">
        <Link className="contents" href={`/projects/${proj.project_id}`}>
          <Button type="submit" className="w-full">
            Visit
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
