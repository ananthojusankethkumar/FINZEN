import { Suspense } from "react";
import { DashboardClient } from "@/components/finzen/dashboard-client";
import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@/lib/firebase";

function DashboardLoading() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold tracking-tight font-headline">
          Welcome back!
        </h1>
        <p className="text-muted-foreground">
          Here is your financial overview. Keep up the great work!
        </p>
      </div>
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-5 grid gap-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <Skeleton className="h-[109px]" />
            <Skeleton className="h-[109px]" />
            <Skeleton className="h-[109px]" />
          </div>
          <Skeleton className="h-[374px]" />
        </div>
        <div className="lg:col-span-2 grid gap-4">
          <Skeleton className="h-[134px]" />
          <Skeleton className="h-[158px]" />
        </div>
      </div>
    </div>
  );
}


export default function DashboardPage() {
    const user = auth.currentUser;
    const userDisplayName = user?.displayName?.split(' ')[0] || "User";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-headline">
          Welcome back, {userDisplayName}!
        </h1>
        <p className="text-muted-foreground">
          Here is your financial overview. Keep up the great work!
        </p>
      </div>
      <Suspense fallback={<DashboardLoading />}>
        <DashboardClient />
      </Suspense>
    </div>
  );
}
