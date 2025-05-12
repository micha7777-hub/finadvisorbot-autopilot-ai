
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
}

/**
 * Save the user's portfolio to localStorage
 * @param userId User ID
 * @param stocks Stock holdings
 * @param cashBalance Cash balance
 */
export const savePortfolio = (userId: string, stocks: StockHolding[], cashBalance: number): void => {
  try {
    const portfolio: Portfolio = {
      stocks,
      cashBalance,
      lastUpdated: new Date().toISOString(),
    };
    
    const portfoliosJson = localStorage.getItem('portfolios') || '{}';
    const portfolios = JSON.parse(portfoliosJson);
    
    portfolios[userId] = portfolio;
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
 * @returns Portfolio data or null if not found
 */
export const loadPortfolio = (userId: string): Portfolio | null => {
  try {
    const portfoliosJson = localStorage.getItem('portfolios') || '{}';
    const portfolios = JSON.parse(portfoliosJson);
    
    return portfolios[userId] || null;
  } catch (error) {
    console.error('Failed to load portfolio', error);
    return null;
  }
};

/**
 * Hook to manage portfolio data with auto-saving
 */
export const usePortfolio = () => {
  const { user } = useAuth();
  
  const saveUserPortfolio = (stocks: StockHolding[], cashBalance: number) => {
    if (!user) return;
    savePortfolio(user.id, stocks, cashBalance);
  };
  
  const loadUserPortfolio = (): Portfolio | null => {
    if (!user) return null;
    return loadPortfolio(user.id);
  };
  
  return {
    saveUserPortfolio,
    loadUserPortfolio,
  };
};
