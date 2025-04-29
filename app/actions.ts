"use server"

import { z } from "zod";
import { requireUser } from "./utils/requireUser"
import { companySchema, jobSeekerSchema } from "./utils/zodSchemas";
import { redirect } from "next/navigation";
import { prisma } from "./utils/db";

export async function createCompany(data:z.infer<typeof companySchema>){
    const user=await requireUser();
    const validateData=companySchema.parse(data);
    console.log(validateData);
    await prisma.user.update({
        where: {
          id: user.id as string,
        },
        data: {
          onboardingCompleted: true,
          userType: "COMPANY",
          Company: {
            create: {
              ...validateData,
            },
          },
        },
      });
    
      return redirect("/");
    }
    

    export async function createJobSeeker(data:z.infer<typeof jobSeekerSchema>){
      const user=await requireUser();
      const validateData=jobSeekerSchema.parse(data);
      console.log(validateData);
      await prisma.user.update({
          where: {
            id: user.id as string,
          },
          data: {
            onboardingCompleted: true,
            userType: "JOB_SEEKER",
            JobSeeker: {
              create: {
                ...validateData,
              },
            },
          },
        });
      
        return redirect("/");
      }
      