'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const companies = [
  {
    name: "TechNova Inc.",
    description: "Innovating cloud solutions for modern businesses.",
  },
  {
    name: "HealthBridge",
    description: "Transforming digital health with AI.",
  },
  {
    name: "GreenLeaf Energy",
    description: "Powering the world sustainably.",
  },
  {
    name: "Finverse",
    description: "Smart financial tools for everyone.",
  },
  {
    name: "EduSpark",
    description: "Next-gen learning for the curious mind.",
  },
  {
    name: "Jobfynd Talent",
    description: "Connecting top talent with growing teams.",
  },
];

export default function CompanyList() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-foreground text-center">Top Companies Hiring Now</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {companies.map((company, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow bg-background text-foreground">
            <CardHeader>
              <CardTitle>{company.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{company.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
