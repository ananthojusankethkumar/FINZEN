"use client";

import { useEffect, useState, useTransition } from "react";
import {
  BarChart,
  Bot,
  CircleDollarSign,
  Gauge,
  Loader2,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getSmartNudge } from "@/lib/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "../ui/skeleton";

const cashFlowData = [
  { date: "Day 0", balance: 50000 },
  { date: "Day 5", balance: 48000 },
  { date: "Day 10", balance: 55000 },
  { date: "Day 15", balance: 53000 },
  { date: "Day 20", balance: 51000 },
  { date: "Day 25", balance: 60000 },
  { date: "Day 30", balance: 58000 },
  { date: "Day 35", balance: 56000 },
  { date: "Day 40", balance: 65000 },
  { date: "Day 45", balance: 63000 },
  { date: "Day 50", balance: 61000 },
  { date: "Day 55", balance: 70000 },
  { date: "Day 60", balance: 68000 },
];

const milestones = [
  {
    title: "Emergency Fund Goal",
    goal: 100000,
    current: 75000,
    description: "Save for 6 months of expenses.",
  },
  {
    title: "Goa Trip",
    goal: 50000,
    current: 12000,
    description: "Get that much needed vacation.",
  },
  {
    title: "New Phone",
    goal: 80000,
    current: 65000,
    description: "Upgrade to the latest tech.",
  },
];

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
        <CardTitle className="font-headline text-lg">Gamified Milestones</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {milestones.map((milestone) => (
          <div key={milestone.title}>
            <div className="flex justify-between items-end mb-1">
              <h4 className="font-semibold">{milestone.title}</h4>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  ₹{milestone.current.toLocaleString()}
                </span>{" "}
                / ₹{milestone.goal.toLocaleString()}
              </p>
            </div>
            <Progress value={(milestone.current / milestone.goal) * 100} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ZenCastChart() {
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
                  tickFormatter={(value) => `₹${Number(value) / 1000}k`}
                />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    color: "hsl(var(--card-foreground))",
                  }}
                  labelStyle={{ color: "hsl(var(--card-foreground))" }}
                  formatter={(value) => [`₹${Number(value).toLocaleString()}`, "Balance"]}
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
          </div>
        </CardContent>
      </Card>
    );
}

export function DashboardClient() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <div className="lg:col-span-5 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">Net Worth</CardTitle>
              <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹12,45,230</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">
                Credit Score
              </CardTitle>
              <Gauge className="h-4 w-4 text-muted-foreground" />
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
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹25,000</div>
              <p className="text-xs text-muted-foreground">
                +15% from last month
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
