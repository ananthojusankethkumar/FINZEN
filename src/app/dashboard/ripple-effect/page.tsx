"use client";

import { useFormState, useFormStatus } from "react-dom";
import { getRippleEffectAnalysis } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Recycle, Sparkles } from "lucide-react";

const initialState = {
  data: null,
  errors: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="mr-2 h-4 w-4" />
      )}
      Analyze Ripple Effect
    </Button>
  );
}

export default function RippleEffectPage() {
  const [state, formAction] = useFormState(getRippleEffectAnalysis, initialState);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Recycle className="h-6 w-6" /> Ripple Effect Analysis
          </CardTitle>
          <CardDescription>
            Want to make a big financial move? Model it here to see the long-term impact on your goals before you commit.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="decision">Financial Decision to Model</Label>
              <Textarea
                id="decision"
                name="decision"
                placeholder="e.g., 'Taking out a car loan of ₹8,00,000 for 5 years at 9% interest' or 'Investing ₹2,00,000 in a high-risk stock'."
                required
              />
              {state?.errors?.decision && <p className="text-sm text-destructive">{state.errors.decision[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentFinancialSituation">Current Financial Situation</Label>
              <Textarea
                id="currentFinancialSituation"
                name="currentFinancialSituation"
                placeholder="e.g., 'Monthly income of ₹1,50,000, expenses of ₹70,000, existing home loan EMI of ₹30,000, savings of ₹10,00,000 in FDs and MFs.'"
                required
              />
              {state?.errors?.currentFinancialSituation && <p className="text-sm text-destructive">{state.errors.currentFinancialSituation[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="financialGoals">Primary Financial Goals</Label>
              <Textarea
                id="financialGoals"
                name="financialGoals"
                placeholder="e.g., 'Retirement in 25 years with a corpus of ₹5 crore, child's education in 15 years needing ₹50 lakh, buying a larger house in 7 years.'"
                required
              />
              {state?.errors?.financialGoals && <p className="text-sm text-destructive">{state.errors.financialGoals[0]}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>AI-Generated Impact Analysis</CardTitle>
          <CardDescription>
            The potential effects on your financial future will be shown here.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          {state.data ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Analysis</h3>
                <div className="prose prose-sm dark:prose-invert text-muted-foreground whitespace-pre-wrap mt-2 rounded-md border p-4">
                  {state.data.analysis}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <p>Waiting for input...</p>
            </div>
          )}
           {state.error && <p className="text-sm text-destructive">{state.error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
