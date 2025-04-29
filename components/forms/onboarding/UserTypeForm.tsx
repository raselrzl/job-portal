import LoginForm from "@/components/forms/LoginForm";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type UserSelectionType = "company" | "jobSeeker";
interface UserTypeSelectionProps {
  onSelect: (type: UserSelectionType) => void;
}

import { Button } from "@/components/ui/button";
import { Building2, UserRound } from "lucide-react";

export default function UserTypeSelection({
  onSelect
}: UserTypeSelectionProps) {
  /*   const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserSelectionType>(null);

  function handleUserTypeSelection(type: UserSelectionType) {
    setUserType(type);
    setStep(2);
  }
  function renderStep() {
    switch (step) {
      case 1:
        return <p>User type Selection Form</p>;
      case 2:
        return userType === "company" ? (
          <p>User is an Company</p>
        ) : (
          <p>User is a job jobSeeker</p>
        );
      default:
        return null;
    }
  } */
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Welcome, Lets get started</h2>
        <p className="text-gray-400">Chose how you like to use Joblynk</p>
      </div>
      <div className="grid gap-4">
        <Button
          onClick={()=>onSelect("company")}
          variant={"outline"}
          className="w-full h-auto p-6 items-center gap-4 border-2 transition-all duration-200 hover:border-primary hover:bg-primary/5 cursor-pointer"
        >
          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Building2 className="size-6 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold">Company / Organization</h3>
            <p className="text-gray-500">Post a jobs</p>
          </div>
        </Button>
        <Button
          onClick={()=>onSelect("jobSeeker")}
          variant={"outline"}
          className="w-full h-auto p-6 items-center gap-4 border-2 transition-all duration-200 hover:border-primary hover:bg-primary/5 cursor-pointer"
        >
          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
            <UserRound className="size-6 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold">Job Seeker</h3>
            <p className="text-gray-500">Find your dream job</p>
          </div>
        </Button>
      </div>
    </div>
  );
}
