"use client";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormControl, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Search } from "lucide-react";
import {
  YahooFinanceChartResponse,
  YahooFinanceResult,
} from "../types/yahoo-chart";
import { fetchChart, fetchDetail } from "../action";
import { StockSummary } from "../types/yahoo-finance";

const formSchema = z.object({
  symbol: z.string().min(1, "Stock symbol is required"),
});

type FormData = z.infer<typeof formSchema>;

interface NavbarProps {
  setChart: (data: YahooFinanceChartResponse | null) => void;
  setDetail: (data: StockSummary | null) => void;
}

export default function Navbar({ setDetail, setChart }: NavbarProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symbol: "",
    },
  });

  const handleGetData = async (data: FormData) => {
    try {
      const detail = await fetchDetail(data.symbol);
      setDetail(detail);

      const chart = await fetchChart(data.symbol);
      setChart(chart);
    } catch (error) {
      console.error("Error fetching stock data:", error);
      setDetail(null);
      setChart(null);
    }
  };

  return (
    <header className="w-full border-b bg-white shadow-sm dark:bg-gray-900">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-blue-600 dark:text-white">
          Stock Information From Yahoo Api
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleGetData)}
            className="flex gap-2"
          >
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
              <Search />
            </Button>
          </form>
        </Form>
      </div>
    </header>
  );
}
