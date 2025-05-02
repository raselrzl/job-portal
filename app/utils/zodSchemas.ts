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

export const jobSchema = z.object({
  jobTitle: z.string().min(2, "Job title must be at least 2 characters"),
  employmentType: z.string().min(1, "Please select an employment type"),
  location: z.string().min(1, "Please select a location"),
  salaryFrom: z.number().min(1, "Salary from is required"),
  salaryTo: z.number().min(1, "Salary to is required"),
  jobDescription: z.string().min(1, "Job description is required"),
  benefits: z.array(z.string()).min(1, "Please select at least one benefit"),
  ListingDuration: z.number().min(1, "Listing duration is required"),

  companyName: z.string().min(1, "Company name is required"),
  companyAbout: z.string().min(10, "Company name is required"),
  companyLocation: z.string().min(1, "Company location is required"),
  companyLogo: z.string().min(1, "Company logo is required"),
  companyWebsite: z.string().min(1, "Company website is required"),
  companyXAccount: z.string().optional(),
});