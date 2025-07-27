"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, TrendingUp, DollarSign } from "lucide-react";
import { fetchNasdaq100Data } from "./actions";

export interface Nasdaq100Stock {
  symbol: string;
  name: string;
  currentPrice: number;
  fiftyTwoWeekHigh: number;
  changePercent: number;
  previousClose: number;
  marketCap?: number;
}

type SortOption = 'none' | 'changePercent' | 'marketCap';

export function Nasdaq100Table() {
  const [allStocks, setAllStocks] = useState<Nasdaq100Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('none');

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

  const formatMarketCap = (value: number) => {
    if (value >= 1e12) {
      return `$${(value / 1e12).toFixed(1)}T`;
    } else if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(1)}B`;
    } else if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(1)}M`;
    } else {
      return formatCurrency(value);
    }
  };

  const formatPercent = (value: number) => {
    const formatted = value.toFixed(2);
    const sign = value >= 0 ? '+' : '';
    return `${sign}${formatted}%`;
  };

  const getIntensiveHeatmapColor = (value: number) => {
    // Create more nuanced color mapping
    const clampedValue = Math.max(-100, Math.min(0, value));
    
    if (clampedValue >= -2) return 'bg-green-600 text-white';
    if (clampedValue >= -5) return 'bg-green-500 text-white';
    if (clampedValue >= -10) return 'bg-green-400 text-white';
    if (clampedValue >= -15) return 'bg-yellow-500 text-black';
    if (clampedValue >= -25) return 'bg-orange-400 text-black';
    if (clampedValue >= -35) return 'bg-orange-500 text-white';
    if (clampedValue >= -50) return 'bg-red-500 text-white';
    return 'bg-red-700 text-white';
  };

  const getSortedStocks = () => {
    const stocks = [...allStocks];
    
    switch (sortBy) {
      case 'changePercent':
        return stocks.sort((a, b) => b.changePercent - a.changePercent);
      case 'marketCap':
        return stocks.sort((a, b) => (b.marketCap || 0) - (a.marketCap || 0));
      default:
        return stocks;
    }
  };

  const handleSortChange = (newSort: SortOption) => {
    setSortBy(newSort);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>กำลังโหลดข้อมูลหุ้น...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-3">
            {Array.from({ length: 40 }).map((_, i) => (
              <Skeleton key={i} className="h-28 w-full" />
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

  const sortedStocks = getSortedStocks();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Market Heatmap</CardTitle>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            ข้อมูลราคาหุ้นยอดนิยมแสดงในรูปแบบ Heatmap (ดึงข้อมูลแบบไดนามิกจาก Yahoo Finance)
          </p>
          <p className="text-xs text-gray-500">
            * สีเขียว = ใกล้จุดสูงสุด 52 สัปดาห์ | สีเหลือง = ปานกลาง | สีแดง = ต่ำกว่าจุดสูงสุดมาก
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-3">
          <p className="text-sm text-gray-500">
            แสดงทั้งหมด {allStocks.length} รายการ
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant={sortBy === 'none' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleSortChange('none')}
              className="w-full sm:w-auto"
            >
              <ArrowUpDown className="h-4 w-4 mr-1" />
              Original
            </Button>
            <Button
              variant={sortBy === 'changePercent' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleSortChange('changePercent')}
              className="w-full sm:w-auto"
            >
              <TrendingUp className="h-4 w-4 mr-1" />
              % Change
            </Button>
            <Button
              variant={sortBy === 'marketCap' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleSortChange('marketCap')}
              className="w-full sm:w-auto"
            >
              <DollarSign className="h-4 w-4 mr-1" />
              Market Cap
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-3">
          {sortedStocks.map((stock, index) => (
            <div 
              key={stock.symbol} 
              className={`p-4 sm:p-3 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer relative min-h-[120px] sm:min-h-[100px] ${getIntensiveHeatmapColor(stock.changePercent)}`}
              title={`${stock.name}\nCurrent: ${formatCurrency(stock.currentPrice)}\n52W High: ${formatCurrency(stock.fiftyTwoWeekHigh)}\nChange: ${formatPercent(stock.changePercent)}${stock.marketCap ? `\nMarket Cap: ${formatMarketCap(stock.marketCap)}` : ''}`}
            >
              {/* Sort ranking indicator */}
              {sortBy !== 'none' && (
                <div className="absolute -top-1 -left-1 bg-blue-600 text-white text-xs rounded-full w-6 h-6 sm:w-5 sm:h-5 flex items-center justify-center font-bold">
                  {index + 1}
                </div>
              )}
              
              <div className="text-center">
                <div className="font-bold text-base sm:text-sm mb-2 sm:mb-1">{stock.symbol}</div>
                <div className="text-sm sm:text-xs opacity-90 mb-2 sm:mb-1">
                  {formatCurrency(stock.currentPrice)}
                </div>
                {sortBy === 'marketCap' && stock.marketCap ? (
                  <div className="text-sm sm:text-xs font-semibold">
                    {formatMarketCap(stock.marketCap)}
                  </div>
                ) : (
                  <div className="text-sm sm:text-xs font-semibold">
                    {formatPercent(stock.changePercent)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {allStocks.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">
            ไม่พบข้อมูลหุ้น
          </div>
        )}

        {/* Color Legend */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold mb-3">Color Legend (% from 52-Week High)</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-4 sm:h-4 bg-green-600 rounded flex-shrink-0"></div>
              <span>0% to -2%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-4 sm:h-4 bg-green-500 rounded flex-shrink-0"></div>
              <span>-2% to -5%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-4 sm:h-4 bg-green-400 rounded flex-shrink-0"></div>
              <span>-5% to -10%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-4 sm:h-4 bg-yellow-500 rounded flex-shrink-0"></div>
              <span>-10% to -15%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-4 sm:h-4 bg-orange-400 rounded flex-shrink-0"></div>
              <span>-15% to -25%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-4 sm:h-4 bg-orange-500 rounded flex-shrink-0"></div>
              <span>-25% to -35%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-4 sm:h-4 bg-red-500 rounded flex-shrink-0"></div>
              <span>-35% to -50%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-4 sm:h-4 bg-red-700 rounded flex-shrink-0"></div>
              <span>Below -50%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 