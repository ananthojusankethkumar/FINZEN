
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { FinzenLogo } from "@/components/finzen/icons";

export default function OnboardingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    monthlyEarnings: "",
    monthlySavings: "",
    netWorth: "",
    personality: "saver",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, personality: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = new URLSearchParams(formData).toString();
    router.push(`/dashboard?${query}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
            <div className="flex items-center gap-2 justify-center mb-2">
              <FinzenLogo className="size-8 text-primary" />
              <span className="text-2xl font-semibold tracking-tight">Welcome to Finzen</span>
            </div>
          <CardTitle className="font-headline text-2xl">Tell us about yourself</CardTitle>
          <CardDescription>
            This will help us personalize your financial dashboard.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="monthlyEarnings">Monthly Earnings (₹)</Label>
                <Input
                  id="monthlyEarnings"
                  name="monthlyEarnings"
                  type="number"
                  placeholder="e.g., 100000"
                  value={formData.monthlyEarnings}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthlySavings">Monthly Savings (₹)</Label>
                <Input
                  id="monthlySavings"
                  name="monthlySavings"
                  type="number"
                  placeholder="e.g., 25000"
                  value={formData.monthlySavings}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="netWorth">Total Net Worth (₹)</Label>
              <Input
                id="netWorth"
                name="netWorth"
                type="number"
                placeholder="e.g., 1200000"
                value={formData.netWorth}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-3">
              <Label>What best describes you?</Label>
              <RadioGroup
                name="personality"
                value={formData.personality}
                onValueChange={handleRadioChange}
                className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="saver" id="saver" />
                  <Label htmlFor="saver">I'm a Saver</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="spender" id="spender" />
                  <Label htmlFor="spender">I'm a Spender</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="investor" id="investor" />
                  <Label htmlFor="investor">I'm an Investor</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Proceed to Dashboard
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
