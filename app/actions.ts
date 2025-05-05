"use server";

import { z } from "zod";
import { requireUser } from "./utils/requireUser";
import { companySchema, jobSchema, jobSeekerSchema } from "./utils/zodSchemas";
import { redirect } from "next/navigation";
import { prisma } from "./utils/db";
import arcjet, { detectBot, shield } from "./utils/arcjet";
import { request } from "@arcjet/next";
import { stripe } from "./utils/stripe";
import { jobListingDurationPricing } from "./utils/pricingTiers";
import { inngest } from "./utils/inngest/client";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";
import { getPrismaClient } from "@/lib/generated/prisma/runtime/library";

const aj = arcjet
  .withRule(
    shield({
      mode: "LIVE",
    })
  )
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    })
  );

export async function createCompany(data: z.infer<typeof companySchema>) {
  const user = await requireUser();

  const req = await request();
  const dicision = await aj.protect(req);
  if (dicision.isDenied()) {
    throw new Error("Forbidden");
  }

  const validateData = companySchema.parse(data);
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

export async function createJobSeeker(data: z.infer<typeof jobSeekerSchema>) {
  const user = await requireUser();

  const req = await request();
  const dicision = await aj.protect(req);
  if (dicision.isDenied()) {
    throw new Error("Forbidden");
  }

  const validateData = jobSeekerSchema.parse(data);
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

export async function createJob(data: z.infer<typeof jobSchema>) {
  const user = await requireUser();

  const req = await request();
  const dicision = await aj.protect(req);
  if (dicision.isDenied()) {
    throw new Error("Forbidden");
  }

  const validateData = jobSchema.parse(data);

  console.log(validateData);

  const company = await prisma.company.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      user: {
        select: {
          stripeCustomerId: true,
        },
      },
    },
  });

  if (!company?.id) {
    return redirect("/");
  }

  let stripeCustomerId = company.user.stripeCustomerId;

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user.email as string,
      name: user.name || undefined,
    });
    stripeCustomerId = customer.id;
    //update user with stripe customer id
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        stripeCustomerId: customer.id,
      },
    });
  }

  const jobPost = await prisma.jobPost.create({
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

    // Trigger the job expiration function
    await inngest.send({
      name: "job/created",
      data: {
        jobId: jobPost.id,
        expirationDays: validateData.ListingDuration,
      },
    });

  const pricingTier = jobListingDurationPricing.find(
    (tier) => tier.days === validateData.ListingDuration
  );
  if (!pricingTier) {
    throw new Error("Invalid listing duration selected");
  }

  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    line_items: [
      {
        price_data: {
          product_data: {
            name: `Job Posting For- ${pricingTier.days} Days`,
            description: pricingTier.description,
            images: [
              "https://dnzdmhv0py.ufs.sh/f/TNQbFWpxGpMNRjZ8Z5qW2qZ9w8NnpybE4HxvF0UBYgmPra1k",
            ],
          },
          currency: "USD",
          unit_amount: pricingTier.price * 100, // Convert to cents for Stripe
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    metadata: {
      jobId: jobPost.id,
    },
    success_url: `${process.env.NEXT_PUBLIC_URL}/payment/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment/cancel`,
  });

  return redirect(session.url as string);
}


export async function saveJobPost(jobId: string) {
  const user = await requireUser();


  const req = await request();
  const dicision = await aj.protect(req);
  if (dicision.isDenied()) {
    throw new Error("Forbidden");
  }

  await prisma.savedJobPost.create({
    data: {
      jobId: jobId,
      userId: user.id as string,
    },
  });

  revalidatePath(`/job/${jobId}`);
}

export async function unsaveJobPost(savedJobPostId: string) {
  const user = await requireUser();

  const req = await request();
  const dicision = await aj.protect(req);
  if (dicision.isDenied()) {
    throw new Error("Forbidden");
  }

  const data = await prisma.savedJobPost.delete({
    where: {
      id: savedJobPostId,
      userId: user.id as string,
    },
    select: {
      jobId: true,
    },
  });

  revalidatePath(`/job/${data.jobId}`);
}


export async function updateJobPost(
  data: z.infer<typeof jobSchema>,
  jobId: string
) {
  const user = await requireUser();

  const req = await request();
  const dicision = await aj.protect(req);
  if (dicision.isDenied()) {
    throw new Error("Forbidden");
  }

  const validatedData = jobSchema.parse(data);

  await prisma.jobPost.update({
    where: {
      id: jobId,
      Company: {
        userId: user.id,
      },
    },
    data: {
      jobDescription: validatedData.jobDescription,
      jobTitle: validatedData.jobTitle,
      employmentType: validatedData.employmentType,
      location: validatedData.location,
      salaryFrom: validatedData.salaryFrom,
      salaryTo: validatedData.salaryTo,
      ListingDuration: validatedData.ListingDuration,
      benefits: validatedData.benefits,
    },
  });

  return redirect("/my-jobs");
}

export async function deleteJobPost(jobId: string) {
  const user = await requireUser();
 

  const req = await request();
  const dicision = await aj.protect(req);
  if (dicision.isDenied()) {
    throw new Error("Forbidden");
  }
  await prisma.jobPost.delete({
    where: {
      id: jobId,
      Company: {
        userId: user.id,
      },
    },
  });
  await inngest.send({
    name:"job/cancel.expiration",
    data:{jobId:jobId}
  })
  return redirect("/my-jobs");
}

