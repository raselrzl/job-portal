"use server"

import { z } from "zod";
import { requireUser } from "./utils/requireUser"
import { companySchema, jobSeekerSchema } from "./utils/zodSchemas";
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
      

