
import React, { useState } from "react";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SentimentBadge } from "@/components/ui/sentiment-badge";
import { Search } from "lucide-react";
import { mockStockDetails } from "@/services/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const SentimentSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (!searchTerm) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const stockSymbol = searchTerm.toUpperCase();
      if (mockStockDetails[stockSymbol as keyof typeof mockStockDetails]) {
        setSelectedStock(stockSymbol);
      } else {
        setSelectedStock(null);
        // In a real app, you would show an error message here
        console.log("Stock not found");
      }
      setIsLoading(false);
    }, 1000);
  };

  // Generate mock price history data for the chart
  const generateMockPriceData = () => {
    const data = [];
    const today = new Date();
    let price = selectedStock === "AAPL" ? 180 : 900;
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Add some randomness to the price
      price = price + (Math.random() - 0.5) * 10;
      
      data.push({
        date: date.toISOString().split('T')[0],
        price: price,
      });
    }
    
    return data;
  };

  const priceData = selectedStock ? generateMockPriceData() : [];
  const stockInfo = selectedStock ? mockStockDetails[selectedStock as keyof typeof mockStockDetails] : null;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-1">Stock Sentiment Search</h1>
        <p className="text-muted-foreground">
          Search for any stock to get real-time sentiment analysis and AI insights
        </p>
      </div>

      <div className="flex space-x-4">
        <div className="relative flex-1">
          <Input
            placeholder="Enter stock symbol (e.g., AAPL, NVDA)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Button onClick={handleSearch} disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
          {!isLoading && <Search className="ml-2 h-4 w-4" />}
        </Button>
      </div>

      {selectedStock && stockInfo && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card rounded-lg shadow p-4 border">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{stockInfo.symbol}</h2>
                  <p className="text-sm text-muted-foreground">{stockInfo.name}</p>
                </div>
                <SentimentBadge sentiment={stockInfo.sentiment as any} score={stockInfo.sentimentScore} showScore={true} />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <p className="text-3xl font-bold">${stockInfo.price.toFixed(2)}</p>
                  <p
                    className={`text-sm ${
                      stockInfo.change >= 0 ? "text-success" : "text-destructive"
                    }`}
                  >
                    {stockInfo.change >= 0 ? "+" : ""}
                    {stockInfo.change.toFixed(2)} (
                    {stockInfo.change >= 0 ? "+" : ""}
                    {stockInfo.changePercent.toFixed(2)}%)
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">AI Suggestion</p>
                  <p className={`text-lg font-bold ${
                    stockInfo.aiSuggestion === "Buy" ? "text-success" : 
                    stockInfo.aiSuggestion === "Sell" ? "text-destructive" : 
                    "text-warning"
                  }`}>
                    {stockInfo.aiSuggestion}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg shadow p-4 border col-span-1 md:col-span-3">
              <h3 className="text-lg font-medium mb-2">Price History</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return `${date.getMonth() + 1}/${date.getDate()}`;
                      }}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      domain={['auto', 'auto']}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
                      labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString()}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <DashboardCard 
                title="Recent News" 
                description="Latest headlines affecting this stock"
              >
                <div className="space-y-4">
                  {stockInfo.news.map((item) => (
                    <div key={item.id} className="border-b pb-4 last:border-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{item.title}</h3>
                        <SentimentBadge sentiment={item.sentiment as any} className="ml-2 shrink-0" />
                      </div>
                      <p className="text-sm text-muted-foreground my-2">{item.summary}</p>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium">{item.source}</span>
                        <span>{new Date(item.publishedAt).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </DashboardCard>
            </div>

            <div>
              <DashboardCard title="Key Statistics" description="Financial metrics overview">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Market Cap</span>
                    <span className="font-medium">{stockInfo.marketCap}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">P/E Ratio</span>
                    <span className="font-medium">{stockInfo.peRatio}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">52 Week High</span>
                    <span className="font-medium">${stockInfo.fiftyTwoWeekHigh.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">52 Week Low</span>
                    <span className="font-medium">${stockInfo.fiftyTwoWeekLow.toFixed(2)}</span>
                  </div>
                </div>
              </DashboardCard>

              <div className="mt-6">
                <DashboardCard title="AI Analysis" description="Machine learning insights">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-1">Recommendation</h3>
                      <p className="text-sm">{stockInfo.aiReasoning}</p>
                    </div>
                    
                    <div>
                      <Button variant="outline" className="w-full">
                        What's Driving This?
                      </Button>
                    </div>
                  </div>
                </DashboardCard>
              </div>
            </div>
          </div>
        </div>
      )}

      {!selectedStock && !isLoading && searchTerm && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-muted/50 p-8 rounded-lg">
            <h3 className="text-xl font-medium mb-2">No results found</h3>
            <p className="text-muted-foreground mb-4">
              We couldn't find any stock matching "{searchTerm}". Please try another symbol.
            </p>
            <p className="text-sm">
              Try searching for: AAPL, NVDA
            </p>
          </div>
        </div>
      )}

      {!selectedStock && !isLoading && !searchTerm && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-muted/50 p-8 rounded-lg max-w-lg mx-auto">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">Search for a stock</h3>
            <p className="text-muted-foreground">
              Enter a stock symbol above to view sentiment analysis, news, and AI-generated insights.
            </p>
            <div className="mt-4 text-sm">
              <p className="font-medium mb-1">Popular searches:</p>
              <div className="flex flex-wrap justify-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setSearchTerm("AAPL")}>
                  AAPL
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSearchTerm("NVDA")}>
                  NVDA
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSearchTerm("MSFT")}>
                  MSFT
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSearchTerm("AMZN")}>
                  AMZN
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SentimentSearch;
