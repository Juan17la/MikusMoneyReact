import type { ReactNode } from "react";
import { Navbar } from "../components/Navbar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <Navbar />
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-4 gap-6 bg-linear-to-b from-white-2 to-black-8 rounded-2xl shadow-outer border border-accent-alpha p-4 auto-rows-max">
        {children}
      </div>
    </div>
  );
}
