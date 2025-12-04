'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { optimizeStockLevels, OptimizeStockLevelsInput, OptimizeStockLevelsOutput } from '@/ai/flows/optimize-stock-levels';
import { products, salesData as mockSalesData } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function InventoryPage() {
  const [suggestedLevels, setSuggestedLevels] = useState<OptimizeStockLevelsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleOptimizeStock = async () => {
    setIsLoading(true);
    setSuggestedLevels(null);

    const productDetails = products.reduce((acc, product) => {
        acc[product.id] = `Name: ${product.name}, Category: ${product.category}`;
        return acc;
    }, {} as Record<string, string>);

    const currentStockLevels = products.reduce((acc, product) => {
        acc[product.id] = product.stock;
        return acc;
    }, {} as Record<string, number>);


    const input: OptimizeStockLevelsInput = {
      salesData: mockSalesData,
      productDetails,
      currentStockLevels,
    };

    try {
      const result = await optimizeStockLevels(input);
      setSuggestedLevels(result);
      toast({
        title: 'Success',
        description: 'AI-powered stock suggestions have been generated.',
      });
    } catch (error) {
      console.error('Error optimizing stock levels:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate stock suggestions.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStockLevelVariant = (current: number, suggested: number) => {
    const diff = current - suggested;
    if (diff > 10) return 'default'; // Overstocked
    if (diff < -10) return 'destructive'; // Understocked
    return 'secondary';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Smart Inventory Management</CardTitle>
          <CardDescription>
            Use AI to analyze sales data and predict optimal stock levels. This helps minimize waste and ensure product availability.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleOptimizeStock} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Optimizing...
              </>
            ) : (
              'Generate AI Suggestions'
            )}
          </Button>
        </CardContent>
      </Card>

      {suggestedLevels && (
        <Card>
            <CardHeader>
                <CardTitle>Stock Level Suggestions</CardTitle>
                <CardDescription>Review the AI-generated suggestions below compared to current stock levels.</CardDescription>
            </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-center">Current Stock</TableHead>
                  <TableHead className="text-center">AI Suggested Stock</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => {
                  const suggested = suggestedLevels[product.id] || product.stock;
                  return (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="text-center">{product.stock}</TableCell>
                      <TableCell className="text-center font-bold text-primary">{suggested}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={getStockLevelVariant(product.stock, suggested)}>
                          {product.stock > suggested ? 'Overstocked' : product.stock < suggested ? 'Understocked' : 'Optimal'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {!suggestedLevels && !isLoading && (
        <Alert>
            <AlertTitle>Ready to Optimize?</AlertTitle>
            <AlertDescription>Click the "Generate AI Suggestions" button to get started.</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
