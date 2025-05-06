'use client';

import Link from 'next/link';

const CareerAdvice = () => {
  return (
    <section className="bg-background text-foreground py-12 px-4 sm:px-8 lg:px-16 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Career Advice from Jobfynd</h2>

      <div className="space-y-6 text-base">
        <p>
          At <span className="font-semibold text-primary">Jobfynd</span>, we believe success starts with preparation.
          Whether you're a recent graduate or an experienced professional, taking the right steps can help you stand out.
        </p>

        <ul className="list-disc list-inside space-y-2">
          <li><strong>Learn job-related skills:</strong> Continuously improve your technical and soft skills to match evolving industry demands.</li>
          <li><strong>Understand job requirements:</strong> Read job listings carefully, identify common requirements, and align your learning goals with them.</li>
          <li><strong>Tailor your applications:</strong> Customize your resume and cover letter to match the specific company and role.</li>
          <li><strong>Research the company:</strong> Know their mission, culture, and recent work. This shows initiative and helps you during interviews.</li>
          <li><strong>Reach out directly:</strong> Don’t hesitate to connect with companies via email or LinkedIn. Sometimes opportunities come from initiative.</li>
        </ul>

        <p>
          Your journey might not be linear — but with consistent effort and smart choices, you're always moving forward.
        </p>

        <p className="italic text-muted-foreground">
          “Grow your skills. Know your worth. Find the right fit.” — Jobfynd
        </p>
      </div>

      <div className="mt-8 text-center">
        <Link href="/jobs">
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md text-base font-medium hover:bg-primary/90 transition">
            Explore Jobs on Jobfynd
          </button>
        </Link>
      </div>
    </section>
  );
};

export default CareerAdvice;
