import { z } from "zod";

export const companySchema=z.object({
    name:z.string().min(2, "Company name must be 2 charecter"),
    location:z.string().min(1, "location must be defined"),
    about:z.string().min(10, "Please add some information about the company"),
    logo:z.string().min(1, "Please upload a logo"),
    website:z.string().url("Please enter a valid url"),
    xAccount:z.string().optional()
})