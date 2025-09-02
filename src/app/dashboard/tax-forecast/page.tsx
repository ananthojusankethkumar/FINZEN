"use client";

import { useFormState, useFormStatus } from "react-dom";
import { getTaxForecast } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";

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
      Forecast Tax Liability
    </Button>
  );
}

export default function TaxForecastPage() {
  const [state, formAction] = useFormState(getTaxForecast, initialState);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">
            Proactive Tax Forecasting
          </CardTitle>
          <CardDescription>
            Enter your financial details to get an accurate estimate of your tax liability and a personalized savings plan.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="income">Annual Income (INR)</Label>
                    <Input id="income" name="income" type="number" placeholder="e.g., 1500000" required />
                    {state?.errors?.income && <p className="text-sm text-destructive">{state.errors.income[0]}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="homeLoanInterest">Home Loan Interest (INR)</Label>
                    <Input id="homeLoanInterest" name="homeLoanInterest" type="number" placeholder="e.g., 200000" defaultValue="0" required />
                    {state?.errors?.homeLoanInterest && <p className="text-sm text-destructive">{state.errors.homeLoanInterest[0]}</p>}
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="hraExemption">HRA Exemption (INR)</Label>
                    <Input id="hraExemption" name="hraExemption" type="number" placeholder="e.g., 100000" defaultValue="0" required />
                    {state?.errors?.hraExemption && <p className="text-sm text-destructive">{state.errors.hraExemption[0]}</p>}
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="medicalInsurancePremium">Medical Insurance Premium (INR)</Label>
                    <Input id="medicalInsurancePremium" name="medicalInsurancePremium" type="number" placeholder="e.g., 25000" defaultValue="0" required />
                    {state?.errors?.medicalInsurancePremium && <p className="text-sm text-destructive">{state.errors.medicalInsurancePremium[0]}</p>}
                </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="investments">Investments Description</Label>
              <Textarea
                id="investments"
                name="investments"
                placeholder="e.g., Mutual Funds (SIP & Lumpsum), Stocks, PPF..."
                required
              />
               {state?.errors?.investments && <p className="text-sm text-destructive">{state.errors.investments[0]}</p>}
            </div>
             <div className="space-y-2">
              <Label htmlFor="taxSavingInvestments">Tax Saving Investments (80C, etc.)</Label>
              <Textarea
                id="taxSavingInvestments"
                name="taxSavingInvestments"
                placeholder="e.g., ELSS, NPS, Life Insurance Premium..."
                required
              />
               {state?.errors?.taxSavingInvestments && <p className="text-sm text-destructive">{state.errors.taxSavingInvestments[0]}</p>}
            </div>
             <div className="space-y-2">
              <Label htmlFor="otherDeductions">Other Deductions</Label>
              <Textarea
                id="otherDeductions"
                name="otherDeductions"
                placeholder="e.g., Donations (80G), etc. (Optional)"
              />
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>AI-Generated Forecast & Plan</CardTitle>
          <CardDescription>
            Your results will appear here after analysis.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          {state.data ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Estimated Tax Liability</h3>
                <p className="text-2xl font-bold text-primary">
                  ₹{state.data.taxLiability.toLocaleString("en-IN")}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Personalized Tax Saving Plan</h3>
                <div className="prose prose-sm dark:prose-invert text-muted-foreground whitespace-pre-wrap mt-2 rounded-md border p-4">
                  {state.data.taxSavingPlan}
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
