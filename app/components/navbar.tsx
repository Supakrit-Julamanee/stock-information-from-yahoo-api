"use client";

import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormControl, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { fetchStock } from "../action";
import { z } from "zod";
import { Search } from "lucide-react";

const formSchema = z.object({
  symbol: z.string().min(1, "Stock symbol is required"),
});

type FormData = z.infer<typeof formSchema>;

interface NavbarProps {
  setStockData: (data: any) => void;
}

export default function Navbar({ setStockData }: NavbarProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symbol: "",
    },
  });

  const handleGetData = async (data: FormData) => {
    const result = await fetchStock(data.symbol);
    console.log("Stock Price Data:", result);
    setStockData(result.chart?.result?.[0]);
  };

  return (
    <header className="w-full border-b bg-white shadow-sm dark:bg-gray-900">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-blue-600 dark:text-white">
          USA Stock
        </h1>

        {/* Form must wrap both input and button */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleGetData)} className="flex gap-2">
            <FormField
              control={form.control}
              name="symbol"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="e.g. AAPL" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              <Search/>
            </Button>
          </form>
        </Form>
      </div>
    </header>
  );
}
