"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, TrendingUp, DollarSign, Filter } from "lucide-react";
import { fetchNasdaq100Data } from "./actions";

export interface Nasdaq100Stock {
  symbol: string;
  name: string;
  currentPrice: number;
  fiftyTwoWeekHigh: number;
  changePercent: number;
  previousClose: number;
  marketCap?: number;
  dailyChangePercent?: number;
}

type SortOption = 'none' | 'changePercent' | 'marketCap' | 'symbol' | 'currentPrice' | 'dailyChange';

type ChangeRateFilter = 'all' | 'green-100' | 'green-50' | 'blue-50' | 'yellow-50' | 'orange-50' | 'red-50' | 'red-100' | 'red-200';

export function Nasdaq100Table() {
  const [allStocks, setAllStocks] = useState<Nasdaq100Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('none');
  const [changeRateFilter, setChangeRateFilter] = useState<ChangeRateFilter>('all');

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await fetchNasdaq100Data();
        // Calculate daily change percentage
        const dataWithDailyChange = data.map(stock => ({
          ...stock,
          dailyChangePercent: stock.previousClose > 0 
            ? ((stock.currentPrice - stock.previousClose) / stock.previousClose) * 100 
            : 0
        }));
        setAllStocks(dataWithDailyChange);
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
    // Create more subtle and readable color mapping
    const clampedValue = Math.max(-100, Math.min(0, value));
    
    if (clampedValue >= -2) return 'bg-green-100 text-green-800 border-l-4 border-green-500';
    if (clampedValue >= -5) return 'bg-green-50 text-green-700 border-l-4 border-green-400';
    if (clampedValue >= -10) return 'bg-blue-50 text-blue-700 border-l-4 border-blue-400';
    if (clampedValue >= -15) return 'bg-yellow-50 text-yellow-800 border-l-4 border-yellow-500';
    if (clampedValue >= -25) return 'bg-orange-50 text-orange-800 border-l-4 border-orange-500';
    if (clampedValue >= -35) return 'bg-red-50 text-red-700 border-l-4 border-red-400';
    if (clampedValue >= -50) return 'bg-red-100 text-red-800 border-l-4 border-red-500';
    return 'bg-red-200 text-red-900 border-l-4 border-red-600';
  };

  const filterStocksByChangeRate = (stocks: Nasdaq100Stock[]) => {
    switch (changeRateFilter) {
      case 'green-100':
        return stocks.filter(stock => stock.changePercent >= -2);
      case 'green-50':
        return stocks.filter(stock => stock.changePercent >= -5 && stock.changePercent < -2);
      case 'blue-50':
        return stocks.filter(stock => stock.changePercent >= -10 && stock.changePercent < -5);
      case 'yellow-50':
        return stocks.filter(stock => stock.changePercent >= -15 && stock.changePercent < -10);
      case 'orange-50':
        return stocks.filter(stock => stock.changePercent >= -25 && stock.changePercent < -15);
      case 'red-50':
        return stocks.filter(stock => stock.changePercent >= -35 && stock.changePercent < -25);
      case 'red-100':
        return stocks.filter(stock => stock.changePercent >= -50 && stock.changePercent < -35);
      case 'red-200':
        return stocks.filter(stock => stock.changePercent < -50);
      default:
        return stocks;
    }
  };

  const getSortedStocks = () => {
    const filteredStocks = filterStocksByChangeRate(allStocks);
    
    switch (sortBy) {
      case 'changePercent':
        return filteredStocks.sort((a, b) => b.changePercent - a.changePercent);
      case 'marketCap':
        return filteredStocks.sort((a, b) => (b.marketCap || 0) - (a.marketCap || 0));
      case 'symbol':
        return filteredStocks.sort((a, b) => a.symbol.localeCompare(b.symbol));
      case 'currentPrice':
        return filteredStocks.sort((a, b) => b.currentPrice - a.currentPrice);
      case 'dailyChange':
        return filteredStocks.sort((a, b) => (b.dailyChangePercent || 0) - (a.dailyChangePercent || 0));
      default:
        return filteredStocks;
    }
  };

  const handleSortChange = (newSort: SortOption) => {
    setSortBy(newSort);
  };

  const handleFilterChange = (newFilter: ChangeRateFilter) => {
    setChangeRateFilter(newFilter);
  };

  const getFilterLabel = (filter: ChangeRateFilter) => {
    switch (filter) {
      case 'green-100': return 'At/Near High (0% to -2%)';
      case 'green-50': return 'Small Decline (-2% to -5%)';
      case 'blue-50': return 'Moderate Decline (-5% to -10%)';
      case 'yellow-50': return 'Large Decline (-10% to -15%)';
      case 'orange-50': return 'Severe Decline (-15% to -25%)';
      case 'red-50': return 'Very Severe Decline (-25% to -35%)';
      case 'red-100': return 'Extremely Severe Decline (-35% to -50%)';
      case 'red-200': return 'Extremely Low (&lt;-50%)';
      default: return 'All Stocks';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>กำลังโหลดข้อมูลหุ้น...</CardTitle>
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

  const sortedStocks = getSortedStocks();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Market Heatmap Table</CardTitle>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            ข้อมูลราคาหุ้นยอดนิยมแสดงในรูปแบบ Heatmap Table (ดึงข้อมูลแบบไดนามิกจาก Yahoo Finance)
          </p>
          <p className="text-xs text-gray-500">
            * สีเขียว = ใกล้จุดสูงสุด 52 สัปดาห์ | สีเหลือง = ปานกลาง | สีแดง = ต่ำกว่าจุดสูงสุดมาก
          </p>
        </div>
        
        {/* Filter Dropdown */}
        <div className="mt-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Filter by Performance:</span>
            </div>
            <select 
              value={changeRateFilter}
              onChange={(e) => handleFilterChange(e.target.value as ChangeRateFilter)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Stocks</option>
              <option value="green-100">At/Near High (0% to -2%)</option>
              <option value="green-50">Small Decline (-2% to -5%)</option>
              <option value="blue-50">Moderate Decline (-5% to -10%)</option>
              <option value="yellow-50">Large Decline (-10% to -15%)</option>
              <option value="orange-50">Severe Decline (-15% to -25%)</option>
              <option value="red-50">Very Severe Decline (-25% to -35%)</option>
              <option value="red-100">Extremely Severe Decline (-35% to -50%)</option>
              <option value="red-200">Extremely Low (&lt;-50%)</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-3">
          <p className="text-sm text-gray-500">
            แสดง {sortedStocks.length} จาก {allStocks.length} รายการ ({getFilterLabel(changeRateFilter)})
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
              variant={sortBy === 'symbol' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleSortChange('symbol')}
              className="w-full sm:w-auto"
            >
              <ArrowUpDown className="h-4 w-4 mr-1" />
              Symbol
            </Button>
            <Button
              variant={sortBy === 'currentPrice' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleSortChange('currentPrice')}
              className="w-full sm:w-auto"
            >
              <DollarSign className="h-4 w-4 mr-1" />
              Price
            </Button>
            <Button
              variant={sortBy === 'dailyChange' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleSortChange('dailyChange')}
              className="w-full sm:w-auto"
            >
              <TrendingUp className="h-4 w-4 mr-1" />
              Daily %
            </Button>
            <Button
              variant={sortBy === 'changePercent' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleSortChange('changePercent')}
              className="w-full sm:w-auto"
            >
              <TrendingUp className="h-4 w-4 mr-1" />
              52W %
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
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-semibold text-sm">Rank</th>
                <th className="text-left p-3 font-semibold text-sm">Symbol</th>
                <th className="text-left p-3 font-semibold text-sm hidden sm:table-cell">Company Name</th>
                <th className="text-right p-3 font-semibold text-sm">Current Price</th>
                <th className="text-right p-3 font-semibold text-sm hidden md:table-cell">Daily Change</th>
                <th className="text-right p-3 font-semibold text-sm hidden md:table-cell">52W High</th>
                <th className="text-right p-3 font-semibold text-sm">% from High</th>
                <th className="text-right p-3 font-semibold text-sm hidden lg:table-cell">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {sortedStocks.map((stock, index) => (
                <tr 
                  key={stock.symbol} 
                  className={`border-b transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${getIntensiveHeatmapColor(stock.changePercent)}`}
                >
                  <td className="p-3 font-semibold text-sm">
                    #{index + 1}
                  </td>
                  <td className="p-3 font-bold text-sm">
                    {stock.symbol}
                  </td>
                  <td className="p-3 text-sm hidden sm:table-cell max-w-48 truncate" title={stock.name}>
                    {stock.name}
                  </td>
                  <td className="p-3 text-right font-semibold text-sm">
                    {formatCurrency(stock.currentPrice)}
                  </td>
                  <td className={`p-3 text-right text-sm hidden md:table-cell font-medium ${
                    (stock.dailyChangePercent || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatPercent(stock.dailyChangePercent || 0)}
                  </td>
                  <td className="p-3 text-right text-sm hidden md:table-cell">
                    {formatCurrency(stock.fiftyTwoWeekHigh)}
                  </td>
                  <td className="p-3 text-right font-bold text-sm">
                    {formatPercent(stock.changePercent)}
                  </td>
                  <td className="p-3 text-right text-sm hidden lg:table-cell">
                    {stock.marketCap ? formatMarketCap(stock.marketCap) : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedStocks.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">
            ไม่พบข้อมูลหุ้นในกลุ่มที่เลือก
          </div>
        )}

        {/* Color Legend */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold mb-3">Color Legend (% from 52-Week High)</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-4 sm:h-4 bg-green-100 border-l-2 border-green-500 rounded flex-shrink-0"></div>
              <span>0% to -2%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-4 sm:h-4 bg-green-50 border-l-2 border-green-400 rounded flex-shrink-0"></div>
              <span>-2% to -5%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-4 sm:h-4 bg-blue-50 border-l-2 border-blue-400 rounded flex-shrink-0"></div>
              <span>-5% to -10%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-4 sm:h-4 bg-yellow-50 border-l-2 border-yellow-500 rounded flex-shrink-0"></div>
              <span>-10% to -15%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-4 sm:h-4 bg-orange-50 border-l-2 border-orange-500 rounded flex-shrink-0"></div>
              <span>-15% to -25%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-4 sm:h-4 bg-red-50 border-l-2 border-red-400 rounded flex-shrink-0"></div>
              <span>-25% to -35%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-4 sm:h-4 bg-red-100 border-l-2 border-red-500 rounded flex-shrink-0"></div>
              <span>-35% to -50%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-4 sm:h-4 bg-red-200 border-l-2 border-red-600 rounded flex-shrink-0"></div>
              <span>Below -50%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 