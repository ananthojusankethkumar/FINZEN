'use server';

/**
 * @fileOverview Implements the Smart Nudge System flow, which analyzes user spending patterns and provides personalized, non-judgmental nudges to foster better financial habits.
 *
 * - smartNudgeSystem - A function that handles the smart nudge system process.
 * - SmartNudgeSystemInput - The input type for the smartNudgeSystem function.
 * - SmartNudgeSystemOutput - The return type for the smartNudgeSystem function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartNudgeSystemInputSchema = z.object({
  spendingData: z
    .string()
    .describe(
      'A detailed record of the user spending, including categories, amounts, and timestamps.'
    ),
  financialGoals: z
    .string()
    .describe('A description of the user financial goals, such as saving for retirement or a down payment on a house.'),
  userProfile: z
    .string()
    .describe('Information about the user, including age, income, and risk tolerance.'),
});
export type SmartNudgeSystemInput = z.infer<typeof SmartNudgeSystemInputSchema>;

const SmartNudgeSystemOutputSchema = z.object({
  nudge: z.string().describe('A personalized, non-judgmental nudge to encourage better financial habits.'),
});
export type SmartNudgeSystemOutput = z.infer<typeof SmartNudgeSystemOutputSchema>;

export async function smartNudgeSystem(input: SmartNudgeSystemInput): Promise<SmartNudgeSystemOutput> {
  return smartNudgeSystemFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartNudgePrompt',
  input: {schema: SmartNudgeSystemInputSchema},
  output: {schema: SmartNudgeSystemOutputSchema},
  prompt: `You are a financial advisor providing personalized nudges to users to improve their financial habits. 

  Analyze the user's spending data, financial goals, and user profile to provide a single, non-judgmental nudge that will help them achieve their goals.

  Spending Data: {{{spendingData}}}
  Financial Goals: {{{financialGoals}}}
  User Profile: {{{userProfile}}}

  Nudge:`,
});

const smartNudgeSystemFlow = ai.defineFlow(
  {
    name: 'smartNudgeSystemFlow',
    inputSchema: SmartNudgeSystemInputSchema,
    outputSchema: SmartNudgeSystemOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
