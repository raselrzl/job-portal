import LoginForm from "@/components/forms/LoginForm";
import OnboardingForm from "@/components/forms/onboarding/OnboardingForm";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "../utils/db";
import { requireUser } from "../utils/requireUser";

async function checkIfOnboardingCompleted(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      onboardingCompleted: true,
    },
  });

  if (user?.onboardingCompleted === true) {
    redirect("/");
  }
}

export default async function OnboardingPage() {
  const session = await requireUser();

  await checkIfOnboardingCompleted(session.id as string);
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center py-10">
        <OnboardingForm />
    </div>
  );
}
