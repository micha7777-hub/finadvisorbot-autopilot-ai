
import React, { useState } from "react";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StrategyComparisonChart } from "@/components/charts/StrategyComparisonChart";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { mockStrategyPerformance } from "@/services/mockData";

const StrategyLab: React.FC = () => {
  const [profileType, setProfileType] = useState("balanced");
  const [learningRate, setLearningRate] = useState([0.05]);
  const [explorationRate, setExplorationRate] = useState([0.2]);
  const [sentimentWeight, setSentimentWeight] = useState([0.6]);
  const [includeFundamentals, setIncludeFundamentals] = useState(true);
  const [runSimulation, setRunSimulation] = useState(false);

  const handleRunSimulation = () => {
    setRunSimulation(true);
    // In a real app, this would trigger an API call to run the simulation
    // For now, we'll just show mock data
    setTimeout(() => {
      setRunSimulation(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-1">AI Strategy Lab</h1>
        <p className="text-muted-foreground">
          Design and test reinforcement learning investment strategies
        </p>
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList>
          <TabsTrigger value="performance">Performance Analysis</TabsTrigger>
          <TabsTrigger value="configure">Configure Strategy</TabsTrigger>
          <TabsTrigger value="backtest">Backtest Results</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <DashboardCard 
              title="Market Profile" 
              description="Select market conditions to test"
              className="h-auto"
            >
              <div className="space-y-4">
                <div>
                  <Label htmlFor="profile">Strategy Profile</Label>
                  <Select value={profileType} onValueChange={setProfileType}>
                    <SelectTrigger id="profile">
                      <SelectValue placeholder="Select a profile" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservative">Conservative</SelectItem>
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="aggressive">Aggressive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="marketCondition">Market Condition</Label>
                  <Select defaultValue="mixed">
                    <SelectTrigger id="marketCondition">
                      <SelectValue placeholder="Select market condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bull">Bull Market</SelectItem>
                      <SelectItem value="bear">Bear Market</SelectItem>
                      <SelectItem value="volatile">Volatile Market</SelectItem>
                      <SelectItem value="mixed">Mixed Conditions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="timeframe">Timeframe</Label>
                  <Select defaultValue="6m">
                    <SelectTrigger id="timeframe">
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1m">1 Month</SelectItem>
                      <SelectItem value="3m">3 Months</SelectItem>
                      <SelectItem value="6m">6 Months</SelectItem>
                      <SelectItem value="1y">1 Year</SelectItem>
                      <SelectItem value="5y">5 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button onClick={handleRunSimulation} disabled={runSimulation}>
                  {runSimulation ? "Simulating..." : "Run Simulation"}
                </Button>
              </div>
            </DashboardCard>
            
            <DashboardCard 
              title="Strategy Performance" 
              description="RL agent vs. benchmark comparison"
              className="lg:col-span-2"
            >
              <div className="space-y-4">
                <StrategyComparisonChart data={mockStrategyPerformance[profileType as keyof typeof mockStrategyPerformance]} />
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">RL Strategy Return</p>
                    <p className="text-2xl font-bold text-primary">+15.3%</p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Benchmark Return</p>
                    <p className="text-2xl font-medium">+6.2%</p>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DashboardCard 
              title="Performance Metrics" 
              description="Key performance indicators"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Sharpe Ratio</p>
                    <p className="text-lg font-medium">1.82</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Max Drawdown</p>
                    <p className="text-lg font-medium">-8.4%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Volatility</p>
                    <p className="text-lg font-medium">12.6%</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Alpha</p>
                    <p className="text-lg font-medium">8.7%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Beta</p>
                    <p className="text-lg font-medium">0.75</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Win Rate</p>
                    <p className="text-lg font-medium">68%</p>
                  </div>
                </div>
              </div>
            </DashboardCard>
            
            <DashboardCard 
              title="Agent Behavior Analysis" 
              description="RL agent decision patterns"
            >
              <div className="space-y-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Key Findings</h3>
                  <ul className="text-sm space-y-2 list-disc pl-5">
                    <li>Agent showed strong preference for high-sentiment stocks during market volatility</li>
                    <li>Reduced exposure to technology sector 2 weeks before sector-wide decline</li>
                    <li>Maintained higher cash reserves during uncertain market conditions</li>
                    <li>Successfully identified positive sentiment shifts in energy sector</li>
                  </ul>
                </div>
                
                <div className="text-right">
                  <Button variant="outline" size="sm">
                    View Detailed Report
                  </Button>
                </div>
              </div>
            </DashboardCard>
          </div>
        </TabsContent>
        
        <TabsContent value="configure" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DashboardCard 
              title="Agent Parameters" 
              description="Configure reinforcement learning agent"
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="learning-rate">Learning Rate</Label>
                    <span className="text-sm">{learningRate[0].toFixed(2)}</span>
                  </div>
                  <Slider
                    id="learning-rate"
                    min={0.01}
                    max={0.2}
                    step={0.01}
                    value={learningRate}
                    onValueChange={setLearningRate}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="exploration-rate">Exploration Rate</Label>
                    <span className="text-sm">{explorationRate[0].toFixed(2)}</span>
                  </div>
                  <Slider
                    id="exploration-rate"
                    min={0.05}
                    max={0.5}
                    step={0.01}
                    value={explorationRate}
                    onValueChange={setExplorationRate}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="sentiment-weight">Sentiment Weight</Label>
                    <span className="text-sm">{sentimentWeight[0].toFixed(2)}</span>
                  </div>
                  <Slider
                    id="sentiment-weight"
                    min={0}
                    max={1}
                    step={0.05}
                    value={sentimentWeight}
                    onValueChange={setSentimentWeight}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="fundamentals"
                    checked={includeFundamentals}
                    onCheckedChange={setIncludeFundamentals}
                  />
                  <Label htmlFor="fundamentals">Include Fundamental Analysis</Label>
                </div>
              </div>
            </DashboardCard>
            
            <DashboardCard 
              title="Reward Function" 
              description="Configure how the agent evaluates success"
            >
              <div className="space-y-4">
                <div>
                  <Label>Optimization Target</Label>
                  <Select defaultValue="sharpe">
                    <SelectTrigger>
                      <SelectValue placeholder="Select optimization target" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="returns">Total Returns</SelectItem>
                      <SelectItem value="sharpe">Sharpe Ratio</SelectItem>
                      <SelectItem value="sortino">Sortino Ratio</SelectItem>
                      <SelectItem value="min-drawdown">Minimize Drawdown</SelectItem>
                      <SelectItem value="custom">Custom Blend</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Risk Tolerance</Label>
                  <Select defaultValue="moderate">
                    <SelectTrigger>
                      <SelectValue placeholder="Select risk tolerance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Advanced Settings</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Penalize Drawdowns</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Reward Consistency</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Time-Weighted Returns</span>
                    <Switch />
                  </div>
                </div>
              </div>
            </DashboardCard>
          </div>
          
          <DashboardCard 
            title="Feature Selection" 
            description="Select data inputs for the agent"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-muted/30 p-4 rounded-lg border">
                <h3 className="font-medium mb-3">Market Data</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked id="price-data" />
                    <Label htmlFor="price-data">Price Data</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked id="volume-data" />
                    <Label htmlFor="volume-data">Volume Data</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked id="volatility-data" />
                    <Label htmlFor="volatility-data">Volatility Metrics</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="market-breadth" />
                    <Label htmlFor="market-breadth">Market Breadth</Label>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg border">
                <h3 className="font-medium mb-3">Sentiment Data</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked id="news-sentiment" />
                    <Label htmlFor="news-sentiment">News Sentiment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked id="social-sentiment" />
                    <Label htmlFor="social-sentiment">Social Media Sentiment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="analyst-sentiment" />
                    <Label htmlFor="analyst-sentiment">Analyst Ratings</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked id="sentiment-trends" />
                    <Label htmlFor="sentiment-trends">Sentiment Trends</Label>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg border">
                <h3 className="font-medium mb-3">Fundamentals</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked id="earnings-data" />
                    <Label htmlFor="earnings-data">Earnings Data</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="balance-sheet" />
                    <Label htmlFor="balance-sheet">Balance Sheet Metrics</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked id="growth-metrics" />
                    <Label htmlFor="growth-metrics">Growth Metrics</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="valuation-metrics" />
                    <Label htmlFor="valuation-metrics">Valuation Metrics</Label>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg border">
                <h3 className="font-medium mb-3">Macroeconomic</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked id="interest-rates" />
                    <Label htmlFor="interest-rates">Interest Rates</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="inflation-data" />
                    <Label htmlFor="inflation-data">Inflation Data</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked id="economic-indicators" />
                    <Label htmlFor="economic-indicators">Economic Indicators</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="sector-trends" />
                    <Label htmlFor="sector-trends">Sector Trends</Label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <Button variant="outline">Reset to Default</Button>
              <Button>Save Configuration</Button>
            </div>
          </DashboardCard>
        </TabsContent>
        
        <TabsContent value="backtest" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DashboardCard 
              title="Backtest Parameters" 
              description="Configure historical simulation"
            >
              <div className="space-y-4">
                <div>
                  <Label>Backtest Period</Label>
                  <Select defaultValue="1y">
                    <SelectTrigger>
                      <SelectValue placeholder="Select backtest period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3m">3 Months</SelectItem>
                      <SelectItem value="6m">6 Months</SelectItem>
                      <SelectItem value="1y">1 Year</SelectItem>
                      <SelectItem value="3y">3 Years</SelectItem>
                      <SelectItem value="5y">5 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Initial Capital</Label>
                  <Select defaultValue="100000">
                    <SelectTrigger>
                      <SelectValue placeholder="Select initial capital" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10000">$10,000</SelectItem>
                      <SelectItem value="50000">$50,000</SelectItem>
                      <SelectItem value="100000">$100,000</SelectItem>
                      <SelectItem value="500000">$500,000</SelectItem>
                      <SelectItem value="1000000">$1,000,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Benchmark</Label>
                  <Select defaultValue="SPY">
                    <SelectTrigger>
                      <SelectValue placeholder="Select benchmark" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SPY">S&P 500 (SPY)</SelectItem>
                      <SelectItem value="QQQ">Nasdaq-100 (QQQ)</SelectItem>
                      <SelectItem value="IWM">Russell 2000 (IWM)</SelectItem>
                      <SelectItem value="VTI">Total Market (VTI)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked id="include-fees" />
                    <Label htmlFor="include-fees">Include Trading Fees</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked id="include-slippage" />
                    <Label htmlFor="include-slippage">Include Slippage</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="adjust-dividends" />
                    <Label htmlFor="adjust-dividends">Adjust for Dividends</Label>
                  </div>
                </div>
                
                <Button>Run Backtest</Button>
              </div>
            </DashboardCard>
            
            <DashboardCard 
              title="Backtest Results" 
              description="Historical performance analysis"
            >
              <div className="flex justify-center items-center h-[300px] bg-muted/30 rounded-lg border">
                <p className="text-muted-foreground">Run a backtest to see results</p>
              </div>
            </DashboardCard>
          </div>
          
          <DashboardCard 
            title="Strategy Comparison" 
            description="Compare different strategies and parameters"
          >
            <div className="text-center p-6 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground mb-4">No strategies to compare yet</p>
              <Button variant="outline">Add Strategy Comparison</Button>
            </div>
          </DashboardCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StrategyLab;
