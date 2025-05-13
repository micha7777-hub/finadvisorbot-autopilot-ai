import { useAuth } from '@/contexts/AuthContext';

// Types for portfolio data
export interface StockHolding {
  symbol: string;
  name: string;
  shares: number;
  price: number;
  change: number;
  changePercent: number;
  costBasis: number;
  sentimentScore: number;
}

export interface Portfolio {
  stocks: StockHolding[];
  cashBalance: number;
  lastUpdated: string;
  portfolioHistory: Array<{
    date: string;
    value: number;
  }>;
}

/**
 * Save the user's portfolio to localStorage
 * @param userId User ID
 * @param portfolio Portfolio data
 */
export const savePortfolio = (userId: string, portfolio: Portfolio): void => {
  try {
    const portfoliosJson = localStorage.getItem('portfolios') || '{}';
    const portfolios = JSON.parse(portfoliosJson);
    
    // Add last updated timestamp
    const updatedPortfolio = {
      ...portfolio,
      lastUpdated: new Date().toISOString()
    };
    
    portfolios[userId] = updatedPortfolio;
    localStorage.setItem('portfolios', JSON.stringify(portfolios));
    
    console.log('Portfolio saved successfully');
  } catch (error) {
    console.error('Failed to save portfolio', error);
    throw new Error('Failed to save portfolio');
  }
};

/**
 * Load the user's portfolio from localStorage
 * @param userId User ID
 * @returns Portfolio data or new empty portfolio if not found
 */
export const loadPortfolio = (userId: string): Portfolio => {
  try {
    const portfoliosJson = localStorage.getItem('portfolios') || '{}';
    const portfolios = JSON.parse(portfoliosJson);
    
    // Return existing portfolio or create a new empty one
    return portfolios[userId] || createEmptyPortfolio();
  } catch (error) {
    console.error('Failed to load portfolio', error);
    return createEmptyPortfolio();
  }
};

/**
 * Create an empty portfolio object with default values
 */
export const createEmptyPortfolio = (): Portfolio => {
  return {
    stocks: [],
    cashBalance: 0,
    lastUpdated: new Date().toISOString(),
    portfolioHistory: generateEmptyPortfolioHistory()
  };
};

/**
 * Generate empty portfolio history for new users
 */
const generateEmptyPortfolioHistory = () => {
  const history = [];
  const today = new Date();
  
  // Generate 30 days of flat portfolio history (value = 0)
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    history.push({
      date: date.toISOString().split('T')[0],
      value: 0
    });
  }
  
  return history;
};

/**
 * Update portfolio history with current value
 */
export const updatePortfolioHistory = (portfolio: Portfolio, currentValue: number): Portfolio => {
  const today = new Date().toISOString().split('T')[0];
  
  // Check if we already have an entry for today
  const updatedHistory = [...portfolio.portfolioHistory];
  const todayIndex = updatedHistory.findIndex(item => item.date === today);
  
  if (todayIndex >= 0) {
    // Update today's value
    updatedHistory[todayIndex] = { date: today, value: currentValue };
  } else {
    // Add today's value
    updatedHistory.push({ date: today, value: currentValue });
    
    // Keep only the last 30 days
    if (updatedHistory.length > 30) {
      updatedHistory.shift();
    }
  }
  
  return {
    ...portfolio,
    portfolioHistory: updatedHistory
  };
};

/**
 * Hook to manage portfolio data with auto-saving
 */
export const usePortfolio = () => {
  const { user } = useAuth();
  
  const saveUserPortfolio = (portfolio: Portfolio) => {
    if (!user) return;
    savePortfolio(user.id, portfolio);
  };
  
  const loadUserPortfolio = (): Portfolio => {
    if (!user) return createEmptyPortfolio();
    return loadPortfolio(user.id);
  };
  
  const updatePortfolio = (updates: Partial<Portfolio>) => {
    if (!user) return;
    
    const currentPortfolio = loadPortfolio(user.id);
    const updatedPortfolio = {
      ...currentPortfolio,
      ...updates
    };
    
    savePortfolio(user.id, updatedPortfolio);
    return updatedPortfolio;
  };
  
  return {
    saveUserPortfolio,
    loadUserPortfolio,
    updatePortfolio
  };
};
