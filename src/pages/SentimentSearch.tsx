import React, { useState } from "react";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Button } from "@/components/ui/button";
import { SentimentBadge } from "@/components/ui/sentiment-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MultiTickerSearch } from "@/components/search/MultiTickerSearch";
import { mockStockDetails } from "@/services/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { BarChart as BarChartIcon, Search, LineChart as LineChartIcon, Info } from "lucide-react";

interface StockDetail {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  peRatio: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  sentiment: "positive" | "negative" | "neutral";
  sentimentScore: number;
  aiSuggestion: string;
  aiReasoning: string;
  news: Array<{
    id: string;
    title: string;
    summary: string;
    source: string;
    publishedAt: string;
    sentiment: "positive" | "negative" | "neutral";
  }>;
}

const SentimentSearch: React.FC = () => {
  const [searchedTickers, setSearchedTickers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stockResults, setStockResults] = useState<StockDetail[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  
  const handleSearch = (tickers: string[]) => {
    if (tickers.length === 0) return;
    
    setIsLoading(true);
    setSearchedTickers(tickers);
    
    // Simulate API call delay
    setTimeout(() => {
      const results: StockDetail[] = [];
      
      // Get data for each ticker (fall back to mock data)
      tickers.forEach(ticker => {
        const mockData = mockStockDetails[ticker as keyof typeof mockStockDetails];
        if (mockData) {
          results.push(mockData as StockDetail);
        } else {
          // Generate mock data for tickers not in our mock data
          results.push(generateMockStockData(ticker));
        }
      });
      
      setStockResults(results);
      setIsLoading(false);
    }, 1000);
  };
  
  // Generate mock stock data for tickers not in our mock data
  const generateMockStockData = (symbol: string): StockDetail => {
    const price = 100 + Math.random() * 200;
    const change = Math.random() * 10 - 5;
    const sentimentScore = Math.random();
    const sentiment = sentimentScore > 0.7 
      ? "positive" 
      : sentimentScore < 0.3 
      ? "negative" 
      : "neutral";
    
    return {
      symbol,
      name: `${symbol} Corporation`,
      price,
      change,
      changePercent: (change / price) * 100,
      marketCap: `$${Math.round(Math.random() * 300 + 10)}B`,
      peRatio: Math.round(Math.random() * 40 + 10),
      fiftyTwoWeekHigh: price * (1 + Math.random() * 0.2),
      fiftyTwoWeekLow: price * (1 - Math.random() * 0.2),
      sentiment,
      sentimentScore,
      aiSuggestion: sentiment === "positive" ? "Buy" : sentiment === "negative" ? "Sell" : "Hold",
      aiReasoning: `Based on market trends and sentiment analysis, this stock appears to be ${sentiment === "positive" ? "outperforming" : sentiment === "negative" ? "underperforming" : "performing in line with"} market expectations.`,
      news: [
        {
          id: `${symbol}-news-1`,
          title: `${symbol} Announces Strong Quarterly Results`,
          summary: `${symbol} reported quarterly earnings above analyst expectations, driving positive market sentiment.`,
          source: "MarketNews",
          publishedAt: new Date().toISOString(),
          sentiment: "positive"
        },
        {
          id: `${symbol}-news-2`,
          title: `Analysts Update ${symbol} Forecast`,
          summary: `Several analysts have updated their forecasts for ${symbol}, with mixed views on future performance.`,
          source: "FinanceDaily",
          publishedAt: new Date(Date.now() - 86400000).toISOString(), // yesterday
          sentiment: "neutral"
        }
      ]
    };
  };
  
  // Generate price history data for charts
  const generatePriceHistoryData = (stocks: StockDetail[]) => {
    const data = [];
    const today = new Date();
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const entry: any = {
        date: date.toISOString().split('T')[0],
      };
      
      // Add data point for each stock
      stocks.forEach(stock => {
        // Start with price and add some randomness for historical data
        const basePrice = stock.price * (0.8 + Math.random() * 0.4); // ±20% of current price
        const volatility = 0.1; // 10% volatility
        
        // Price tends to move toward the current price as i approaches 0
        const weightedPrice = basePrice * (i / 30) + stock.price * (1 - i / 30);
        const dailyNoise = (Math.random() - 0.5) * 2 * volatility * weightedPrice;
        
        entry[stock.symbol] = weightedPrice + dailyNoise;
      });
      
      data.push(entry);
    }
    
    return data;
  };
  
  // Generate sentiment comparison data for bar chart
  const generateSentimentData = (stocks: StockDetail[]) => {
    return stocks.map(stock => ({
      symbol: stock.symbol,
      sentimentScore: stock.sentimentScore,
      name: stock.name
    }));
  };
  
  // Chart colors for different stocks
  const stockColors = [
    "#3b82f6", // blue
    "#ef4444", // red
    "#10b981", // green
    "#f59e0b", // amber
    "#8b5cf6", // purple
    "#14b8a6", // teal
    "#f43f5e", // rose
    "#6366f1", // indigo
  ];
  
  const priceHistoryData = stockResults.length > 0 ? generatePriceHistoryData(stockResults) : [];
  const sentimentData = stockResults.length > 0 ? generateSentimentData(stockResults) : [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-1">Stock Sentiment Search</h1>
        <p className="text-muted-foreground">
          Search for any stocks to get real-time sentiment analysis and AI insights
        </p>
      </div>

      <DashboardCard title="Search Stocks">
        <MultiTickerSearch 
          onSearch={handleSearch}
          isLoading={isLoading}
          className="mb-2"
        />
      </DashboardCard>

      {stockResults.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stockResults.map((stock, index) => (
              <div key={stock.symbol} className="bg-card rounded-lg shadow p-4 border">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">{stock.symbol}</h2>
                    <p className="text-sm text-muted-foreground">{stock.name}</p>
                  </div>
                  <SentimentBadge sentiment={stock.sentiment} score={stock.sentimentScore} showScore={true} />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <p className="text-3xl font-bold">${stock.price.toFixed(2)}</p>
                    <p
                      className={`text-sm ${
                        stock.change >= 0 ? "text-success" : "text-destructive"
                      }`}
                    >
                      {stock.change >= 0 ? "+" : ""}
                      {stock.change.toFixed(2)} (
                      {stock.change >= 0 ? "+" : ""}
                      {stock.changePercent.toFixed(2)}%)
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">AI Suggestion</p>
                    <p className={`text-lg font-bold ${
                      stock.aiSuggestion === "Buy" ? "text-success" : 
                      stock.aiSuggestion === "Sell" ? "text-destructive" : 
                      "text-warning"
                    }`}>
                      {stock.aiSuggestion}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="price-chart" className="flex items-center gap-2">
                  <LineChartIcon className="h-4 w-4" />
                  Price Comparison
                </TabsTrigger>
                <TabsTrigger value="sentiment-chart" className="flex items-center gap-2">
                  <BarChartIcon className="h-4 w-4" />
                  Sentiment Comparison
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="grid grid-cols-1 gap-6">
                {stockResults.map((stock) => (
                  <DashboardCard
                    key={stock.symbol}
                    title={`${stock.symbol} - ${stock.name}`}
                    description="Stock details and news"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-1">
                        <h3 className="text-lg font-medium mb-3">Key Statistics</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Market Cap</span>
                            <span className="font-medium">{stock.marketCap}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">P/E Ratio</span>
                            <span className="font-medium">{stock.peRatio}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">52 Week High</span>
                            <span className="font-medium">${stock.fiftyTwoWeekHigh.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">52 Week Low</span>
                            <span className="font-medium">${stock.fiftyTwoWeekLow.toFixed(2)}</span>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <h3 className="text-lg font-medium mb-3">AI Analysis</h3>
                          <div className="space-y-4 p-3 bg-muted/30 rounded-md">
                            <div>
                              <h4 className="font-medium mb-1 text-sm">Recommendation</h4>
                              <p className="text-sm">{stock.aiReasoning}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="md:col-span-2">
                        <h3 className="text-lg font-medium mb-3">Recent News</h3>
                        <div className="space-y-4">
                          {stock.news.map((item) => (
                            <div key={item.id} className="border-b pb-4 last:border-0">
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium">{item.title}</h4>
                                <SentimentBadge sentiment={item.sentiment} className="ml-2 shrink-0" />
                              </div>
                              <p className="text-sm text-muted-foreground my-2">{item.summary}</p>
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-medium">{item.source}</span>
                                <span>{new Date(item.publishedAt).toLocaleString()}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DashboardCard>
                ))}
              </TabsContent>
              
              <TabsContent value="price-chart">
                <DashboardCard
                  title="Price Comparison"
                  description="Historical price trends of selected stocks"
                >
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={priceHistoryData}>
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
                          tickFormatter={(value) => `$${value.toFixed(0)}`}
                        />
                        <Tooltip 
                          formatter={(value: number) => [`$${value.toFixed(2)}`, ""]}
                          labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString()}`}
                        />
                        <Legend />
                        {stockResults.map((stock, index) => (
                          <Line 
                            key={stock.symbol}
                            type="monotone" 
                            dataKey={stock.symbol}
                            name={stock.symbol}
                            stroke={stockColors[index % stockColors.length]}
                            strokeWidth={2}
                            dot={false}
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </DashboardCard>
              </TabsContent>
              
              <TabsContent value="sentiment-chart">
                <DashboardCard
                  title="Sentiment Comparison"
                  description="AI-analyzed sentiment scores across selected stocks"
                >
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sentimentData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis dataKey="symbol" />
                        <YAxis 
                          domain={[0, 1]} 
                          tickFormatter={(value) => value.toFixed(1)}
                        />
                        <Tooltip 
                          formatter={(value: number) => [`${value.toFixed(2)}`, "Sentiment Score"]}
                        />
                        <Bar 
                          dataKey="sentimentScore" 
                          name="Sentiment Score"
                          fill="#3b82f6"
                        >
                          {sentimentData.map((entry, index) => {
                            let fill = "#9ca3af"; // neutral (gray)
                            
                            if (entry.sentimentScore >= 0.7) {
                              fill = "#10b981"; // positive (green)
                            } else if (entry.sentimentScore <= 0.3) {
                              fill = "#ef4444"; // negative (red)
                            }
                            
                            return <Bar key={`bar-${entry.symbol}`} dataKey="sentimentScore" fill={fill} />;
                          })}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </DashboardCard>
              </TabsContent>
            </Tabs>
          </div>
        </>
      )}

      {searchedTickers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-muted/50 p-8 rounded-lg max-w-lg mx-auto">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">Search for Stocks</h3>
            <p className="text-muted-foreground">
              Enter one or more stock symbols to view sentiment analysis, price trends, and AI-generated insights.
            </p>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Button variant="outline" size="sm" onClick={() => handleSearch(["AAPL"])}>AAPL</Button>
              <Button variant="outline" size="sm" onClick={() => handleSearch(["MSFT"])}>MSFT</Button>
              <Button variant="outline" size="sm" onClick={() => handleSearch(["GOOGL"])}>GOOGL</Button>
              <Button variant="outline" size="sm" onClick={() => handleSearch(["AMZN"])}>AMZN</Button>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-2">
              <Button variant="secondary" onClick={() => handleSearch(["AAPL", "MSFT", "GOOGL", "AMZN"])}>
                Compare Tech Giants
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SentimentSearch;
