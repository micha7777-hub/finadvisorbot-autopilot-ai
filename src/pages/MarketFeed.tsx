
import React from "react";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { StockTicker } from "@/components/ui/stock-ticker";
import { mockMarketIndices, mockNewsData, mockMarketMovers } from "@/services/mockData";
import { SentimentBadge } from "@/components/ui/sentiment-badge";

const MarketFeed: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-1">Live Market Feed</h1>
        <p className="text-muted-foreground">
          Real-time market data and AI-analyzed financial news
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {mockMarketIndices.map((index) => (
          <StockTicker
            key={index.symbol}
            symbol={index.name}
            price={index.price}
            change={index.change}
            changePercent={index.changePercent}
            className="hover-scale"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <DashboardCard
            title="Breaking Financial News"
            description="AI-summarized headlines with sentiment analysis"
          >
            <div className="space-y-6">
              {mockNewsData.map((news) => (
                <div key={news.id} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-lg">{news.title}</h3>
                    <SentimentBadge sentiment={news.sentiment as any} className="ml-2" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{news.summary}</p>
                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <span className="font-medium">{news.source}</span>
                      <span className="mx-2">•</span>
                      <span>
                        {new Date(news.publishedAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      {news.relevantStocks.map((stock) => (
                        <span
                          key={stock}
                          className="bg-secondary text-secondary-foreground px-2 py-1 rounded"
                        >
                          {stock}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        <div>
          <DashboardCard
            title="Top Market Movers"
            description="Highest sentiment impact stocks"
          >
            <div className="space-y-4">
              {mockMarketMovers.map((stock) => (
                <div key={stock.symbol} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{stock.symbol}</div>
                      <div className="text-xs text-muted-foreground">{stock.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${stock.price.toFixed(2)}</div>
                      <div
                        className={`text-xs ${
                          stock.change >= 0 ? "text-success" : "text-destructive"
                        }`}
                      >
                        {stock.change >= 0 ? "+" : ""}
                        {stock.change.toFixed(2)} (
                        {stock.change >= 0 ? "+" : ""}
                        {stock.changePercent.toFixed(2)}%)
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <div className="text-xs">
                      Sentiment: 
                      <span 
                        className={`ml-1 font-medium ${
                          stock.sentimentScore >= 0.7 
                            ? "text-success" 
                            : stock.sentimentScore <= 0.3 
                            ? "text-destructive" 
                            : "text-muted-foreground"
                        }`}
                      >
                        {stock.sentimentScore.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <SentimentBadge 
                        sentiment={
                          stock.sentimentScore >= 0.7 
                            ? "positive" 
                            : stock.sentimentScore <= 0.3 
                            ? "negative" 
                            : "neutral"
                        } 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>
      </div>

      <DashboardCard
        title="AI Market Insights"
        description="Aggregated sentiment and identified trends"
      >
        <div className="space-y-4">
          <div className="bg-muted/30 p-4 rounded-lg border">
            <h3 className="font-medium mb-2">Today's Market Summary</h3>
            <p className="text-sm">
              Markets are showing mixed signals today with technology stocks generally outperforming other sectors. NVIDIA leads gains following announcement of next-generation AI chips. The Federal Reserve's hints at a potential June rate cut have positively impacted market sentiment, though some sectors show caution. Overall market sentiment leans positive with a notable divergence between tech and traditional industries.
            </p>
          </div>
          
          <div className="bg-muted/30 p-4 rounded-lg border">
            <h3 className="font-medium mb-2">Key Trends Identified</h3>
            <ul className="list-disc pl-5 text-sm space-y-2">
              <li><span className="font-medium">AI Hardware Momentum:</span> Companies involved in AI chip development showing strong positive sentiment (NVDA, AMD)</li>
              <li><span className="font-medium">Rate Cut Anticipation:</span> Financial sector experiencing moderate sentiment improvement following Fed comments</li>
              <li><span className="font-medium">Supply Chain Concerns:</span> Consumer electronics manufacturers facing negative sentiment due to continued component shortages</li>
            </ul>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
};

export default MarketFeed;
