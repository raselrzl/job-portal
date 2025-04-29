"use client"
import LoginForm from "@/components/forms/LoginForm";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import UserTypeSelection from "./UserTypeForm";
import CompanyForm from "./CompanyForm";
import JobSeekerForm from "./JobSeekerForm";

type UserSelectionType="company"|"jobSeeker"| null;

export default function OnboardingForm() {
    const [step, setStep]=useState(1)
    const [userType, setUserType]=useState<UserSelectionType>(null)

    function handleUserTypeSelection(type:UserSelectionType){
            setUserType(type);
            setStep(2);
    }
    function renderStep(){
        switch(step){
            case 1:
                return <UserTypeSelection onSelect={handleUserTypeSelection}/>
            case 2:
                return userType === "company"? (<CompanyForm />):(<JobSeekerForm />);
            default:
                return null;
        }
    }
  return (
    <>
    <div className="flex items-center justify-center gap-2 mb-10">
        <Image 
            src="/job2.png"
            alt="logo image"
            width={50}
            height={50}
        />
        <h1 className="text-4xl font-bold text-primary">Lynk</h1>
    </div>
    <Card className="max-w-lg w-full">
        <CardContent className="p-6">
            {renderStep()}
        </CardContent>
    </Card>
    </>
  );
}
