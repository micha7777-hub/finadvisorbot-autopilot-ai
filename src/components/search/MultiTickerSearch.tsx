
import React, { useState } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";

interface MultiTickerSearchProps {
  onSearch: (tickers: string[]) => void;
  isLoading?: boolean;
  className?: string;
}

export const MultiTickerSearch: React.FC<MultiTickerSearchProps> = ({
  onSearch,
  isLoading = false,
  className
}) => {
  const [inputValue, setInputValue] = useState("");
  const [tickers, setTickers] = useState<string[]>([]);
  const [searchSuggestions, setSearchSuggestions] = useState<Array<{symbol: string, name: string}>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // List of popular stocks for suggestions
  const popularStocks = [
    { symbol: "AAPL", name: "Apple Inc." },
    { symbol: "MSFT", name: "Microsoft Corporation" },
    { symbol: "GOOGL", name: "Alphabet Inc." },
    { symbol: "AMZN", name: "Amazon.com Inc." },
    { symbol: "META", name: "Meta Platforms Inc." },
    { symbol: "TSLA", name: "Tesla Inc." },
    { symbol: "NVDA", name: "NVIDIA Corporation" },
    { symbol: "AMD", name: "Advanced Micro Devices, Inc." },
    { symbol: "JPM", name: "JPMorgan Chase & Co." },
    { symbol: "DIS", name: "The Walt Disney Company" },
    { symbol: "NFLX", name: "Netflix Inc." },
    { symbol: "PYPL", name: "PayPal Holdings Inc." },
    { symbol: "INTC", name: "Intel Corporation" },
    { symbol: "XOM", name: "Exxon Mobil Corporation" },
    { symbol: "WMT", name: "Walmart Inc." },
  ];
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().trim();
    setInputValue(value);
    
    if (value.length > 0) {
      // Filter suggestions based on input
      const filtered = popularStocks.filter(
        stock => 
          stock.symbol.toUpperCase().includes(value) || 
          stock.name.toUpperCase().includes(value)
      );
      setSearchSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  };
  
  // Add ticker on enter or comma
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTicker();
    }
  };
  
  // Add ticker to list
  const addTicker = () => {
    const tickerValue = inputValue.replace(",", "").trim().toUpperCase();
    
    if (tickerValue && !tickers.includes(tickerValue)) {
      setTickers([...tickers, tickerValue]);
      setInputValue("");
      setShowSuggestions(false);
    }
  };
  
  // Remove ticker from list
  const removeTicker = (tickerToRemove: string) => {
    setTickers(tickers.filter(ticker => ticker !== tickerToRemove));
  };
  
  // Select suggestion
  const selectSuggestion = (stock: {symbol: string, name: string}) => {
    if (!tickers.includes(stock.symbol)) {
      setTickers([...tickers, stock.symbol]);
    }
    setInputValue("");
    setShowSuggestions(false);
  };
  
  // Handle search
  const handleSearch = () => {
    // Add current input if not empty
    const currentTickerValue = inputValue.replace(",", "").trim().toUpperCase();
    let finalTickers = [...tickers];
    
    if (currentTickerValue && !tickers.includes(currentTickerValue)) {
      finalTickers = [...finalTickers, currentTickerValue];
    }
    
    if (finalTickers.length > 0) {
      onSearch(finalTickers);
    }
  };

  return (
    <div className={className}>
      <div className="relative">
        {/* Selected tickers */}
        <div className="flex flex-wrap gap-2 mb-2">
          {tickers.map((ticker) => (
            <Tag key={ticker} onRemove={() => removeTicker(ticker)}>
              {ticker}
            </Tag>
          ))}
        </div>
        
        {/* Search input */}
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Input
              placeholder="Enter ticker symbols (e.g., AAPL, MSFT, TSLA)"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => inputValue && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="w-full pl-10"
              aria-label="Search stocks by ticker symbol"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          
          <Button onClick={handleSearch} disabled={isLoading && (tickers.length === 0 && !inputValue)}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              "Search"
            )}
          </Button>
        </div>
        
        {/* Suggestions dropdown */}
        {showSuggestions && searchSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-auto">
            {searchSuggestions.map((stock) => (
              <div
                key={stock.symbol}
                className="p-2 hover:bg-muted cursor-pointer flex justify-between"
                onClick={() => selectSuggestion(stock)}
              >
                <span className="font-medium">{stock.symbol}</span>
                <span className="text-muted-foreground">{stock.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-2 text-xs text-muted-foreground">
        <span>Enter multiple symbols separated by commas or press Enter after each</span>
      </div>
    </div>
  );
};
