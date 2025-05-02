"use server"

import { z } from "zod";
import { requireUser } from "./utils/requireUser"
import { companySchema, jobSchema, jobSeekerSchema } from "./utils/zodSchemas";
import { redirect } from "next/navigation";
import { prisma } from "./utils/db";
import arcjet, { detectBot, shield } from "./utils/arcjet";
import { request } from "@arcjet/next";



const aj=arcjet.withRule(
  shield({
    mode:"LIVE",
  })
).withRule(
  detectBot({
    mode:"LIVE",
    allow:[],
  })
)



export async function createCompany(data:z.infer<typeof companySchema>){
    const user=await requireUser();

    const req=await request();
    const dicision =await aj.protect(req);
    if(dicision.isDenied()){
        throw new Error("Forbidden")
    }

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

      const req=await request();
      const dicision =await aj.protect(req);
      if(dicision.isDenied()){
          throw new Error("Forbidden")
      }

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
      
export async function createJob(data:z.infer<typeof jobSchema>){
  const user=await requireUser();

  const req=await request();
  const dicision =await aj.protect(req);
  if(dicision.isDenied()){
      throw new Error("Forbidden")
  }

  const validateData=jobSchema.parse(data);

  console.log(validateData);

  const company = await prisma.company.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
    },
  });

  if (!company?.id) {
    return redirect("/");
  }
  const jobPost=await prisma.jobPost.create({
      data: {
      companyId: company.id,
      jobDescription: validateData.jobDescription,
      jobTitle: validateData.jobTitle,
      employmentType: validateData.employmentType,
      location: validateData.location,
      salaryFrom: validateData.salaryFrom,
      salaryTo: validateData.salaryTo,
      ListingDuration: validateData.ListingDuration,
      benefits: validateData.benefits,

      },
    });
  
    return redirect("/");

}
