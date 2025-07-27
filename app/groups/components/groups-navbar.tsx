"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, TrendingUp, BarChart3, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export function GroupsNavbar() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isNasdaq = pathname.includes("nasdaq-100");
  const isSP500 = pathname.includes("s-and-p-500");

  return (
    <div className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Stock Market Analysis</h2>
          </div>
          
          <nav className="flex items-center gap-2 overflow-x-auto">
            <Link
              href="/"
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
                isHome
                  ? "bg-gray-100 text-gray-800 border border-gray-200 shadow-sm"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              )}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
              {isHome && (
                <span className="ml-1 text-xs bg-gray-600 text-white px-2 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </Link>

            <Link
              href="/groups/nasdaq-100"
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
                isNasdaq
                  ? "bg-blue-100 text-blue-700 border border-blue-200 shadow-sm"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              )}
            >
              <List className="h-4 w-4" />
              <span>NASDAQ 100</span>
              {isNasdaq && (
                <span className="ml-1 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </Link>
            
            <Link
              href="/groups/s-and-p-500"
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
                isSP500
                  ? "bg-green-100 text-green-700 border border-green-200 shadow-sm"
                  : "text-gray-600 hover:text-green-600 hover:bg-gray-50"
              )}
            >
              <TrendingUp className="h-4 w-4" />
              <span>S&P 500</span>
              {isSP500 && (
                <span className="ml-1 text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </Link>
          </nav>
        </div>
        
        {/* Description based on current page */}
        <div className="mt-3 pt-3 border-t">
          {isHome && (
            <p className="text-sm text-gray-600">
              🏠 Individual stock analysis with detailed charts and financial data
            </p>
          )}
          {isNasdaq && (
            <p className="text-sm text-gray-600">
              📊 Tracking the 100 largest non-financial companies listed on the NASDAQ stock exchange
            </p>
          )}
          {isSP500 && (
            <p className="text-sm text-gray-600">
              📈 Tracking the 500 largest publicly traded companies in the United States
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 