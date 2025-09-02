'use server';
/**
 * @fileOverview Flow for generating a personalized financial PDF report.
 *
 * - generateFinancialReport - A function that generates a personalized financial PDF report.
 * - GenerateFinancialReportInput - The input type for the generateFinancialReport function.
 * - GenerateFinancialReportOutput - The return type for the generateFinancialReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFinancialReportInputSchema = z.object({
  userDetails: z
    .string()
    .describe('Details about the user, including their income, age, and goals.'),
  accountDetails: z
    .string()
    .describe('Details about the user accounts, including their balances and transactions.'),
  investmentDetails: z
    .string()
    .describe('Details about the user investments, including their portfolio and returns.'),
  spendingPatterns: z
    .string()
    .describe('Details about the user spending patterns.'),
  creditScore: z
    .string()
    .describe('The credit score of the user.'),
});
export type GenerateFinancialReportInput = z.infer<
  typeof GenerateFinancialReportInputSchema
>;

const GenerateFinancialReportOutputSchema = z.object({
  reportContent: z
    .string()
    .describe('The content of the personalized financial PDF report.'),
});
export type GenerateFinancialReportOutput = z.infer<
  typeof GenerateFinancialReportOutputSchema
>;

export async function generateFinancialReport(
  input: GenerateFinancialReportInput
): Promise<GenerateFinancialReportOutput> {
  return generateFinancialReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFinancialReportPrompt',
  input: {schema: GenerateFinancialReportInputSchema},
  output: {schema: GenerateFinancialReportOutputSchema},
  prompt: `You are an expert financial advisor who can create personalized financial reports.

  Based on the following user details, account details, investment details, spending patterns and credit score, generate a comprehensive, personalized "State of Your Finances" PDF report explained in simple language.

  User Details: {{{userDetails}}}
  Account Details: {{{accountDetails}}}
  Investment Details: {{{investmentDetails}}}
  Spending Patterns: {{{spendingPatterns}}}
  Credit Score: {{{creditScore}}}

  The report should be easy to understand and should provide a clear overview of the user's financial situation.
  The report should also provide recommendations on how the user can improve their financial situation.
  The report should be detailed and include all the relevant information.
`,
});

const generateFinancialReportFlow = ai.defineFlow(
  {
    name: 'generateFinancialReportFlow',
    inputSchema: GenerateFinancialReportInputSchema,
    outputSchema: GenerateFinancialReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
