// src/ai/flows/credit-score-maximizer.ts
'use server';

/**
 * @fileOverview Analyzes credit score data and provides specific advice on how to improve the user's credit score.
 *
 * - creditScoreMaximizer - A function that analyzes credit score and provides advice.
 * - CreditScoreMaximizerInput - The input type for the creditScoreMaximizer function.
 * - CreditScoreMaximizerOutput - The return type for the creditScoreMaximizer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreditScoreMaximizerInputSchema = z.object({
  creditScore: z.number().describe('The user credit score.'),
  paymentHistory: z
    .string()
    .describe('The user payment history including on time payments, late payments, and any defaults.'),
  creditUtilization: z
    .string()
    .describe('The user credit utilization ratio.'),
});

export type CreditScoreMaximizerInput = z.infer<
  typeof CreditScoreMaximizerInputSchema
>;

const CreditScoreMaximizerOutputSchema = z.object({
  advice: z
    .string()
    .describe(
      'Specific advice on how to improve the credit score based on payment history and credit utilization.'
    ),
});

export type CreditScoreMaximizerOutput = z.infer<
  typeof CreditScoreMaximizerOutputSchema
>;

export async function creditScoreMaximizer(
  input: CreditScoreMaximizerInput
): Promise<CreditScoreMaximizerOutput> {
  return creditScoreMaximizerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'creditScoreMaximizerPrompt',
  input: {schema: CreditScoreMaximizerInputSchema},
  output: {schema: CreditScoreMaximizerOutputSchema},
  prompt: `You are a credit score expert. Analyze the following credit score data and provide specific advice on how to improve the credit score.

Credit Score: {{{creditScore}}}
Payment History: {{{paymentHistory}}}
Credit Utilization: {{{creditUtilization}}}

Give specific advice on how to improve the credit score.`,
});

const creditScoreMaximizerFlow = ai.defineFlow(
  {
    name: 'creditScoreMaximizerFlow',
    inputSchema: CreditScoreMaximizerInputSchema,
    outputSchema: CreditScoreMaximizerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
