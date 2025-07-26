"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchNasdaq100Data } from "./actions";

export interface Nasdaq100Stock {
  symbol: string;
  name: string;
  currentPrice: number;
  fiftyTwoWeekHigh: number;
  changePercent: number;
  previousClose: number;
}

export function Nasdaq100Table() {
  const [allStocks, setAllStocks] = useState<Nasdaq100Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const STOCKS_PER_PAGE = 10;

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await fetchNasdaq100Data();
        setAllStocks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการโหลดข้อมูล");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    const formatted = value.toFixed(2);
    const sign = value >= 0 ? '+' : '';
    return `${sign}${formatted}%`;
  };

  const getPercentColor = (value: number) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  // Calculate pagination
  const totalPages = Math.ceil(allStocks.length / STOCKS_PER_PAGE);
  const startIndex = (currentPage - 1) * STOCKS_PER_PAGE;
  const endIndex = startIndex + STOCKS_PER_PAGE;
  const currentStocks = allStocks.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>กำลังโหลดข้อมูล NASDAQ 100...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">เกิดข้อผิดพลาด</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>NASDAQ 100 Stock Information</CardTitle>
        <p className="text-sm text-gray-600">
          ข้อมูลราคาหุ้น NASDAQ 100 อัพเดทล่าสุด<br />
          <span className="text-xs">* เปอร์เซ็นต์แสดงการเปรียบเทียบราคาปัจจุบันกับราคาสูงสุด 52 สัปดาห์ (ค่าติดลบ = ต่ำกว่าจุดสูงสุด)</span>
        </p>
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500">
            แสดง {startIndex + 1}-{Math.min(endIndex, allStocks.length)} จาก {allStocks.length} รายการ
          </p>
          <p className="text-sm text-gray-500">
            หน้า {currentPage} จาก {totalPages}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Symbol</TableHead>
                <TableHead className="font-semibold">Company Name</TableHead>
                <TableHead className="font-semibold text-right">Current Price</TableHead>
                <TableHead className="font-semibold text-right">52W High</TableHead>
                <TableHead className="font-semibold text-right">% from 52W High</TableHead>
                <TableHead className="font-semibold text-right">Previous Close</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentStocks.map((stock) => (
                <TableRow key={stock.symbol} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{stock.symbol}</TableCell>
                  <TableCell className="max-w-xs truncate">{stock.name}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatCurrency(stock.currentPrice)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(stock.fiftyTwoWeekHigh)}
                  </TableCell>
                  <TableCell className={`text-right font-semibold ${getPercentColor(stock.changePercent)}`}>
                    {formatPercent(stock.changePercent)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(stock.previousClose)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageClick(pageNum)}
                    className="w-8 h-8 p-0"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {allStocks.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">
            ไม่พบข้อมูลหุ้น
          </div>
        )}
      </CardContent>
    </Card>
  );
} 