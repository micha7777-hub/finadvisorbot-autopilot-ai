
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  symbol: z.string().min(1, "Symbol is required").max(5),
  name: z.string().min(1, "Company name is required"),
  shares: z.coerce.number().positive("Must be a positive number"),
  costBasis: z.coerce.number().positive("Must be a positive number"),
});

type FormValues = z.infer<typeof formSchema>;

interface AddStockFormProps {
  onAddStock: (stock: any) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const AddStockForm: React.FC<AddStockFormProps> = ({ onAddStock, isOpen, onClose }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symbol: "",
      name: "",
      shares: 1,
      costBasis: 0,
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = (values: FormValues) => {
    // Simulate API call to get current price
    const mockPrice = values.costBasis * (1 + (Math.random() * 0.2 - 0.1)); // Random price ±10% of cost basis
    const change = mockPrice - values.costBasis;
    const changePercent = (change / values.costBasis) * 100;
    
    // Create new stock object
    const newStock = {
      symbol: values.symbol.toUpperCase(),
      name: values.name,
      shares: values.shares,
      price: mockPrice,
      change,
      changePercent,
      costBasis: values.costBasis,
      sentimentScore: 0.5 + Math.random() * 0.4, // Random sentiment between 0.5-0.9
    };
    
    onAddStock(newStock);
    form.reset();
    toast.success(`Added ${values.shares} shares of ${values.symbol.toUpperCase()}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Stock to Portfolio</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="symbol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Symbol</FormLabel>
                  <FormControl>
                    <Input placeholder="AAPL" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the ticker symbol (e.g., AAPL, MSFT)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Apple Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shares"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Shares</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="costBasis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost Basis ($ per share)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormDescription>
                    The price you paid per share
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Stock
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
