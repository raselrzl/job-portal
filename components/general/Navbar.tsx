import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  return (
   <nav className=" flex items-center justify-between py-5">
     <Link href="/" className="flex items-center gap-2">
        <Image
            src="/job2.png"
            height={20}
            width={40}
            alt="logo image"
        />       
            <h1 className="text-2xl font-bold"><span className="text-primary">Lynk</span></h1>
        </Link>
       <div className="flex items-center gap-4">
        <ThemeToggle />
        <Button>Login</Button>
       </div>
   </nav>
  );
}
