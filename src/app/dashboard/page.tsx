import { DashboardClient } from "@/components/finzen/dashboard-client";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-headline">
          Welcome back, User!
        </h1>
        <p className="text-muted-foreground">
          Here is your financial overview. Keep up the great work!
        </p>
      </div>
      <DashboardClient />
    </div>
  );
}
