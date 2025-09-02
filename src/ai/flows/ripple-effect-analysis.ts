'use server';

/**
 * @fileOverview A flow for analyzing the ripple effect of financial decisions on other financial goals.
 *
 * - rippleEffectAnalysis - A function that handles the ripple effect analysis process.
 * - RippleEffectAnalysisInput - The input type for the rippleEffectAnalysis function.
 * - RippleEffectAnalysisOutput - The return type for the rippleEffectAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RippleEffectAnalysisInputSchema = z.object({
  decision: z.string().describe('The financial decision to model (e.g., taking out a car loan).'),
  currentFinancialSituation: z.string().describe('A description of the user\'s current financial situation, including income, expenses, assets, and liabilities.'),
  financialGoals: z.string().describe('A description of the user\'s financial goals, such as retirement, education, and homeownership.'),
});
export type RippleEffectAnalysisInput = z.infer<typeof RippleEffectAnalysisInputSchema>;

const RippleEffectAnalysisOutputSchema = z.object({
  analysis: z.string().describe('An analysis of the impact of the decision on the user\'s financial goals.'),
});
export type RippleEffectAnalysisOutput = z.infer<typeof RippleEffectAnalysisOutputSchema>;

export async function rippleEffectAnalysis(input: RippleEffectAnalysisInput): Promise<RippleEffectAnalysisOutput> {
  return rippleEffectAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rippleEffectAnalysisPrompt',
  input: {schema: RippleEffectAnalysisInputSchema},
  output: {schema: RippleEffectAnalysisOutputSchema},
  prompt: `You are a financial advisor. Analyze the impact of a financial decision on a user\'s financial goals.

Financial Decision: {{{decision}}}
Current Financial Situation: {{{currentFinancialSituation}}}
Financial Goals: {{{financialGoals}}}

Analysis:
`,}
);

const rippleEffectAnalysisFlow = ai.defineFlow(
  {
    name: 'rippleEffectAnalysisFlow',
    inputSchema: RippleEffectAnalysisInputSchema,
    outputSchema: RippleEffectAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
