'use server';

/**
 * @fileOverview This file defines a Genkit flow for optimizing stock levels based on sales data.
 *
 * - optimizeStockLevels - A function that takes sales data as input and returns suggested stock levels for each product.
 * - OptimizeStockLevelsInput - The input type for the optimizeStockLevels function.
 * - OptimizeStockLevelsOutput - The return type for the optimizeStockLevels function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeStockLevelsInputSchema = z.object({
  salesData: z.record(z.number()).describe('A record of sales data for each product, with the product ID as the key and the number of sales as the value.'),
  productDetails: z.record(z.string()).describe('A record of product details for each product, with the product ID as the key and the product details as the value.'),
  currentStockLevels: z.record(z.number()).describe('A record of current stock levels for each product, with the product ID as the key and the current stock level as the value.'),
});
export type OptimizeStockLevelsInput = z.infer<typeof OptimizeStockLevelsInputSchema>;

const OptimizeStockLevelsOutputSchema = z.record(z.number()).describe('A record of suggested stock levels for each product, with the product ID as the key and the suggested stock level as the value.');
export type OptimizeStockLevelsOutput = z.infer<typeof OptimizeStockLevelsOutputSchema>;

export async function optimizeStockLevels(input: OptimizeStockLevelsInput): Promise<OptimizeStockLevelsOutput> {
  return optimizeStockLevelsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeStockLevelsPrompt',
  input: {schema: OptimizeStockLevelsInputSchema},
  output: {schema: OptimizeStockLevelsOutputSchema},
  prompt: `You are an expert inventory manager. You will analyze sales data and current stock levels to suggest optimal stock levels for each product. Optimize stock levels to minimize waste and ensure popular items are always available. Return a record of suggested stock levels for each product.

Sales Data: {{{salesData}}}
Product Details: {{{productDetails}}}
Current Stock Levels: {{{currentStockLevels}}}`,
});

const optimizeStockLevelsFlow = ai.defineFlow(
  {
    name: 'optimizeStockLevelsFlow',
    inputSchema: OptimizeStockLevelsInputSchema,
    outputSchema: OptimizeStockLevelsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
