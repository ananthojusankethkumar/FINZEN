
"use client";

import { useEffect, useState, useTransition } from "react";
import { useSearchParams } from 'next/navigation';
import {
  Bot,
  Wallet,
  Loader2,
  TrendingUp,
  Gauge,
  Trophy,
} from "lucide-react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { getSmartNudge, getCashFlowPrediction } from "@/lib/actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { Button } from "../ui/button";

function SmartNudge() {
  const [nudge, setNudge] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const mockInput = {
        spendingData:
          "Frequent purchases on Zomato and Swiggy, averaging 300 INR per order, 4 times a week. Subscription to Netflix and Amazon Prime. Monthly SIP of 5000 INR.",
        financialGoals: "Save for a down payment on a house in 5 years.",
        userProfile: "28 years old, software engineer, moderate risk tolerance.",
      };
      const result = await getSmartNudge(mockInput);
      if (result.success) {
        setNudge(result.data.nudge);
      } else {
        setNudge("Could not load a financial tip for you at the moment.");
      }
    });
  }, []);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          Behavioral Nudge Coach
        </CardTitle>
        <Bot className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isPending ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">{nudge}</p>
        )}
      </CardContent>
    </Card>
  );
}

function MilestoneTracker() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-lg flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Gamified Milestones
        </CardTitle>
        <CardDescription>
          Create and track your financial goals.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 text-muted-foreground">
        <p>Set up savings goals, track your progress, and celebrate your achievements to build strong financial habits.</p>
        <Button asChild>
            <Link href="/dashboard/milestones">Manage Milestones</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function ZenCastChart() {
  const searchParams = useSearchParams();
  const [cashFlowData, setCashFlowData] = useState<any[] | null>(null);
  const [isPending, startTransition] = useTransition();
  const monthlyEarnings = searchParams.get('monthlyEarnings') ?? '0';
  const monthlySavings = searchParams.get('monthlySavings') ?? '0';

  useEffect(() => {
    startTransition(async () => {
      const accountHistory = JSON.stringify([
        { date: "Start", balance: Number(monthlyEarnings) },
        { date: "Month End", balance: Number(monthlySavings) },
      ]);
      const result = await getCashFlowPrediction({
        accountHistory: accountHistory,
        forecastDays: 60,
      });

      if (result.success && result.data.forecast) {
        try {
          const formattedData = result.data.forecast.map((d: any) => ({
              date: d.date,
              balance: d.balance
          }));
          setCashFlowData(formattedData);
        } catch (e) {
          console.error("Failed to parse forecast data", e);
          setCashFlowData([]);
        }
      } else {
        setCashFlowData([]);
      }
    });
  }, [monthlyEarnings, monthlySavings]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-lg flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          ZenCast™️: Predictive Cash Flow
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          {isPending || !cashFlowData ? (
            <div className="flex h-full items-center justify-center">
              {isPending ? <Loader2 className="h-8 w-8 animate-spin text-primary" /> : <p>Could not load chart data.</p>}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${Number(value) / 1000}k`}
                />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    color: "hsl(var(--card-foreground))",
                  }}
                  labelStyle={{ color: "hsl(var(--card-foreground))" }}
                  formatter={(value) => [`${Number(value).toLocaleString()}`, "Balance"]}
                />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "hsl(var(--primary))" }}
                  activeDot={{ r: 8, fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function formatCurrency(value: string | null) {
    if (!value) return "INR 0";
    const number = Number(value);
    if (isNaN(number)) return "INR 0";
    return `INR ${number.toLocaleString("en-IN")}`;
}

export function DashboardClient() {
  const searchParams = useSearchParams();
  const netWorth = searchParams.get('netWorth');
  const monthlySavings = searchParams.get('monthlySavings');

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <div className="lg:col-span-5 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">Net Worth</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(netWorth)}</div>
              <p className="text-xs text-muted-foreground">
                Based on your provided data.
              </p>
            </CardContent>
          </Card>
          <Card>
             <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">
                Credit Score
              </CardTitle>
               <Link href="/dashboard/credit-score">
                <Gauge className="h-4 w-4 text-muted-foreground" />
               </Link>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">780</div>
              <p className="text-xs text-muted-foreground">
                Excellent
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">
                Monthly Savings
              </CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(monthlySavings)}</div>
               <p className="text-xs text-muted-foreground">
                Your current monthly target.
              </p>
            </CardContent>
          </Card>
        </div>
        <ZenCastChart />
      </div>

      <div className="lg:col-span-2 grid gap-4">
        <SmartNudge />
        <MilestoneTracker />
      </div>
    </div>
  );
}
