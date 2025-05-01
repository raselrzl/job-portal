import { ChevronDown, Heart, Layers2, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { signOut } from "@/app/utils/auth";

interface iAppProps{
    email: string;
    name:string;
    image:string;
}
export function UserDropdown({email, name, image}:iAppProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-auto p-0 hover:bg-transparent cursor-pointer"
        >
          {/* <Avatar>
            <AvatarImage src="" alt="Profile Image" />
            <AvatarFallback className="font-bold">{name.charAt(0)}</AvatarFallback>
          </Avatar> */}
          <p className="font-bold py-1.5">{name}</p>
          <ChevronDown size={16} strokeWidth={2} className="" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuLabel className="flex flex-col">
          <span className="text-sm font-medium text-foreground">{name}</span>
          <span className="text-xs font-medium text-foreground">{email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuGroup>
            <DropdownMenuItem asChild>
                <Link href="/favorites">
                    <Heart size={16} strokeWidth={2} className="opacity-60"/>
                    <span>Saved</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="/my-jobs">
                    <Layers2 size={16} strokeWidth={2} className="opacity-60"/>
                    <span>My job List</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem asChild className="w-full">
                <form action={
                    async()=>{
                        "use server";
                        await signOut({
                            redirectTo:"/"
                        })
                    }
                }>
                    <button className="flex w-full items-center justify-center gap-2">
                        <LogOut size={16} strokeWidth={2} className="opacity-60"/>
                        <span>Logout</span>
                    </button>
                </form>
            </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
