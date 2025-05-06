import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobListingsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-4">
      {[...Array(10)].map((_, index) => (
        <Card
          key={index}
          className="p-4 sm:p-6"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <Skeleton className="h-14 w-14 rounded" />
            <div className="space-y-3 flex-1 w-full">
              <Skeleton className="h-5 w-full sm:w-[300px]" />
              <Skeleton className="h-4 w-2/3 sm:w-[200px]" />
              <div className="flex flex-wrap gap-2 mt-2">
                <Skeleton className="h-4 w-1/3 min-w-[100px]" />
                <Skeleton className="h-4 w-1/3 min-w-[100px]" />
                <Skeleton className="h-4 w-1/3 min-w-[100px]" />
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mt-4">
                <Skeleton className="h-4 w-full sm:w-[150px]" />
                <Skeleton className="h-8 w-full sm:w-[100px]" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
