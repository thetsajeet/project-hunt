import Navbar from "@/components/navbar";
import { ReactNode } from "react";

export default function ProjectsLayout({ children }: { children: ReactNode }) {
    return (
        <div className="max-w-7xl mx-auto h-full flex flex-col">
            <Navbar />
            <div className="flex-1 pb-10">{children}</div>
        </div>
    );
}
