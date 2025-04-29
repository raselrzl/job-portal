"use server"

import { z } from "zod";
import { requireUser } from "./utils/requireUser"
import { companySchema } from "./utils/zodSchemas";
import { redirect } from "next/navigation";
import { prisma } from "./utils/db";

export async function createCompany(data:z.infer<typeof companySchema>){
    const user=await requireUser();
    const validateData=companySchema.parse(data);
    console.log(validateData);
    await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          onboardingCompleted: true,
          userType: "COMPANY",
          Company: {
            create: {
              /* about:validateData.about,
              location:validateData.location,
              logo: validateData.logo,
              name: validateData.name,
              website:validateData.website,
              xAccount: validateData.xAccount, */
              ...validateData,
            },
          },
        },
      });
    
      return redirect("/");
    }
    