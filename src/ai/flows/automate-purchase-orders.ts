'use server';

/**
 * @fileOverview A flow to automatically generate purchase orders to suppliers based on predicted stock levels.
 *
 * - automatePurchaseOrders - A function that handles the automated purchase order generation process.
 * - AutomatePurchaseOrdersInput - The input type for the automatePurchaseOrders function.
 * - AutomatePurchaseOrdersOutput - The return type for the automatePurchaseOrders function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomatePurchaseOrdersInputSchema = z.object({
  salesData: z.string().describe('Sales data for the past week in JSON format.'),
  currentStockLevels: z.string().describe('Current stock levels for all products in JSON format.'),
  supplierInformation: z.string().describe('Supplier information including contact details and product offerings in JSON format.'),
  leadTimeDays: z.number().describe('Number of days it takes for the supplier to deliver the products after placing the order.'),
  reorderPointBuffer: z.number().describe('The number of days of stock to keep in reserve.'),
});
export type AutomatePurchaseOrdersInput = z.infer<typeof AutomatePurchaseOrdersInputSchema>;

const AutomatePurchaseOrdersOutputSchema = z.object({
  purchaseOrders: z.string().describe('Generated purchase orders for each supplier in JSON format.'),
});
export type AutomatePurchaseOrdersOutput = z.infer<typeof AutomatePurchaseOrdersOutputSchema>;

export async function automatePurchaseOrders(input: AutomatePurchaseOrdersInput): Promise<AutomatePurchaseOrdersOutput> {
  return automatePurchaseOrdersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'automatePurchaseOrdersPrompt',
  input: {schema: AutomatePurchaseOrdersInputSchema},
  output: {schema: AutomatePurchaseOrdersOutputSchema},
  prompt: `You are an AI assistant helping a store manager automate the process of generating purchase orders for suppliers based on sales data, current stock levels, supplier information, lead time, and desired reorder point buffer.

You will receive the following information:
- Sales data for the past week: {{{salesData}}}
- Current stock levels: {{{currentStockLevels}}}
- Supplier information: {{{supplierInformation}}}
- Lead time (in days): {{{leadTimeDays}}}
- Reorder point buffer (in days): {{{reorderPointBuffer}}}

Analyze the provided data and generate purchase orders for each supplier. Consider the lead time and reorder point buffer to avoid stockouts. The purchase orders should include the product name, quantity to order, and the supplier's contact information.

Return the purchase orders in JSON format. Each supplier object in the JSON should have a supplier contact field, and an items array. Each item in the array should have name and quantity fields.

Example:
{
  "supplierA": {
    "supplierContact": "contact info",
    "items": [
      { "name": "product1", "quantity": 10 },
      { "name": "product2", "quantity": 5 }
    ]
  },
  "supplierB": {
    "supplierContact": "contact info",
    "items": [
      { "name": "product3", "quantity": 12 },
      { "name": "product4", "quantity": 8 }
    ]
  }
}
`,
});

const automatePurchaseOrdersFlow = ai.defineFlow(
  {
    name: 'automatePurchaseOrdersFlow',
    inputSchema: AutomatePurchaseOrdersInputSchema,
    outputSchema: AutomatePurchaseOrdersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
