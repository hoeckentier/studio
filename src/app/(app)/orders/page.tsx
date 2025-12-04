'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { automatePurchaseOrders, AutomatePurchaseOrdersInput } from '@/ai/flows/automate-purchase-orders';
import { products, salesData, suppliers } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const FormSchema = z.object({
  leadTimeDays: z.coerce.number().min(1, 'Lead time must be at least 1 day'),
  reorderPointBuffer: z.coerce.number().min(0, 'Buffer cannot be negative'),
});

type PurchaseOrder = {
  supplierContact: string;
  items: { name: string; quantity: number }[];
};

type PurchaseOrdersOutput = {
  purchaseOrders: Record<string, PurchaseOrder>;
};

export default function OrdersPage() {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrdersOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      leadTimeDays: 3,
      reorderPointBuffer: 5,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (data) => {
    setIsLoading(true);
    setPurchaseOrders(null);

    const input: AutomatePurchaseOrdersInput = {
      salesData: JSON.stringify(salesData),
      currentStockLevels: JSON.stringify(Object.fromEntries(products.map(p => [p.name, p.stock]))),
      supplierInformation: JSON.stringify(Object.fromEntries(suppliers.map(s => [s.name, { contact: s.contact, products: s.products.map(pId => products.find(p => p.id === pId)?.name) }]))),
      leadTimeDays: data.leadTimeDays,
      reorderPointBuffer: data.reorderPointBuffer,
    };

    try {
      const result = await automatePurchaseOrders(input);
      const parsedResult = { purchaseOrders: JSON.parse(result.purchaseOrders as unknown as string) };
      setPurchaseOrders(parsedResult);
      toast({
        title: 'Success',
        description: 'Purchase orders have been generated successfully.',
      });
    } catch (error) {
      console.error('Error generating purchase orders:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate purchase orders. The AI may have returned an unexpected format.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Automated Ordering System</CardTitle>
          <CardDescription>
            Automatically generate purchase orders to suppliers based on AI-driven inventory analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="leadTimeDays"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supplier Lead Time (Days)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reorderPointBuffer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Safety Stock Buffer (Days)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : 'Generate Purchase Orders'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {purchaseOrders && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Purchase Orders</CardTitle>
            <CardDescription>The following purchase orders are recommended by the AI.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {Object.entries(purchaseOrders.purchaseOrders).map(([supplierName, order]) => (
                <AccordionItem value={supplierName} key={supplierName}>
                  <AccordionTrigger className="font-semibold text-base">
                    {supplierName} (Contact: {order.supplierContact})
                  </AccordionTrigger>
                  <AccordionContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead className="text-right">Quantity to Order</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {order.items.map((item) => (
                          <TableRow key={item.name}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell className="text-right font-bold">{item.quantity}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
