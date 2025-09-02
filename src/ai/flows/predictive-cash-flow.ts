'use server';
/**
 * @fileOverview Flow for forecasting user's account balance for the next 30-90 days.
 *
 * - predictCashFlow - A function that handles the cash flow prediction process.
 * - PredictCashFlowInput - The input type for the predictCashFlow function.
 * - PredictCashFlowOutput - The return type for the predictCashFlow function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictCashFlowInputSchema = z.object({
  accountHistory: z.string().describe('The user account history in JSON format.'),
  forecastDays: z.number().describe('The number of days to forecast cash flow for (30-90).'),
});
export type PredictCashFlowInput = z.infer<typeof PredictCashFlowInputSchema>;

const PredictCashFlowOutputSchema = z.object({
  forecast: z.string().describe('The predicted cash flow for the next 30-90 days in JSON format.'),
  summary: z.string().describe('A summary of potential shortfalls or surplus cash.'),
});
export type PredictCashFlowOutput = z.infer<typeof PredictCashFlowOutputSchema>;

export async function predictCashFlow(input: PredictCashFlowInput): Promise<PredictCashFlowOutput> {
  return predictCashFlowFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictCashFlowPrompt',
  input: {schema: PredictCashFlowInputSchema},
  output: {schema: PredictCashFlowOutputSchema},
  prompt: `You are a financial AI assistant that can predict cash flow based on account history.

  Given the following account history:
  {{accountHistory}}

  Forecast the cash flow for the next {{forecastDays}} days.

  Provide a summary of potential shortfalls or surplus cash.
  Return the forecast and summary in JSON format:
  {
    "forecast": "",
    "summary": ""
  }`,
});

const predictCashFlowFlow = ai.defineFlow(
  {
    name: 'predictCashFlowFlow',
    inputSchema: PredictCashFlowInputSchema,
    outputSchema: PredictCashFlowOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
