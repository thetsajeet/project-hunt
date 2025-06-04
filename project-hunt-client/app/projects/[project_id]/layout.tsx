import { ReactNode } from "react";
import "@/app/globals.css";
import Navbar from "@/components/navbar";

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col">
      <Navbar />
      <div className="flex-1 pb-10">{children}</div>
    </div>
  );
}
