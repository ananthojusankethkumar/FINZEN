
"use client";

import { useEffect, useState, useTransition } from "react";
import { getCreditScoreAdvice } from "@/lib/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Gauge, Sparkles, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function CreditScorePage() {
  const [advice, setAdvice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // These would typically come from an API
  const [creditScore, setCreditScore] = useState(780);
  const [scoreCategory, setScoreCategory] = useState("Excellent");

  const scoreColor =
    creditScore >= 750
      ? "text-green-500"
      : creditScore >= 650
      ? "text-yellow-500"
      : "text-red-500";

  useEffect(() => {
    startTransition(async () => {
      const mockInput = {
        creditScore: creditScore,
        paymentHistory: "100% on-time payments for the last 36 months. No defaults or late payments recorded.",
        creditUtilization: "Currently at 25%. A mix of 2 credit cards and 1 home loan. Oldest credit line is 7 years.",
      };
      const result = await getCreditScoreAdvice(mockInput);
      if (result.success) {
        setAdvice(result.data.advice);
      } else {
        setError(result.error);
      }
    });
  }, [creditScore]);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Gauge className="h-6 w-6" /> Credit Score
          </CardTitle>
          <CardDescription>Your current CIBIL score.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="relative h-40 w-40">
                <svg className="h-full w-full" viewBox="0 0 36 36">
                    <path
                        className="text-secondary"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                    />
                    <path
                        className="text-primary"
                        strokeDasharray={`${((creditScore - 300) / 600) * 100}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <span className="text-4xl font-bold">{creditScore}</span>
                     <span className="text-sm font-medium text-muted-foreground">/ 900</span>
                </div>
            </div>
            <div className="text-lg font-semibold">
                Category: <span className={scoreColor}>{scoreCategory}</span>
            </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-accent" /> AI-Powered Score Maximizer
          </CardTitle>
          <CardDescription>
            Personalized advice to help you boost your score even further.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isPending ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <p className="text-destructive">{error}</p>
          ) : (
            <div className="prose prose-sm dark:prose-invert text-muted-foreground whitespace-pre-wrap rounded-md border p-4">
              {advice}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
