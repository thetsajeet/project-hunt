import { ReactNode } from "react";
import "@/app/globals.css";

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return <div className="max-w-7xl mx-auto">{children}</div>;
}
