
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, DollarSign } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  cash: z.coerce.number().nonnegative("Cash cannot be negative"),
});

type FormValues = z.infer<typeof formSchema>;

interface CashBalanceFormProps {
  onUpdateCash: (amount: number) => void;
  currentCash: number;
  isOpen: boolean;
  onClose: () => void;
  isFirstTime?: boolean;
}

export const CashBalanceForm: React.FC<CashBalanceFormProps> = ({ 
  onUpdateCash, 
  currentCash,
  isOpen,
  onClose,
  isFirstTime = false
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cash: currentCash,
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = (values: FormValues) => {
    onUpdateCash(values.cash);
    toast.success(`Cash balance ${isFirstTime ? 'set' : 'updated'} to $${values.cash.toLocaleString()}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {isFirstTime ? 'Set Initial Cash Balance' : 'Update Cash Balance'}
        </h2>
        {isFirstTime && (
          <p className="text-muted-foreground mb-4">
            Welcome to your portfolio! Start by entering how much cash you want to begin investing with.
          </p>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cash"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cash Balance ($)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type="number" step="0.01" className="pl-9" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-2">
              {!isFirstTime && (
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              )}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isFirstTime ? 'Get Started' : 'Update Balance'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
