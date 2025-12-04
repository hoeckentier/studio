'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { customers } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function NotificationsPage() {
  const { toast } = useToast();
  const [selectAll, setSelectAll] = useState(false);

  const handleSendNotification = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    const selectedCustomers = customers.filter(c => formData.get(c.id));

    if (!subject || !message) {
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "Please provide a subject and a message.",
      });
      return;
    }
    
    if (selectedCustomers.length === 0) {
      toast({
        variant: "destructive",
        title: "No Recipients",
        description: "Please select at least one customer to notify.",
      });
      return;
    }

    // In a real app, this would trigger a backend service to send emails/SMS
    console.log("Sending notification:", { subject, message, recipients: selectedCustomers.map(c => c.email) });

    toast({
      title: "Notification Sent!",
      description: `Your message has been sent to ${selectedCustomers.length} customer(s).`,
    });

    event.currentTarget.reset();
    setSelectAll(false);
  };
  
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"][name^="c"]');
    checkboxes.forEach(cb => {
      // we need to dispatch a click event to make it work with shadcn's checkbox
       if ( (cb.dataset.state === 'checked' && !checked) || (cb.dataset.state === 'unchecked' && checked) ) {
         cb.click();
       }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Notifications</CardTitle>
        <CardDescription>
          Send updates, promotions, or event information to your customers.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSendNotification}>
        <CardContent className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" name="subject" placeholder="e.g., New Regional Products!" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Write your message here..."
                rows={10}
              />
            </div>
          </div>
          <div className="space-y-4">
            <Label>Recipients</Label>
            <Card className="p-1">
                <div className="flex items-center p-3 border-b">
                    <Checkbox id="select-all" onCheckedChange={handleSelectAll} />
                    <Label htmlFor="select-all" className="ml-2 font-medium">Select All</Label>
                </div>
              <ScrollArea className="h-72">
                <div className="p-4 space-y-2">
                  {customers.map(customer => (
                    <div key={customer.id} className="flex items-center">
                      <Checkbox id={customer.id} name={customer.id} />
                      <Label htmlFor={customer.id} className="ml-2">
                        {customer.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>
        </CardContent>
        <CardContent>
          <Button type="submit">
            <Send className="mr-2 h-4 w-4" /> Send Notification
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
