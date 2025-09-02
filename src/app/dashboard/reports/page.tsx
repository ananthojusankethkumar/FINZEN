"use client";

import { useState, useTransition } from "react";
import { getFinancialReport } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Loader2, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ReportsPage() {
  const [report, setReport] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleGenerateReport = () => {
    startTransition(async () => {
      setError(null);
      setReport(null);
      const mockInput = {
        userDetails: "Age 28, Income: 18LPA, Goal: House down payment in 5 years.",
        accountDetails: "Savings Account: ₹2,50,000, 3 UPI transactions daily average.",
        investmentDetails: "Mutual Funds: ₹8,00,000 (20% returns YTD), Stocks: ₹3,00,000.",
        spendingPatterns: "High spending on dining out and gadgets. Low on travel.",
        creditScore: "780",
      };
      const result = await getFinancialReport(mockInput);
      if (result.success) {
        setReport(result.data.reportContent);
      } else {
        setError(result.error);
      }
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <FileText className="h-6 w-6" /> Personalized Financial Report
          </CardTitle>
          <CardDescription>
            Generate a comprehensive, on-demand "State of Your Finances" report.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleGenerateReport} disabled={isPending}>
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Generate Report
          </Button>
        </CardContent>
      </Card>

      {isPending && (
         <Card>
            <CardHeader>
                <Skeleton className="h-6 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
         </Card>
      )}

      {error && (
        <Card className="border-destructive">
            <CardHeader>
                <CardTitle className="text-destructive">Error</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{error}</p>
            </CardContent>
        </Card>
      )}
      
      {report && (
         <Card>
            <CardHeader>
                <CardTitle>Your Financial Snapshot</CardTitle>
            </CardHeader>
            <CardContent>
                 <div className="prose prose-sm dark:prose-invert text-muted-foreground whitespace-pre-wrap">
                    {report}
                </div>
            </CardContent>
         </Card>
      )}

    </div>
  );
}
