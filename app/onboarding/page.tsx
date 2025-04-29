import LoginForm from "@/components/forms/LoginForm";
import OnboardingForm from "@/components/forms/onboarding/OnboardingForm";
import Image from "next/image";
import Link from "next/link";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center py-10">
        <OnboardingForm />
    </div>
  );
}
