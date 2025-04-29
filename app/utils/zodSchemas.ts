import { z } from "zod";

export const companySchema=z.object({
    name:z.string().min(2, "Company name must be 2 charecter"),
    location:z.string().min(1, "location must be defined"),
    about:z.string().min(10, "Please add some information about the company"),
    logo:z.string().min(1, "Please upload a logo"),
    website: z.string().regex(
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
        "Please enter a valid domain or URL (e.g. example.com or https://example.com)"
      ),
    xAccount:z.string().optional()
})

export const jobSeekerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  about: z.string().min(10, "Please provide more information about yourself"),
  resume: z.string().min(1, "Please upload a resume"),
});