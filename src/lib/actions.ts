
"use server";

import { z } from "zod";
import {
  creditScoreMaximizer,
  CreditScoreMaximizerInput,
} from "@/ai/flows/credit-score-maximizer";
import {
  generateFinancialReport,
} from "@/ai/flows/personalized-financial-pdf-report";
import {
  predictCashFlow,
  PredictCashFlowInput,
} from "@/ai/flows/predictive-cash-flow";
import {
  proactiveTaxForecasting,
} from "@/ai/flows/proactive-tax-forecasting";
import {
  rippleEffectAnalysis,
} from "@/ai/flows/ripple-effect-analysis";
import {
  smartNudgeSystem,
  SmartNudgeSystemInput,
} from "@/ai/flows/smart-nudge-system";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { redirect } from "next/navigation";


// AUTH ACTIONS
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function login(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: "Invalid email or password.",
    };
  }

  try {
    await signInWithEmailAndPassword(
      auth,
      validatedFields.data.email,
      validatedFields.data.password
    );
  } catch (e: any) {
    return { message: "Login failed. Please check your credentials." };
  }

  return redirect("/dashboard");
}

const signupSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  phoneNumber: z.string().min(10, "Please enter a valid phone number."),
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export async function signup(prevState: any, formData: FormData) {
   const validatedFields = signupSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: "Please correct the errors below.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await createUserWithEmailAndPassword(
      auth,
      validatedFields.data.email,
      validatedFields.data.password
    );
    // Here you would typically save the additional user data (fullName, phoneNumber)
    // to a database like Firestore, linked to the user's UID.
  } catch (e: any) {
     if (e.code === 'auth/email-already-in-use') {
        return { message: 'This email address is already in use.', errors: null };
    }
    return { message: "Signup failed. Please try again.", errors: null };
  }

  return redirect("/onboarding");
}

export async function logout() {
  await signOut(auth);
  return redirect("/");
}


// AI ACTIONS
export async function getCreditScoreAdvice(input: CreditScoreMaximizerInput) {
  try {
    const result = await creditScoreMaximizer(input);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: "Failed to get credit score advice." };
  }
}

const financialReportSchema = z.object({
  userDetails: z.string().min(5, "Please describe your user details."),
  accountDetails: z.string().min(10, "Please describe your account details."),
  investmentDetails: z.string().min(10, "Please describe your investment details."),
  spendingPatterns: z.string().min(10, "Please describe your spending patterns."),
  creditScore: z.string().min(3, "Please enter a valid credit score."),
});

export async function getFinancialReport(prevState: any, formData: FormData) {
  const validatedFields = financialReportSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  try {
    const result = await generateFinancialReport(validatedFields.data);
    return { data: result, errors: null };
  } catch (error) {
    return { success: false, error: "Failed to generate financial report." };
  }
}

export async function getCashFlowPrediction(input: PredictCashFlowInput) {
  try {
    const result = await predictCashFlow(input);
    // The forecast is a stringified JSON, so we parse it here.
    const forecastData = JSON.parse(result.forecast);
    return { success: true, data: { ...result, forecast: forecastData } };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to predict cash flow." };
  }
}

const taxForecastSchema = z.object({
  income: z.coerce.number().positive("Income must be a positive number."),
  investments: z.string().min(1, "Please describe your investments."),
  taxSavingInvestments: z.string().min(1, "Please describe your tax saving investments."),
  homeLoanInterest: z.coerce.number().nonnegative("Home loan interest cannot be negative."),
  hraExemption: z.coerce.number().nonnegative("HRA exemption cannot be negative."),
  medicalInsurancePremium: z.coerce.number().nonnegative("Medical insurance premium cannot be negative."),
  otherDeductions: z.string().optional(),
});

export async function getTaxForecast(prevState: any, formData: FormData) {
  const validatedFields = taxForecastSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await proactiveTaxForecasting({
        ...validatedFields.data,
        otherDeductions: validatedFields.data.otherDeductions || "None",
    });
    return { data: result, errors: null };
  } catch (error) {
    return { error: "Failed to get tax forecast.", errors: null };
  }
}

const rippleEffectSchema = z.object({
    decision: z.string().min(5, "Please provide more detail about the decision."),
    currentFinancialSituation: z.string().min(10, "Please provide more detail about your finances."),
    financialGoals: z.string().min(10, "Please provide more detail about your goals."),
});

export async function getRippleEffectAnalysis(prevState: any, formData: FormData) {
    const validatedFields = rippleEffectSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        const result = await rippleEffectAnalysis(validatedFields.data);
        return { data: result, errors: null };
    } catch (error) {
        return { error: "Failed to get ripple effect analysis.", errors: null };
    }
}


export async function getSmartNudge(input: SmartNudgeSystemInput) {
    try {
        const result = await smartNudgeSystem(input);
        return { success: true, data: result };
    } catch (error) {
        return { success: false, error: "Failed to get a smart nudge." };
    }
}
