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
import { LucidePlusCircle } from "lucide-react";
import Image from "next/image";

export default function AddProjectCard() {
  const title = "Rege.ai";
  const shortDescription = "This is rege.ai";
  const logo = "/project-cover.avif";

  return (
    <Card className="hover:scale-105 group hover:bg-zinc-600 cursor-pointer transition-all duration-200 w-full max-w-sm flex-col">
      <CardContent className="flex-1">
        <span className="flex flex-col flex-1 h-full w-full justify-center items-center">
          <LucidePlusCircle className="text-yellow-400 animate-pulse size-6" />
          <span className="group-hover:text-zinc-100 duration-200 text-sm font-medium text-zinc-600">
            Add a project
          </span>
        </span>
      </CardContent>
    </Card>
  );
}
