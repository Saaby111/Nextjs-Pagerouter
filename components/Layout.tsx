import { ReactNode } from "react";
import Navbar from "./NavBar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      <div className="container mt-4">{children}</div>
    </div>
  );
}
