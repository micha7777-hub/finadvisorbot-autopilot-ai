
import React, { useState, useEffect } from "react";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { StatCard } from "@/components/ui/stat-card";
import { PortfolioAllocationChart } from "@/components/charts/PortfolioAllocationChart";
import { PortfolioHistoryChart } from "@/components/charts/PortfolioHistoryChart";
import { SentimentHeatmap } from "@/components/charts/SentimentHeatmap";
import { Switch } from "@/components/ui/switch";
import { BarChart, ChartPie, Activity, TrendingUp, Plus, DollarSign, Save } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SentimentBadge } from "@/components/ui/sentiment-badge";
import { toast } from "sonner";
import { AddStockForm } from "@/components/portfolio/AddStockForm";
import { CashBalanceForm } from "@/components/portfolio/CashBalanceForm";
import { PortfolioNews } from "@/components/portfolio/PortfolioNews";
import { usePortfolio, StockHolding, Portfolio as PortfolioType, updatePortfolioHistory } from "@/services/portfolioService";
import { useAuth } from "@/contexts/AuthContext";

const Portfolio: React.FC = () => {
  const { user } = useAuth();
  const { saveUserPortfolio, loadUserPortfolio, updatePortfolio } = usePortfolio();
  
  const [autopilotEnabled, setAutopilotEnabled] = useState(false);
  const [userPortfolio, setUserPortfolio] = useState<PortfolioType>({
    stocks: [],
    cashBalance: 0,
    lastUpdated: '',
    portfolioHistory: []
  });
  const [showAddStockForm, setShowAddStockForm] = useState(false);
  const [showCashForm, setShowCashForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  
  // Load user portfolio on initial render
  useEffect(() => {
    if (user) {
      const loadedPortfolio = loadUserPortfolio();
      setUserPortfolio(loadedPortfolio);
      
      // Check if this is a new user (no stocks and zero cash)
      if (loadedPortfolio.stocks.length === 0 && loadedPortfolio.cashBalance === 0) {
        setIsFirstTimeUser(true);
        setShowCashForm(true);
      } else {
        toast.success("Portfolio loaded successfully");
      }
    }
  }, [user]);
  
  // Calculate portfolio totals including cash
  const stockValue = userPortfolio.stocks.reduce(
    (sum, stock) => sum + stock.shares * stock.price,
    0
  );
  
  const portfolioValue = stockValue + userPortfolio.cashBalance;
  
  const portfolioCost = userPortfolio.stocks.reduce(
    (sum, stock) => sum + stock.shares * stock.costBasis,
    0
  ) + userPortfolio.cashBalance;
  
  const portfolioGain = portfolioValue - portfolioCost;
  const portfolioGainPercent = portfolioCost > 0 ? (portfolioGain / portfolioCost) * 100 : 0;
  
  // Handle deleting a stock
  const handleDeleteStock = (symbol: string) => {
    const updatedStocks = userPortfolio.stocks.filter(stock => stock.symbol !== symbol);
    const updatedPortfolio = {
      ...userPortfolio,
      stocks: updatedStocks
    };
    
    // Update portfolio with new value in history
    const finalPortfolio = updatePortfolioHistory(
      updatedPortfolio, 
      updatedStocks.reduce((sum, s) => sum + s.shares * s.price, 0) + userPortfolio.cashBalance
    );
    
    setUserPortfolio(finalPortfolio);
    saveUserPortfolio(finalPortfolio);
    
    toast.success(`Removed ${symbol} from portfolio`);
  };
  
  // Handle adding a stock
  const handleAddStock = (stock: StockHolding) => {
    // Check if stock already exists
    if (userPortfolio.stocks.some(s => s.symbol === stock.symbol)) {
      toast.error(`${stock.symbol} is already in your portfolio`);
      return;
    }
    
    const updatedPortfolio = {
      ...userPortfolio,
      stocks: [...userPortfolio.stocks, stock]
    };
    
    // Update portfolio with new value in history
    const newPortfolioValue = updatedPortfolio.stocks.reduce(
      (sum, s) => sum + s.shares * s.price, 0
    ) + userPortfolio.cashBalance;
    
    const finalPortfolio = updatePortfolioHistory(updatedPortfolio, newPortfolioValue);
    
    setUserPortfolio(finalPortfolio);
    saveUserPortfolio(finalPortfolio);
    
    toast.success(`Added ${stock.shares} shares of ${stock.symbol} to your portfolio`);
  };
  
  // Handle updating cash balance
  const handleUpdateCash = (newBalance: number) => {
    const updatedPortfolio = {
      ...userPortfolio,
      cashBalance: newBalance
    };
    
    // Update portfolio with new value in history
    const newPortfolioValue = userPortfolio.stocks.reduce(
      (sum, s) => sum + s.shares * s.price, 0
    ) + newBalance;
    
    const finalPortfolio = updatePortfolioHistory(updatedPortfolio, newPortfolioValue);
    
    setUserPortfolio(finalPortfolio);
    saveUserPortfolio(finalPortfolio);
    
    // Show different message for first-time users
    if (isFirstTimeUser) {
      toast.success(`Starting cash balance set to $${newBalance.toLocaleString()}`);
      setIsFirstTimeUser(false);
    } else {
      toast.success(`Cash balance updated to $${newBalance.toLocaleString()}`);
    }
  };
  
  // Handle manual save
  const handleSavePortfolio = () => {
    setIsSaving(true);
    
    try {
      const updatedPortfolio = updatePortfolioHistory(
        userPortfolio, 
        portfolioValue
      );
      
      saveUserPortfolio(updatedPortfolio);
      setUserPortfolio(updatedPortfolio);
      toast.success("Portfolio saved successfully");
    } catch (error) {
      toast.error("Failed to save portfolio");
    } finally {
      setIsSaving(false);
    }
  };
  
  // Format data for allocation chart, including cash
  const allocationData = [
    ...userPortfolio.stocks.map((stock) => ({
      symbol: stock.symbol,
      name: stock.name,
      value: stock.shares * stock.price,
    })),
    {
      symbol: "CASH",
      name: "Cash Balance",
      value: userPortfolio.cashBalance,
    }
  ];
  
  // Get daily change from portfolio history
  const calculateDailyChange = () => {
    const history = userPortfolio.portfolioHistory;
    if (history.length < 2) return { change: 0, changePercent: 0 };
    
    const today = history[history.length - 1]?.value || 0;
    const yesterday = history[history.length - 2]?.value || 0;
    
    if (yesterday === 0) return { change: 0, changePercent: 0 };
    
    const change = today - yesterday;
    const changePercent = (change / yesterday) * 100;
    
    return { change, changePercent };
  };
  
  const { change: dailyChange, changePercent: dailyChangePercent } = calculateDailyChange();

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
          value={`$${userPortfolio.cashBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
          icon={<DollarSign className="h-5 w-5 text-primary" />}
          action={
            <Button size="sm" variant="outline" onClick={() => setShowCashForm(true)}>
              Update
            </Button>
          }
        />
        
        <StatCard
          title="Holdings"
          value={`${userPortfolio.stocks.length}`}
          icon={<ChartPie className="h-5 w-5 text-primary" />}
          action={
            <Button size="sm" variant="outline" onClick={() => setShowAddStockForm(true)}>
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          }
        />
      </div>

      {/* Display welcome message for first-time users */}
      {isFirstTimeUser && (
        <div className="bg-primary/10 text-primary p-4 rounded-lg mb-6 border border-primary/20">
          <h2 className="font-bold text-lg mb-2">Welcome to Your Financial Dashboard!</h2>
          <p className="mb-4">Get started by adding your initial cash balance and then add some stocks to your portfolio.</p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setShowCashForm(true)}>
              Set Initial Cash Balance
            </Button>
            <Button variant="outline" onClick={() => setShowAddStockForm(true)}>
              <Plus className="h-4 w-4 mr-1" />
              Add Your First Stock
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard
          title="Portfolio Performance"
          description="Historical value of your investments"
        >
          {userPortfolio.portfolioHistory.length > 0 ? (
            <PortfolioHistoryChart data={userPortfolio.portfolioHistory} />
          ) : (
            <div className="flex items-center justify-center h-[300px]">
              <p className="text-muted-foreground">No portfolio history available yet</p>
            </div>
          )}
        </DashboardCard>
        
        <DashboardCard
          title="Asset Allocation"
          description="Distribution of your current investments"
        >
          {portfolioValue > 0 ? (
            <PortfolioAllocationChart data={allocationData} />
          ) : (
            <div className="flex items-center justify-center h-[300px]">
              <p className="text-muted-foreground">Add stocks to see your asset allocation</p>
            </div>
          )}
        </DashboardCard>
      </div>

      <DashboardCard
        title="Holdings"
        description="Individual stocks in your portfolio with real-time data"
      >
        {userPortfolio.stocks.length > 0 ? (
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
                {userPortfolio.stocks.map((stock) => {
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
                          sentiment={sentiment as "positive" | "neutral" | "negative"}
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
      
      {userPortfolio.stocks.length > 0 && <PortfolioNews portfolio={userPortfolio.stocks} />}
      
      {userPortfolio.stocks.length > 0 && (
        <DashboardCard
          title="Sentiment Heatmap"
          description="Visual representation of sentiment across your holdings"
        >
          <SentimentHeatmap data={userPortfolio.stocks} />
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
              The AI agent is actively monitoring market conditions and sentiment data to optimize your portfolio. Last adjustment was made on May 12, 2025.
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
                <p>May 13, 2025 (Today)</p>
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
        currentCash={userPortfolio.cashBalance}
        isOpen={showCashForm}
        onClose={() => setShowCashForm(false)}
        isFirstTime={isFirstTimeUser}
      />
    </div>
  );
};

export default Portfolio;
