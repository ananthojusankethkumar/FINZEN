
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Gauge, Clock } from "lucide-react";

export default function CreditScorePage() {
  return (
    <div className="flex justify-center items-center h-full">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary/10">
            <Gauge className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="mt-4 font-headline">Credit Score Maximizer</CardTitle>
          <CardDescription>
            This feature is under development.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Clock className="h-5 w-5" />
            <p className="font-semibold text-lg">Coming Soon!</p>
          </div>
          <p className="mt-2 text-muted-foreground">
            We're working hard to bring you personalized insights to help you boost your credit score. Please check back later!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
