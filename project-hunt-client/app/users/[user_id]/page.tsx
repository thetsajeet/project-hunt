"use client";

import ProjectCard from "@/components/project-card";
import AddProjectCard from "@/components/add-project-card";
import { useParams } from "next/navigation";

type UserProject = {
    project_id: string;
    title: string;
    logoUrl?: string;
};

type UserType = {
    id: string;
    firstName: string;
    lastName?: string;
    username: string;
    email: string;
    phone?: string;
    projects: UserProject[];
    backgroundCover?: string;
    displayPicture?: string;
    links: string[];
};

export default function Pages() {
    const { user_id } = useParams();
    const projects = [1, 2, 3, 4, 5];

    return (
        <div className="border h-full p-1">
            <div className="flex flex-col">
                <div className="flex flex-col mb-4">
                    <div className="h-36 relative">
                        <div className="h-32 bg-amber-400"></div>
                        <div className="flex justify-center items-center text-2xl text-zinc-800 rounded-full size-24 bg-zinc-100 ring-zinc-700 ring-2 p-0 absolute -bottom-4 left-2">
                            A
                        </div>
                    </div>
                    <div className="flex flex-col mx-4 mt-6 mb-2">
                        <span className="text-3xl font-bold">Ajeet T S</span>
                        <span className="text-lg">SDE 2 @ Citi | NIT Trichy'23</span>
                    </div>
                </div>
                <hr />
                <div className="mx-4 mt-4">
                    <div className="text-xl mb-4">Projects</div>
                    <div className="grid lg:grid-cols-3 gap-x-1 gap-y-3">
                        {projects.map((prj) => (
                            <ProjectCard key={prj} />
                        ))}
                        <AddProjectCard />
                    </div>
                </div>
            </div>
        </div>
    );
}
