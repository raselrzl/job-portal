import { EmptyState } from "@/components/general/EmptyState";
import React from "react";

import { JobCard } from "@/components/general/JobCard";

import { prisma } from "@/app/utils/db";
import { requireUser } from "../../utils/requireUser";

async function getFavorites(userId: string) {
  const data = await prisma.savedJobPost.findMany({
    where: {
      userId: userId,
    },
    select: {
      job: {
        select: {
          id: true,
          jobTitle: true,
          salaryFrom: true,
          salaryTo: true,
          employmentType: true,
          location: true,
          createdAt: true,
          Company: {
            select: {
              name: true,
              logo: true,
              location: true,
              about: true,
            },
          },
        },
      },
    },
  });

  return data;
}

const FavoritesPage = async () => {
  const session = await requireUser();
  const favorites = await getFavorites(session.id as string);

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        description="You don't have any favorites yet."
        buttonText="Find a job"
        href="/"
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden py-8">
      <div className="grid grid-cols-1 gap-4">
        {favorites.map((favorite) => (
          <JobCard job={favorite.job} key={favorite.job.id} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
