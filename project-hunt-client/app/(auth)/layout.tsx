import { ReactNode } from "react";
import "../globals.css";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
