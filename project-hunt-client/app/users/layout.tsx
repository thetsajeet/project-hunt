import { ReactNode } from "react";

export default function UsersLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <div>{children}</div>;
}
