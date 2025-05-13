
import React, { useState } from "react";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { StrategyComparisonChart } from "@/components/charts/StrategyComparisonChart";
import { Loader2, Calculator, Settings, BarChart as BarChartIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

type RiskTolerance = "conservative" | "balanced" | "aggressive";
type InvestmentHorizon = "short" | "medium" | "long";
type InvestmentGoal = "growth" | "income" | "preservation";

interface AIStrategyGeneratorProps {
  onGenerate: (strategy: any) => void;
  isGenerating: boolean;
}

const AIStrategyGenerator: React.FC<AIStrategyGeneratorProps> = ({ onGenerate, isGenerating }) => {
  const [riskTolerance, setRiskTolerance] = useState<RiskTolerance>("balanced");
  const [investmentHorizon, setInvestmentHorizon] = useState<InvestmentHorizon>("medium");
  const [investmentGoal, setInvestmentGoal] = useState<InvestmentGoal>("growth");
  const [initialInvestment, setInitialInvestment] = useState(10000);
  
  const handleGenerate = () => {
    onGenerate({
      riskTolerance,
      investmentHorizon,
      investmentGoal,
      initialInvestment
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Configure your investment strategy</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="font-medium">Risk Tolerance</Label>
            <RadioGroup
              value={riskTolerance}
              onValueChange={(value) => setRiskTolerance(value as RiskTolerance)}
              className="grid grid-cols-3 gap-4"
            >
              <Label
                htmlFor="conservative"
                className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent cursor-pointer ${
                  riskTolerance === "conservative" ? "border-primary" : "border-muted"
                }`}
              >
                <RadioGroupItem value="conservative" id="conservative" className="sr-only" />
                <span className="text-base font-medium">Conservative</span>
                <span className="text-xs text-muted-foreground mt-1">Lower risk & returns</span>
              </Label>
              <Label
                htmlFor="balanced"
                className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent cursor-pointer ${
                  riskTolerance === "balanced" ? "border-primary" : "border-muted"
                }`}
              >
                <RadioGroupItem value="balanced" id="balanced" className="sr-only" />
                <span className="text-base font-medium">Balanced</span>
                <span className="text-xs text-muted-foreground mt-1">Moderate risk & returns</span>
              </Label>
              <Label
                htmlFor="aggressive"
                className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent cursor-pointer ${
                  riskTolerance === "aggressive" ? "border-primary" : "border-muted"
                }`}
              >
                <RadioGroupItem value="aggressive" id="aggressive" className="sr-only" />
                <span className="text-base font-medium">Aggressive</span>
                <span className="text-xs text-muted-foreground mt-1">Higher risk & returns</span>
              </Label>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label className="font-medium">Investment Horizon</Label>
            <RadioGroup
              value={investmentHorizon}
              onValueChange={(value) => setInvestmentHorizon(value as InvestmentHorizon)}
              className="grid grid-cols-3 gap-4"
            >
              <Label
                htmlFor="short"
                className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent cursor-pointer ${
                  investmentHorizon === "short" ? "border-primary" : "border-muted"
                }`}
              >
                <RadioGroupItem value="short" id="short" className="sr-only" />
                <span className="text-base font-medium">Short-term</span>
                <span className="text-xs text-muted-foreground mt-1">1-3 years</span>
              </Label>
              <Label
                htmlFor="medium"
                className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent cursor-pointer ${
                  investmentHorizon === "medium" ? "border-primary" : "border-muted"
                }`}
              >
                <RadioGroupItem value="medium" id="medium" className="sr-only" />
                <span className="text-base font-medium">Medium-term</span>
                <span className="text-xs text-muted-foreground mt-1">3-7 years</span>
              </Label>
              <Label
                htmlFor="long"
                className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent cursor-pointer ${
                  investmentHorizon === "long" ? "border-primary" : "border-muted"
                }`}
              >
                <RadioGroupItem value="long" id="long" className="sr-only" />
                <span className="text-base font-medium">Long-term</span>
                <span className="text-xs text-muted-foreground mt-1">7+ years</span>
              </Label>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label className="font-medium">Investment Goal</Label>
            <RadioGroup
              value={investmentGoal}
              onValueChange={(value) => setInvestmentGoal(value as InvestmentGoal)}
              className="grid grid-cols-3 gap-4"
            >
              <Label
                htmlFor="growth"
                className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent cursor-pointer ${
                  investmentGoal === "growth" ? "border-primary" : "border-muted"
                }`}
              >
                <RadioGroupItem value="growth" id="growth" className="sr-only" />
                <span className="text-base font-medium">Growth</span>
                <span className="text-xs text-muted-foreground mt-1">Capital appreciation</span>
              </Label>
              <Label
                htmlFor="income"
                className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent cursor-pointer ${
                  investmentGoal === "income" ? "border-primary" : "border-muted"
                }`}
              >
                <RadioGroupItem value="income" id="income" className="sr-only" />
                <span className="text-base font-medium">Income</span>
                <span className="text-xs text-muted-foreground mt-1">Regular dividends</span>
              </Label>
              <Label
                htmlFor="preservation"
                className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent cursor-pointer ${
                  investmentGoal === "preservation" ? "border-primary" : "border-muted"
                }`}
              >
                <RadioGroupItem value="preservation" id="preservation" className="sr-only" />
                <span className="text-base font-medium">Preservation</span>
                <span className="text-xs text-muted-foreground mt-1">Protect capital</span>
              </Label>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="font-medium">Initial Investment</Label>
              <span className="text-sm font-medium">${initialInvestment.toLocaleString()}</span>
            </div>
            <Slider
              value={[initialInvestment]}
              min={1000}
              max={100000}
              step={1000}
              onValueChange={(values) => setInitialInvestment(values[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$1,000</span>
              <span>$100,000</span>
            </div>
          </div>
          
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Strategy...
              </>
            ) : (
              <>
                <Calculator className="mr-2 h-4 w-4" />
                Generate AI Strategy
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

const StrategyLab: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStrategy, setGeneratedStrategy] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  
  const handleGenerateStrategy = (config: any) => {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const strategy = generateStrategyBasedOnConfig(config);
      setGeneratedStrategy(strategy);
      setIsGenerating(false);
    }, 2000);
  };
  
  // Generate a strategy based on the user's configuration
  const generateStrategyBasedOnConfig = (config: any) => {
    const { riskTolerance, investmentHorizon, investmentGoal, initialInvestment } = config;
    
    // Base portfolio allocation
    let stocks = 0;
    let bonds = 0;
    let cash = 0;
    
    // Adjust based on risk tolerance
    if (riskTolerance === "conservative") {
      stocks = 30;
      bonds = 60;
      cash = 10;
    } else if (riskTolerance === "balanced") {
      stocks = 60;
      bonds = 35;
      cash = 5;
    } else {
      stocks = 80;
      bonds = 15;
      cash = 5;
    }
    
    // Adjust based on investment horizon
    if (investmentHorizon === "short") {
      stocks -= 10;
      bonds += 5;
      cash += 5;
    } else if (investmentHorizon === "long") {
      stocks += 10;
      bonds -= 5;
      cash -= 5;
      if (cash < 0) {
        bonds += cash;
        cash = 0;
      }
    }
    
    // Adjust based on investment goal
    if (investmentGoal === "income") {
      stocks -= 10;
      bonds += 10;
    } else if (investmentGoal === "preservation") {
      stocks -= 20;
      bonds -= 10;
      cash += 30;
    }
    
    // Ensure allocations are valid
    stocks = Math.max(0, Math.min(100, stocks));
    bonds = Math.max(0, Math.min(100, bonds));
    cash = Math.max(0, Math.min(100, cash));
    
    // Normalize to 100%
    const total = stocks + bonds + cash;
    stocks = Math.round((stocks / total) * 100);
    bonds = Math.round((bonds / total) * 100);
    cash = 100 - stocks - bonds;
    
    // Generate performance comparison data
    const performanceData = generatePerformanceData(riskTolerance);
    
    // Recommended ETFs based on allocation
    const recommendations = generateRecommendations(stocks, bonds, cash, investmentGoal);
    
    return {
      allocation: {
        stocks,
        bonds,
        cash
      },
      performanceData,
      expectedReturn: estimateExpectedReturn(riskTolerance, investmentHorizon),
      expectedRisk: estimateExpectedRisk(riskTolerance),
      recommendations,
      projectedValue: projectInvestmentValue(initialInvestment, riskTolerance, investmentHorizon)
    };
  };
  
  // Helper function to generate performance comparison data
  const generatePerformanceData = (riskTolerance: RiskTolerance) => {
    const data = [];
    const today = new Date();
    
    // Base return rates
    let rlAgentBaseReturn = 0;
    let benchmarkBaseReturn = 0;
    
    // Set base returns based on risk tolerance
    if (riskTolerance === "conservative") {
      rlAgentBaseReturn = 0.05; // 5% annual
      benchmarkBaseReturn = 0.04; // 4% annual
    } else if (riskTolerance === "balanced") {
      rlAgentBaseReturn = 0.08; // 8% annual
      benchmarkBaseReturn = 0.06; // 6% annual
    } else {
      rlAgentBaseReturn = 0.12; // 12% annual
      benchmarkBaseReturn = 0.09; // 9% annual
    }
    
    // Convert to daily return
    const rlAgentDailyReturn = Math.pow(1 + rlAgentBaseReturn, 1/365) - 1;
    const benchmarkDailyReturn = Math.pow(1 + benchmarkBaseReturn, 1/365) - 1;
    
    let rlAgentValue = 100;
    let benchmarkValue = 100;
    
    // Generate 30 days of data
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Add some random volatility
      const rlVolatility = (Math.random() - 0.5) * 0.02; // ±1% daily volatility
      const benchmarkVolatility = (Math.random() - 0.5) * 0.015; // ±0.75% daily volatility
      
      // Calculate daily return
      rlAgentValue *= (1 + rlAgentDailyReturn + rlVolatility);
      benchmarkValue *= (1 + benchmarkDailyReturn + benchmarkVolatility);
      
      data.push({
        date: date.toISOString().split('T')[0],
        rlAgent: parseFloat(rlAgentValue.toFixed(2)),
        benchmark: parseFloat(benchmarkValue.toFixed(2))
      });
    }
    
    return data;
  };
  
  // Helper function to estimate expected return
  const estimateExpectedReturn = (riskTolerance: RiskTolerance, horizon: InvestmentHorizon) => {
    let baseReturn = 0;
    
    // Base return by risk tolerance
    if (riskTolerance === "conservative") {
      baseReturn = 4;
    } else if (riskTolerance === "balanced") {
      baseReturn = 7;
    } else {
      baseReturn = 10;
    }
    
    // Adjust for horizon
    if (horizon === "short") {
      baseReturn -= 1;
    } else if (horizon === "long") {
      baseReturn += 1;
    }
    
    // Add some randomness
    return baseReturn + (Math.random() - 0.5) * 2;
  };
  
  // Helper function to estimate expected risk
  const estimateExpectedRisk = (riskTolerance: RiskTolerance) => {
    // Risk levels on a scale of 1-10
    if (riskTolerance === "conservative") {
      return 3 + (Math.random() * 2);
    } else if (riskTolerance === "balanced") {
      return 5 + (Math.random() * 2);
    } else {
      return 7 + (Math.random() * 2);
    }
  };
  
  // Helper function to generate ETF recommendations
  const generateRecommendations = (stocks: number, bonds: number, cash: number, goal: InvestmentGoal) => {
    const recommendations = [];
    
    // Stock ETFs
    if (stocks > 0) {
      if (stocks >= 70) {
        recommendations.push({ 
          ticker: "VTI",
          name: "Vanguard Total Stock Market ETF",
          allocation: Math.floor(stocks * 0.7),
          type: "stocks",
          expense: 0.03
        });
        recommendations.push({ 
          ticker: "VXUS",
          name: "Vanguard Total International Stock ETF",
          allocation: stocks - Math.floor(stocks * 0.7),
          type: "stocks",
          expense: 0.08
        });
      } else {
        recommendations.push({ 
          ticker: "VTI",
          name: "Vanguard Total Stock Market ETF",
          allocation: Math.floor(stocks * 0.6),
          type: "stocks",
          expense: 0.03
        });
        
        if (goal === "income") {
          recommendations.push({ 
            ticker: "VYM",
            name: "Vanguard High Dividend Yield ETF",
            allocation: stocks - Math.floor(stocks * 0.6),
            type: "stocks",
            expense: 0.06
          });
        } else {
          recommendations.push({ 
            ticker: "VXUS",
            name: "Vanguard Total International Stock ETF",
            allocation: stocks - Math.floor(stocks * 0.6),
            type: "stocks",
            expense: 0.08
          });
        }
      }
    }
    
    // Bond ETFs
    if (bonds > 0) {
      if (goal === "income" && bonds >= 20) {
        recommendations.push({ 
          ticker: "BND",
          name: "Vanguard Total Bond Market ETF",
          allocation: Math.floor(bonds * 0.6),
          type: "bonds",
          expense: 0.04
        });
        recommendations.push({ 
          ticker: "VCLT",
          name: "Vanguard Long-Term Corporate Bond ETF",
          allocation: bonds - Math.floor(bonds * 0.6),
          type: "bonds",
          expense: 0.04
        });
      } else {
        recommendations.push({ 
          ticker: "BND",
          name: "Vanguard Total Bond Market ETF",
          allocation: bonds,
          type: "bonds",
          expense: 0.04
        });
      }
    }
    
    // Cash equivalents
    if (cash > 0) {
      recommendations.push({ 
        ticker: "VMFXX",
        name: "Vanguard Federal Money Market Fund",
        allocation: cash,
        type: "cash",
        expense: 0.11
      });
    }
    
    return recommendations;
  };
  
  // Helper function to project investment value
  const projectInvestmentValue = (initialInvestment: number, riskTolerance: RiskTolerance, horizon: InvestmentHorizon) => {
    // Determine years based on horizon
    let years = 0;
    if (horizon === "short") {
      years = 2;
    } else if (horizon === "medium") {
      years = 5;
    } else {
      years = 10;
    }
    
    // Determine annual return based on risk tolerance
    let annualReturn = 0;
    if (riskTolerance === "conservative") {
      annualReturn = 0.04 + (Math.random() * 0.02);
    } else if (riskTolerance === "balanced") {
      annualReturn = 0.06 + (Math.random() * 0.03);
    } else {
      annualReturn = 0.08 + (Math.random() * 0.04);
    }
    
    // Calculate future value
    const futureValue = initialInvestment * Math.pow(1 + annualReturn, years);
    
    return {
      years,
      futureValue: Math.round(futureValue),
      annualReturn: annualReturn * 100
    };
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-1">AI Strategy Lab</h1>
        <p className="text-muted-foreground">
          Generate personalized investment strategies powered by AI and reinforcement learning
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardCard 
          title="Strategy Generator" 
          description="Configure your preferences and goals"
          className="lg:col-span-1"
        >
          <AIStrategyGenerator 
            onGenerate={handleGenerateStrategy}
            isGenerating={isGenerating}
          />
        </DashboardCard>
        
        {generatedStrategy ? (
          <DashboardCard 
            title="Generated Strategy" 
            description="AI-optimized investment plan based on your preferences"
            className="lg:col-span-2"
          >
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Strategy Overview
                </TabsTrigger>
                <TabsTrigger value="performance" className="flex items-center gap-2">
                  <BarChartIcon className="h-4 w-4" />
                  Performance Analysis
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <h3 className="text-lg font-medium mb-2">Asset Allocation</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Stocks</span>
                        <div className="flex items-center">
                          <div className="h-3 w-3 bg-primary rounded-full mr-2"></div>
                          <span className="font-medium">{generatedStrategy.allocation.stocks}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-muted h-2 rounded-full">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${generatedStrategy.allocation.stocks}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <span>Bonds</span>
                        <div className="flex items-center">
                          <div className="h-3 w-3 bg-secondary rounded-full mr-2"></div>
                          <span className="font-medium">{generatedStrategy.allocation.bonds}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-muted h-2 rounded-full">
                        <div 
                          className="bg-secondary h-2 rounded-full" 
                          style={{ width: `${generatedStrategy.allocation.bonds}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <span>Cash</span>
                        <div className="flex items-center">
                          <div className="h-3 w-3 bg-muted-foreground rounded-full mr-2"></div>
                          <span className="font-medium">{generatedStrategy.allocation.cash}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-muted h-2 rounded-full">
                        <div 
                          className="bg-muted-foreground h-2 rounded-full" 
                          style={{ width: `${generatedStrategy.allocation.cash}%` }}
                        ></div>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4">
                    <h3 className="text-lg font-medium mb-2">Expected Metrics</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Expected Return</span>
                          <span className="font-medium text-success">
                            {generatedStrategy.expectedReturn.toFixed(1)}% per year
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Risk Level</span>
                          <span className="font-medium">
                            {generatedStrategy.expectedRisk.toFixed(1)}/10
                          </span>
                        </div>
                        <div className="w-full bg-muted h-2 rounded-full mt-1">
                          <div 
                            className="bg-warning h-2 rounded-full" 
                            style={{ width: `${(generatedStrategy.expectedRisk / 10) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <p className="text-muted-foreground mb-1 text-sm">Projected Value</p>
                        <p className="font-bold text-xl">
                          ${generatedStrategy.projectedValue.futureValue.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          in {generatedStrategy.projectedValue.years} years at {generatedStrategy.projectedValue.annualReturn.toFixed(1)}% annual return
                        </p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4">
                    <h3 className="text-lg font-medium mb-2">Key Features</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <div className="bg-primary/20 text-primary p-1 rounded mr-2 mt-0.5">
                          <Settings className="h-3 w-3" />
                        </div>
                        <span>Diversification across major asset classes</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-primary/20 text-primary p-1 rounded mr-2 mt-0.5">
                          <Settings className="h-3 w-3" />
                        </div>
                        <span>Low-cost ETFs for efficient implementation</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-primary/20 text-primary p-1 rounded mr-2 mt-0.5">
                          <Settings className="h-3 w-3" />
                        </div>
                        <span>Tax-efficient investment selection</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-primary/20 text-primary p-1 rounded mr-2 mt-0.5">
                          <Settings className="h-3 w-3" />
                        </div>
                        <span>Optimized for your risk tolerance</span>
                      </li>
                    </ul>
                  </Card>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Recommended ETFs</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left font-medium py-2 px-4">Ticker</th>
                          <th className="text-left font-medium py-2 px-4">Name</th>
                          <th className="text-right font-medium py-2 px-4">Type</th>
                          <th className="text-right font-medium py-2 px-4">Allocation</th>
                          <th className="text-right font-medium py-2 px-4">Expense Ratio</th>
                        </tr>
                      </thead>
                      <tbody>
                        {generatedStrategy.recommendations.map((rec: any, index: number) => (
                          <tr key={index} className="border-b hover:bg-muted/30">
                            <td className="py-2 px-4 font-medium">{rec.ticker}</td>
                            <td className="py-2 px-4">{rec.name}</td>
                            <td className="py-2 px-4 text-right capitalize">{rec.type}</td>
                            <td className="py-2 px-4 text-right">{rec.allocation}%</td>
                            <td className="py-2 px-4 text-right">{rec.expense}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="flex justify-center mt-6">
                  <Button className="mr-2">Download Strategy PDF</Button>
                  <Button variant="outline">Apply to My Portfolio</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="performance">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Strategy Performance vs Benchmark</h3>
                    <div className="h-[350px]">
                      <StrategyComparisonChart data={generatedStrategy.performanceData} />
                    </div>
                    <div className="flex justify-center mt-4 gap-8 text-sm">
                      <div className="flex items-center">
                        <div className="h-3 w-3 bg-primary rounded-full mr-2"></div>
                        <span>AI Strategy</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-3 w-3 bg-muted-foreground rounded-full mr-2"></div>
                        <span>Benchmark</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h3 className="text-lg font-medium mb-3">Performance Metrics</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Projected Annual Return</span>
                          <span className="font-medium">
                            {generatedStrategy.expectedReturn.toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Benchmark Return</span>
                          <span className="font-medium">
                            {(generatedStrategy.expectedReturn - 1.5).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between text-sm border-t pt-2">
                          <span className="text-muted-foreground">Projected Alpha</span>
                          <span className="font-medium text-success">
                            +1.5%
                          </span>
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="p-4">
                      <h3 className="text-lg font-medium mb-3">Risk Analysis</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Projected Volatility</span>
                          <span className="font-medium">
                            {(5 + generatedStrategy.expectedRisk / 2).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Sharpe Ratio</span>
                          <span className="font-medium">
                            {(generatedStrategy.expectedReturn / (5 + generatedStrategy.expectedRisk / 2)).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Max Drawdown</span>
                          <span className="font-medium text-destructive">
                            -{(10 + generatedStrategy.expectedRisk).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DashboardCard>
        ) : (
          <div className="lg:col-span-2 flex items-center justify-center bg-muted/30 rounded-lg border border-dashed p-8">
            <div className="text-center max-w-md">
              <BarChartIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-medium mb-2">Generate Your Strategy</h3>
              <p className="text-muted-foreground mb-6">
                Configure your investment preferences on the left and click "Generate AI Strategy" to see personalized recommendations.
              </p>
              <Button variant="secondary" onClick={() => handleGenerateStrategy({
                riskTolerance: "balanced",
                investmentHorizon: "medium",
                investmentGoal: "growth",
                initialInvestment: 10000
              })}>
                Generate Sample Strategy
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StrategyLab;
