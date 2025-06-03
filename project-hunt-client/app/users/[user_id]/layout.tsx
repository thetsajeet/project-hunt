import { ReactNode } from "react";

export default function ProjectsLayout({ children }: { children: ReactNode }) {
    return <div className="max-w-7xl mx-auto h-full">{children}</div>;
}
