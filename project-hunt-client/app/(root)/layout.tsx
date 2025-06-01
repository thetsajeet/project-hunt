import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Project Hunt",
  description: "Find and share latest projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="max-w-7xl mx-auto">{children}</div>;
}
