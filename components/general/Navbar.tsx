import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { auth, signOut } from "@/app/utils/auth";
import { UserDropdown } from "./UserDropdown";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { BookPlus, Menu, Search, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default async function Navbar() {
  const session = await auth();
  return (
    <nav className=" flex items-center justify-between py-4">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/job2.png" height={20} width={40} alt="logo image" />
        <h1 className="text-2xl font-bold">
          <span className="text-primary">Lynk</span>
        </h1>
      </Link>
      {/*  desktop navigation */}

      <div className="hidden md:flex items-center gap-5">
        <ThemeToggle />
        <Link
          href="/post-job"
          className={buttonVariants({ variant: "default", size: "sm" })}
        >
          Post job
        </Link>
        {session?.user ? (
          <UserDropdown
            email={session.user.email as string}
            name={session.user.name as string}
            image={session.user.image as string}
          />
        ) : (
          <Link
            href="/login"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center gap-4">
        <ThemeToggle />
        {session?.user ? (
          <UserDropdown
            email={session.user.email as string}
            name={session.user.name as string}
            image={session.user.image as string}
          />
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="mr-2">
                <Menu className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel className="">
                {/* Job<span className="text-primary">Lynk</span> */}
                <Link href="/" className="flex items-center gap-2">
                  <Image
                    src="/job2.png"
                    height={15}
                    width={25}
                    alt="logo image"
                  />
                  <h1 className="text-md font-bold">
                    <span className="text-primary">Lynk</span>
                  </h1>
                </Link>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/" className=""><Search size={16} strokeWidth={2} className="opacity-60"/>
                <span>Find a Job</span></Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/post-job"><BookPlus size={16} strokeWidth={2} className="opacity-60"/>
                <span>Post a Job</span></Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/login"><User size={16} strokeWidth={2} className="opacity-60"/>
                <span>Login</span></Link>
                
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
}
