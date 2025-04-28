import Navbar from "@/components/general/Navbar";
import { ReactNode } from "react";

export default function MainLayout({Children}:{Children:ReactNode}) {
    return (
     <div className="mx-w-7xl mx-auto md:px-6 lg:px-8">
        <Navbar />
        {Children}
     </div>
    );
  }
  