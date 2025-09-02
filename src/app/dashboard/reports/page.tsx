
"use client";

import { useState, useTransition, useActionState } from "react";
import { getFinancialReport } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Loader2, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useFormStatus } from "react-dom";

const initialState = {
  data: null,
  errors: null,
  error: null,
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Sparkles className="mr-2 h-4 w-4" />
            )}
            Generate Report
        </Button>
    )
}

export default function ReportsPage() {
  const [state, formAction] = useActionState(getFinancialReport, initialState);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <FileText className="h-6 w-6" /> Personalized Financial Report
          </CardTitle>
          <CardDescription>
            Fill in your details to generate a comprehensive, on-demand "State of Your Finances" report.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
            <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="userDetails">User Details</Label>
                    <Input id="userDetails" name="userDetails" placeholder="e.g., Age 28, Income: 18LPA, Goal: House down payment" required />
                    {state?.errors?.userDetails && <p className="text-sm text-destructive">{state.errors.userDetails[0]}</p>}
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="accountDetails">Account Details</Label>
                    <Textarea id="accountDetails" name="accountDetails" placeholder="e.g., Savings Account: ₹2,50,000, 3 UPI transactions daily average." required />
                    {state?.errors?.accountDetails && <p className="text-sm text-destructive">{state.errors.accountDetails[0]}</p>}
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="investmentDetails">Investment Details</Label>
                    <Textarea id="investmentDetails" name="investmentDetails" placeholder="e.g., Mutual Funds: ₹8,00,000 (20% returns YTD), Stocks: ₹3,00,000." required />
                     {state?.errors?.investmentDetails && <p className="text-sm text-destructive">{state.errors.investmentDetails[0]}</p>}
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="spendingPatterns">Spending Patterns</Label>
                    <Textarea id="spendingPatterns" name="spendingPatterns" placeholder="e.g., High spending on dining out and gadgets. Low on travel." required />
                    {state?.errors?.spendingPatterns && <p className="text-sm text-destructive">{state.errors.spendingPatterns[0]}</p>}
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="creditScore">Credit Score</Label>
                    <Input id="creditScore" name="creditScore" placeholder="e.g., 780" required />
                    {state?.errors?.creditScore && <p className="text-sm text-destructive">{state.errors.creditScore[0]}</p>}
                </div>
            </CardContent>
            <CardFooter>
                <SubmitButton />
            </CardFooter>
        </form>
      </Card>
      
      <div className="space-y-6">
        {state.error && (
            <Card className="border-destructive">
                <CardHeader>
                    <CardTitle className="text-destructive">Error</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{state.error}</p>
                </CardContent>
            </Card>
        )}
        
        {state.data && (
            <Card>
                <CardHeader>
                    <CardTitle>Your Financial Snapshot</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="prose prose-sm dark:prose-invert text-muted-foreground whitespace-pre-wrap">
                        {state.data.reportContent}
                    </div>
                </CardContent>
            </Card>
        )}

        {useFormStatus().pending && !state.data && (
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
      </div>

    </div>
  );
}
