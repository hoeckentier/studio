'use client';
import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { products as allProducts, Product } from "@/lib/data";
import { ScanLine, Trash2, X } from "lucide-react";
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

type CartItem = Product & { quantity: number };

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const handleScanItem = () => {
    const randomProduct = allProducts[Math.floor(Math.random() * allProducts.length)];
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === randomProduct.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === randomProduct.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...randomProduct, quantity: 1 }];
    });
    toast({
        title: `${randomProduct.name} added to cart.`,
        description: `Price: €${randomProduct.price.toFixed(2)}`,
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };
  
  const handleClearCart = () => {
    setCart([]);
  }

  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const tax = subtotal * 0.19;
  const total = subtotal + tax;

  const handlePayment = () => {
    if (cart.length === 0) {
        toast({
            variant: "destructive",
            title: "Empty Cart",
            description: "Please scan items before proceeding to payment.",
        });
        return;
    }
    toast({
        title: "Payment Successful!",
        description: `Total of €${total.toFixed(2)} has been paid.`,
    });
    setCart([]);
  };

  return (
    <div className="grid md:grid-cols-3 gap-6 items-start">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle>Self-Service Checkout</CardTitle>
                    <CardDescription>Scan your items below to begin.</CardDescription>
                </div>
                <Button onClick={handleScanItem} size="lg">
                    <ScanLine className="mr-2 h-6 w-6" />
                    Scan Item
                </Button>
            </div>
          </CardHeader>
          <CardContent>
            {cart.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead><span className="sr-only">Remove</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="text-center">{item.quantity}</TableCell>
                      <TableCell className="text-right">€{item.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">€{(item.price * item.quantity).toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                    <ScanLine className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">Your cart is empty</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Click "Scan Item" to start your purchase.</p>
                </div>
            )}
          </CardContent>
           {cart.length > 0 && (
            <CardFooter>
                 <Button variant="outline" onClick={handleClearCart}>
                    <X className="mr-2 h-4 w-4" /> Clear Cart
                </Button>
            </CardFooter>
           )}
        </Card>
      </div>
      <div className="md:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes (19%)</span>
              <span>€{tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>€{total.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full" onClick={handlePayment}>
              Pay Now
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
