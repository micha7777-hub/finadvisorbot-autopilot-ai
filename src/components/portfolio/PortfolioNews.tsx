
import React from "react";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { SentimentBadge } from "@/components/ui/sentiment-badge";
import { mockNewsData } from "@/services/mockData";

interface PortfolioNewsProps {
  portfolio: Array<{
    symbol: string;
    name: string;
  }>;
}

export const PortfolioNews: React.FC<PortfolioNewsProps> = ({ portfolio }) => {
  // Filter news that are relevant to the user's portfolio
  const getRelevantNews = () => {
    if (!portfolio.length) return mockNewsData;
    
    const symbols = portfolio.map(stock => stock.symbol);
    const names = portfolio.map(stock => stock.name.toLowerCase());
    
    return mockNewsData.filter(news => {
      // Check if news is relevant to any stock in portfolio
      const titleLower = news.title.toLowerCase();
      const summaryLower = news.summary.toLowerCase();
      
      // Check if news mentions any stock symbol
      const hasSymbol = symbols.some(symbol => 
        titleLower.includes(symbol.toLowerCase()) || 
        summaryLower.includes(symbol.toLowerCase()) ||
        (news.relevantStocks && news.relevantStocks.some(s => 
          symbols.includes(s)))
      );
      
      // Check if news mentions any company name
      const hasName = names.some(name => 
        titleLower.includes(name) || 
        summaryLower.includes(name)
      );
      
      return hasSymbol || hasName;
    });
  };
  
  const relevantNews = getRelevantNews();

  return (
    <DashboardCard
      title="News Affecting Your Portfolio"
      description="Recent headlines related to your investments"
    >
      {relevantNews.length > 0 ? (
        <div className="space-y-4">
          {relevantNews.map((item) => (
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
      ) : (
        <div className="text-center py-6 text-muted-foreground">
          <p>No relevant news found for your portfolio.</p>
          <p className="text-sm mt-2">Add stocks to your portfolio to see related news.</p>
        </div>
      )}
    </DashboardCard>
  );
};
