'use server';
/**
 * @fileOverview An AI agent that forecasts tax liability and provides a personalized plan to maximize savings.
 *
 * - proactiveTaxForecasting - A function that handles the tax forecasting and planning process.
 * - ProactiveTaxForecastingInput - The input type for the proactiveTaxForecasting function.
 * - ProactiveTaxForecastingOutput - The return type for the proactiveTaxForecasting function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProactiveTaxForecastingInputSchema = z.object({
  income: z.number().describe('The user\'s annual income.'),
  investments: z.string().describe('A description of the user\'s investments.'),
  taxSavingInvestments: z.string().describe('A description of the user\'s tax saving investments.'),
  homeLoanInterest: z.number().describe('The interest paid on the user\'s home loan.'),
  hraExemption: z.number().describe('The HRA Exemption user is eligible for.'),
  medicalInsurancePremium: z.number().describe('The medical insurance premium paid by the user.'),
  otherDeductions: z.string().describe('A description of any other deductions the user is eligible for.'),
});
export type ProactiveTaxForecastingInput = z.infer<typeof ProactiveTaxForecastingInputSchema>;

const ProactiveTaxForecastingOutputSchema = z.object({
  taxLiability: z.number().describe('The estimated tax liability for the financial year.'),
  taxSavingPlan: z.string().describe('A personalized plan to maximize tax savings.'),
});
export type ProactiveTaxForecastingOutput = z.infer<typeof ProactiveTaxForecastingOutputSchema>;

export async function proactiveTaxForecasting(input: ProactiveTaxForecastingInput): Promise<ProactiveTaxForecastingOutput> {
  return proactiveTaxForecastingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'proactiveTaxForecastingPrompt',
  input: {schema: ProactiveTaxForecastingInputSchema},
  output: {schema: ProactiveTaxForecastingOutputSchema},
  prompt: `You are a tax planning expert for Indian residents. You will analyze the user's financial information and provide an accurate estimate of their tax liability for the financial year. Based on the information, you will provide a personalized plan to maximize their tax savings.

User's Income: {{{income}}}
Investments: {{{investments}}}
Tax Saving Investments: {{{taxSavingInvestments}}}
Home Loan Interest: {{{homeLoanInterest}}}
HRA Exemption: {{{hraExemption}}}
Medical Insurance Premium: {{{medicalInsurancePremium}}}
Other Deductions: {{{otherDeductions}}}

Provide the tax liability and a detailed tax saving plan. The plan should include specific investment options and strategies to reduce tax liability under various sections of the Income Tax Act, such as 80C, 80D, 80G, etc. Also consider both Old vs New tax regimes based on the input data provided. Provide the result in Indian Rupees.
`,
});

const proactiveTaxForecastingFlow = ai.defineFlow(
  {
    name: 'proactiveTaxForecastingFlow',
    inputSchema: ProactiveTaxForecastingInputSchema,
    outputSchema: ProactiveTaxForecastingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
