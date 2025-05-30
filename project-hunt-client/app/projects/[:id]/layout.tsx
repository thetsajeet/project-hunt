import { ReactNode } from "react";
import "@/app/globals.css";

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`m-4 antialiased`}>
        <div className="max-w-7xl mx-auto">{children}</div>
      </body>
    </html>
  );
}
