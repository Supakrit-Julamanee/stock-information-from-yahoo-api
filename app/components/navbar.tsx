"use client";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormControl, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Search } from "lucide-react";
import { YahooFinanceChartResponse } from "../types/yahoo-chart";
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
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-lg font-semibold text-blue-600 dark:text-white whitespace-nowrap">
            Stock Information
          </h1>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleGetData)}
              className="w-full md:w-auto flex gap-2"
            >
              <FormField
                control={form.control}
                name="symbol"
                render={({ field }) => (
                  <FormItem className="flex-1 min-w-[150px]">
                    <FormControl>
                      <Input
                        placeholder="e.g. AAPL"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                size="icon"
                className="shrink-0"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </header>
  );
}
