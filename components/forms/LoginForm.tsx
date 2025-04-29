import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import GeneralSubmitButton from "../general/submitButtons";
import { auth, signIn } from "@/app/utils/auth";
import { redirect } from "next/navigation";

export default async function LoginForm() {
  const session = await auth();
  if (session?.user) {
    return redirect("/");
  }
  return (
    <div className=" flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center ">
          <CardTitle className="text-xl">Welcome Back</CardTitle>
          <CardDescription>Login using Google</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {/*  <form>
              <Button className="w-full" variant="outline">
                <Image
                  src="/github-mark.png"
                  height={20}
                  width={20}
                  alt="logo image"
                />
                Login with github
              </Button>
            </form> */}

            <form
              action={async () => {
                "use server";
                await signIn("google", {
                  redirectTo: "/onboarding",
                });
              }}
              className="cursor-pointer"
            >
              <GeneralSubmitButton
                width="w-full"
                variant="outline"
                text="Login with Google"
                icon={
                  <Image
                    src="/google_icon.svg"
                    height={20}
                    width={20}
                    alt="logo image"
                  />
                }
              />
            </form>
          </div>
        </CardContent>
        <div className="text-center text-xs text-gray-500 text-balance">
          By clicking continue, you aggree to our terms and service and privacy
          policy.
        </div>
      </Card>
    </div>
  );
}
