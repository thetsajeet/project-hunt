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
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <div className="max-w-7xl mx-auto">{children}</div>
      </body>
    </html>
  );
}
