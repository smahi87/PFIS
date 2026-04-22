import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AddTransactionDialogProps {
  onSuccess?: () => void;
  children?: React.ReactNode;
}

export function AddTransactionDialog({ onSuccess, children }: AddTransactionDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      description: formData.get("description"),
      amount: formData.get("amount"),
      category: formData.get("category"),
      type: formData.get("type"),
      mode: formData.get("payment_mode"),
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    };

    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Transaction added successfully!");
        setOpen(false);
        onSuccess?.();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to add transaction");
      }
    } catch (error) {
      toast.error("Connection failed. Is the backend running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Transaction
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] glass-card border-border/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">Add Transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <input
              name="description"
              required
              placeholder="e.g. Zomato Dinner"
              className="input-field w-full"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount (₹)</label>
              <input
                name="amount"
                type="number"
                required
                placeholder="0.00"
                className="input-field w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <select name="type" className="input-field w-full" required>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select name="category" className="input-field w-full" required>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Housing">Housing</option>
                <option value="Utilities">Utilities</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Shopping">Shopping</option>
                <option value="Salary">Salary</option>
                <option value="Investment">Investment</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Payment Mode</label>
              <select name="payment_mode" className="input-field w-full" required>
                <option value="upi">UPI</option>
                <option value="card">Card</option>
                <option value="bank">Bank Transfer</option>
                <option value="cash">Cash</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary py-3 mt-4 flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Transaction"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
