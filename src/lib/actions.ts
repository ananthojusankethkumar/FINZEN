"use server";

import { z } from "zod";
import {
  creditScoreMaximizer,
  CreditScoreMaximizerInput,
} from "@/ai/flows/credit-score-maximizer";
import {
  generateFinancialReport,
  GenerateFinancialReportInput,
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


export async function getCreditScoreAdvice(input: CreditScoreMaximizerInput) {
  try {
    const result = await creditScoreMaximizer(input);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: "Failed to get credit score advice." };
  }
}

export async function getFinancialReport(input: GenerateFinancialReportInput) {
  try {
    const result = await generateFinancialReport(input);
    return { success: true, data: result };
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
