
import React, { useState, useEffect } from "react";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { PortfolioAllocationChart } from "@/components/charts/PortfolioAllocationChart";
import { PortfolioHistoryChart } from "@/components/charts/PortfolioHistoryChart";
import { SentimentHeatmap } from "@/components/charts/SentimentHeatmap";
import { Switch } from "@/components/ui/switch";
import { BarChart, ChartPie, Activity, TrendingUp, Plus, DollarSign, Save } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { mockPortfolioHistory } from "@/services/mockData";
import { SentimentBadge } from "@/components/ui/sentiment-badge";
import { toast } from "sonner";
import { AddStockForm } from "@/components/portfolio/AddStockForm";
import { CashBalanceForm } from "@/components/portfolio/CashBalanceForm";
import { PortfolioNews } from "@/components/portfolio/PortfolioNews";
import { usePortfolio, StockHolding } from "@/services/portfolioService";
import { useAuth } from "@/contexts/AuthContext";

const Portfolio: React.FC = () => {
  const { user } = useAuth();
  const { saveUserPortfolio, loadUserPortfolio } = usePortfolio();
  
  const [autopilotEnabled, setAutopilotEnabled] = useState(false);
  const [userPortfolio, setUserPortfolio] = useState<StockHolding[]>([]);
  const [cashBalance, setCashBalance] = useState(10000); // Default cash balance
  const [showAddStockForm, setShowAddStockForm] = useState(false);
  const [showCashForm, setShowCashForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Load user portfolio on initial render
  useEffect(() => {
    const loadedPortfolio = loadUserPortfolio();
    if (loadedPortfolio) {
      setUserPortfolio(loadedPortfolio.stocks);
      setCashBalance(loadedPortfolio.cashBalance);
      toast.success("Portfolio loaded successfully");
    }
  }, []);
  
  // Handle deleting a stock
  const handleDeleteStock = (symbol: string) => {
    setUserPortfolio(prev => prev.filter(stock => stock.symbol !== symbol));
    toast.success(`Removed ${symbol} from portfolio`);
    
    // Save portfolio after deletion
    const updatedPortfolio = userPortfolio.filter(stock => stock.symbol !== symbol);
    saveUserPortfolio(updatedPortfolio, cashBalance);
  };
  
  // Handle adding a stock
  const handleAddStock = (stock: any) => {
    // Check if stock already exists
    if (userPortfolio.some(s => s.symbol === stock.symbol)) {
      toast.error(`${stock.symbol} is already in your portfolio`);
      return;
    }
    
    const updatedPortfolio = [...userPortfolio, stock];
    setUserPortfolio(updatedPortfolio);
    
    // Save portfolio after addition
    saveUserPortfolio(updatedPortfolio, cashBalance);
  };
  
  // Handle updating cash balance
  const handleUpdateCash = (newBalance: number) => {
    setCashBalance(newBalance);
    
    // Save portfolio after updating cash
    saveUserPortfolio(userPortfolio, newBalance);
  };
  
  // Handle manual save
  const handleSavePortfolio = () => {
    setIsSaving(true);
    
    try {
      saveUserPortfolio(userPortfolio, cashBalance);
      toast.success("Portfolio saved successfully");
    } catch (error) {
      toast.error("Failed to save portfolio");
    } finally {
      setIsSaving(false);
    }
  };
  
  // Calculate portfolio totals including cash
  const stockValue = userPortfolio.reduce(
    (sum, stock) => sum + stock.shares * stock.price,
    0
  );
  
  const portfolioValue = stockValue + cashBalance;
  
  const portfolioCost = userPortfolio.reduce(
    (sum, stock) => sum + stock.shares * stock.costBasis,
    0
  ) + cashBalance;
  
  const portfolioGain = portfolioValue - portfolioCost;
  const portfolioGainPercent = portfolioCost > 0 ? (portfolioGain / portfolioCost) * 100 : 0;
  
  // Format data for allocation chart, including cash
  const allocationData = [
    ...userPortfolio.map((stock) => ({
      symbol: stock.symbol,
      name: stock.name,
      value: stock.shares * stock.price,
    })),
    {
      symbol: "CASH",
      name: "Cash Balance",
      value: cashBalance,
    }
  ];
  
  // Get yesterday's and today's values for daily change calculation
  const today = mockPortfolioHistory[mockPortfolioHistory.length - 1].value;
  const yesterday = mockPortfolioHistory[mockPortfolioHistory.length - 2].value;
  const dailyChange = today - yesterday;
  const dailyChangePercent = (dailyChange / yesterday) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">My Portfolio</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name || "Investor"}! Here's your portfolio overview
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-4 md:mt-0">
          <Button 
            onClick={handleSavePortfolio} 
            disabled={isSaving}
            className="flex items-center"
          >
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save Portfolio"}
          </Button>
          <div className="flex items-center space-x-2 bg-muted/50 p-2 rounded-lg">
            <Label htmlFor="autopilot" className="font-medium">
              AutoPilot Mode
            </Label>
            <Switch
              id="autopilot"
              checked={autopilotEnabled}
              onCheckedChange={setAutopilotEnabled}
            />
            {autopilotEnabled ? (
              <span className="text-xs text-success bg-success/10 px-2 py-1 rounded-md">Active</span>
            ) : (
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">Off</span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Portfolio Value"
          value={`$${portfolioValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
          trend={dailyChange >= 0 ? "up" : "down"}
          trendValue={`${dailyChange >= 0 ? "+" : ""}$${Math.abs(dailyChange).toFixed(2)} (${dailyChange >= 0 ? "+" : ""}${dailyChangePercent.toFixed(2)}%) today`}
          icon={<BarChart className="h-5 w-5 text-primary" />}
        />
        
        <StatCard
          title="Total Gain/Loss"
          value={`${portfolioGain >= 0 ? "+" : ""}$${portfolioGain.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
          trend={portfolioGain >= 0 ? "up" : "down"}
          trendValue={`${portfolioGain >= 0 ? "+" : ""}${portfolioGainPercent.toFixed(2)}%`}
          icon={<TrendingUp className="h-5 w-5 text-primary" />}
        />
        
        <StatCard
          title="Cash Balance"
          value={`$${cashBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
          icon={<DollarSign className="h-5 w-5 text-primary" />}
          action={
            <Button size="sm" variant="outline" onClick={() => setShowCashForm(true)}>
              Update
            </Button>
          }
        />
        
        <StatCard
          title="Holdings"
          value={`${userPortfolio.length}`}
          icon={<ChartPie className="h-5 w-5 text-primary" />}
          action={
            <Button size="sm" variant="outline" onClick={() => setShowAddStockForm(true)}>
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard
          title="Portfolio Performance"
          description="Historical value of your investments"
        >
          <PortfolioHistoryChart data={mockPortfolioHistory} />
        </DashboardCard>
        
        <DashboardCard
          title="Asset Allocation"
          description="Distribution of your current investments"
        >
          <PortfolioAllocationChart data={allocationData} />
        </DashboardCard>
      </div>

      <DashboardCard
        title="Holdings"
        description="Individual stocks in your portfolio with real-time data"
      >
        {userPortfolio.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left font-medium py-3 px-4">Symbol</th>
                  <th className="text-left font-medium py-3 px-4">Name</th>
                  <th className="text-right font-medium py-3 px-4">Shares</th>
                  <th className="text-right font-medium py-3 px-4">Price</th>
                  <th className="text-right font-medium py-3 px-4">Change</th>
                  <th className="text-right font-medium py-3 px-4">Value</th>
                  <th className="text-right font-medium py-3 px-4">Cost Basis</th>
                  <th className="text-right font-medium py-3 px-4">Gain/Loss</th>
                  <th className="text-center font-medium py-3 px-4">Sentiment</th>
                  <th className="text-right font-medium py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userPortfolio.map((stock) => {
                  const stockValue = stock.shares * stock.price;
                  const stockCost = stock.shares * stock.costBasis;
                  const stockGain = stockValue - stockCost;
                  const stockGainPercent = (stockGain / stockCost) * 100;
                  const sentiment = stock.sentimentScore >= 0.7 
                    ? "positive" 
                    : stock.sentimentScore <= 0.3 
                    ? "negative" 
                    : "neutral";
                    
                  return (
                    <tr key={stock.symbol} className="border-b hover:bg-muted/30">
                      <td className="py-3 px-4 font-medium">{stock.symbol}</td>
                      <td className="py-3 px-4">{stock.name}</td>
                      <td className="py-3 px-4 text-right">{stock.shares}</td>
                      <td className="py-3 px-4 text-right">${stock.price.toFixed(2)}</td>
                      <td className={`py-3 px-4 text-right ${
                        stock.change >= 0 ? "text-success" : "text-destructive"
                      }`}>
                        {stock.change >= 0 ? "+" : ""}
                        {stock.change.toFixed(2)} ({stock.change >= 0 ? "+" : ""}
                        {stock.changePercent.toFixed(2)}%)
                      </td>
                      <td className="py-3 px-4 text-right">
                        ${stockValue.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        ${stockCost.toFixed(2)}
                      </td>
                      <td className={`py-3 px-4 text-right ${
                        stockGain >= 0 ? "text-success" : "text-destructive"
                      }`}>
                        {stockGain >= 0 ? "+" : ""}${stockGain.toFixed(2)}
                        <br />
                        <span className="text-xs">
                          ({stockGain >= 0 ? "+" : ""}
                          {stockGainPercent.toFixed(2)}%)
                        </span>
                      </td>
                      <td className="py-3 px-4 flex justify-center">
                        <SentimentBadge 
                          sentiment={sentiment as any}
                          score={stock.sentimentScore}
                          showScore={true}
                        />
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteStock(stock.symbol)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Your portfolio is empty</p>
            <Button onClick={() => setShowAddStockForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Stock
            </Button>
          </div>
        )}
      </DashboardCard>
      
      <PortfolioNews portfolio={userPortfolio} />
      
      {userPortfolio.length > 0 && (
        <DashboardCard
          title="Sentiment Heatmap"
          description="Visual representation of sentiment across your holdings"
        >
          <SentimentHeatmap data={userPortfolio} />
        </DashboardCard>
      )}
      
      {autopilotEnabled && (
        <DashboardCard
          title="AutoPilot Status"
          description="AI-powered portfolio management is active"
        >
          <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
            <div className="flex items-center mb-4">
              <div className="h-3 w-3 rounded-full bg-primary animate-pulse-slow mr-2"></div>
              <h3 className="font-medium text-primary">AutoPilot is running</h3>
            </div>
            <p className="text-sm mb-4">
              The RL agent is actively monitoring market conditions and sentiment data to optimize your portfolio. Last adjustment was made on May 10, 2025.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 text-sm">
              <div className="bg-background p-3 rounded-md border flex-1">
                <div className="font-medium mb-1">Recent Actions</div>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Increased NVDA position by 2 shares</li>
                  <li>Reduced TSLA position by 1 share</li>
                  <li>Added new position: AMD (3 shares)</li>
                </ul>
              </div>
              <div className="bg-background p-3 rounded-md border flex-1">
                <div className="font-medium mb-1">Next Scheduled Review</div>
                <p>May 12, 2025 (Tomorrow)</p>
                <Button variant="outline" size="sm" className="mt-2">View Strategy Details</Button>
              </div>
            </div>
          </div>
        </DashboardCard>
      )}
      
      {/* Forms */}
      <AddStockForm 
        onAddStock={handleAddStock}
        isOpen={showAddStockForm}
        onClose={() => setShowAddStockForm(false)}
      />
      
      <CashBalanceForm
        onUpdateCash={handleUpdateCash}
        currentCash={cashBalance}
        isOpen={showCashForm}
        onClose={() => setShowCashForm(false)}
      />
    </div>
  );
};

export default Portfolio;
