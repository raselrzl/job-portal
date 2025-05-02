/* eslint-disable react/no-unescaped-entities */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import applelogo from "@/public/applelogo.jpg";
import spacex from "@/public/spacex-logo.jpg";
import tesla from "@/public/tesla.jpeg";
import volbo from "@/public/volvo.jpg";
import samsung from "@/public/samsung.jpeg";
import Image from "next/image";
import { CreateJobForm } from "@/components/forms/CreateJobForm";  
import { prisma } from "@/app/utils/db";
import { redirect } from "next/navigation";
import { requireUser } from "@/app/utils/requireUser";

const companies = [
  { id: 0, name: "Apple", logo: applelogo },
  { id: 1, name: "Spacex", logo: spacex },
  { id: 2, name: "Tesla", logo: tesla },
  { id: 3, name: "Volbo", logo: volbo },
  { id: 4, name: "Samsung", logo: samsung },
];

const testimonials = [
  {
    quote:
      "We found our ideal candidate within 48 hours of posting. The quality of applicants was exceptional!",
    author: "Alben Chen",
    company: "TechCorp",
  },
  {
    quote:
      "The platform made hiring remote talent incredibly simple. Highly recommended!",
    author: "Mark Johnson",
    company: "StartupX",
  },
  {
    quote:
      "We've consistently found high-quality candidates here. It's our go-to platform for all our hiring needs.",
    author: "Emily Rodriguez",
    company: "InnovateNow",
  },
];

const stats = [
  { value: "10k+", label: "Monthly active job seekers" },
  { value: "48h", label: "Average time to hire" },
  { value: "95%", label: "Employer satisfaction rate" },
  { value: "500+", label: "Companies hiring monthly" },
];

  async function getCompany(userId: string) {
    const data = await prisma.company.findUnique({
      where: {
        userId: userId,
      },
      select: {
        name: true,
        location: true,
        about: true,
        logo: true,
        xAccount: true,
        website: true,
      },
    });
  
    if (!data) {
      return redirect("/");
    }
    return data;
  }

const PostJobPage = async () => {
  const session = await requireUser();
  const data = await getCompany(session.id as string);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5 p-4">
        <CreateJobForm
          companyAbout={data.about}
          companyLocation={data.location}
          companyLogo={data.logo}
          companyName={data.name}
          companyXAccount={data.xAccount}
          companyWebsite={data.website}
        />
      

      <div className="col-span-1">
        <Card className="lg:sticky lg:top-4">
          <CardHeader>
          <CardTitle className="text-xl">
            Powering the Teams of Tomorrow
            </CardTitle>
            <CardDescription>
            Discover why innovative companies choose us to grow faster.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Company Logos */}
            <div className="grid grid-cols-4 gap-4">
              {companies.map((company) => (
                <div
                  key={company.id}
                  className="flex items-center justify-center"
                >
                  <Image
                    src={company.logo}
                    alt={company.name}
                    height={80}
                    width={80}
                    className="h-15 w-25 object-cover opacity-75 transition-opacity hover:opacity-100 rounded-lg"
                  />{" "}
                </div>
              ))}
            </div>

            {/* Testimonials */}
            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <blockquote
                  key={index}
                  className="border-l-2 border-primary pl-4"
                >
                  <p className="text-sm italic text-muted-foreground">
                    "{testimonial.quote}"
                  </p>
                  <footer className="mt-2 text-sm font-medium">
                    - {testimonial.author}, {testimonial.company}
                  </footer>
                </blockquote>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="rounded-lg bg-muted p-4">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostJobPage;
