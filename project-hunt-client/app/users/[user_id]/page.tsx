"use client";

import ProjectCard from "@/components/project-card";
import AddProjectCard from "@/components/add-project-card";
import { notFound, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export type UserProject = {
    project_id: string;
    title: string;
    logoUrl?: string;
    shortDescription: string;
};

export type UserType = {
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
    bioHeader?: string;
};

export default function Pages() {
    const { user_id } = useParams();
    const { data, status, error } = useQuery({
        queryKey: ["users", user_id],
        queryFn: async (): Promise<UserType> => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND}/users/${user_id}`,
            );
            if (!response.ok)
                throw new Error("something went wrong: " + response.statusText);
            return await response.json();
        },
    });

    if (status === "error") return notFound();

    if (status === "pending") return <div>loading</div>;

    return (
        <div className="border h-full p-1">
            <div className="flex flex-col">
                <div className="flex flex-col mb-4">
                    <div className="h-36 relative">
                        <div className="h-32 bg-amber-400"></div>
                        <div className="flex justify-center items-center text-2xl text-zinc-800 rounded-full size-24 bg-zinc-100 ring-zinc-700 ring-2 p-0 absolute -bottom-4 left-2">
                            {data.firstName.at(0)?.toUpperCase()}
                        </div>
                    </div>
                    <div className="flex flex-col mx-4 mt-6 mb-2">
                        <span className="text-3xl font-bold">
                            {data.firstName}, {data.lastName}
                        </span>
                        <span className="text-lg">{data.bioHeader}</span>
                    </div>
                </div>
                <hr />
                <div className="mx-4 mt-4">
                    <div className="text-xl mb-4">Projects</div>
                    <div className="grid lg:grid-cols-3 gap-x-1 gap-y-3">
                        {data.projects.map((proj: UserProject) => (
                            <ProjectCard key={proj.project_id} proj={proj} />
                        ))}
                        <AddProjectCard />
                    </div>
                </div>
            </div>
        </div>
    );
}
