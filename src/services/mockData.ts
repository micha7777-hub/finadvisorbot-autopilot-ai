
// Mock data for portfolio holdings
export const mockPortfolio = [
  { symbol: 'AAPL', name: 'Apple Inc.', shares: 15, price: 183.86, change: 0.76, changePercent: 0.41, costBasis: 160.24, sentimentScore: 0.72 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 10, price: 415.50, change: -2.38, changePercent: -0.57, costBasis: 380.60, sentimentScore: 0.64 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', shares: 8, price: 950.02, change: 25.43, changePercent: 2.75, costBasis: 700.30, sentimentScore: 0.88 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', shares: 12, price: 182.81, change: 0.34, changePercent: 0.19, costBasis: 145.20, sentimentScore: 0.51 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 8, price: 174.13, change: -1.26, changePercent: -0.72, costBasis: 140.50, sentimentScore: 0.43 },
  { symbol: 'META', name: 'Meta Platforms', shares: 6, price: 511.32, change: 4.87, changePercent: 0.96, costBasis: 380.75, sentimentScore: 0.65 },
  { symbol: 'TSLA', name: 'Tesla Inc.', shares: 5, price: 172.82, change: -3.58, changePercent: -2.03, costBasis: 200.40, sentimentScore: 0.30 }
];

// Mock portfolio performance data
export const mockPortfolioHistory = [
  { date: '2025-04-11', value: 25400 },
  { date: '2025-04-12', value: 25600 },
  { date: '2025-04-13', value: 25200 },
  { date: '2025-04-14', value: 25800 },
  { date: '2025-04-15', value: 26100 },
  { date: '2025-04-16', value: 26700 },
  { date: '2025-04-17', value: 26500 },
  { date: '2025-04-18', value: 26900 },
  { date: '2025-04-19', value: 27300 },
  { date: '2025-04-20', value: 27200 },
  { date: '2025-04-21', value: 27600 },
  { date: '2025-04-22', value: 27800 },
  { date: '2025-04-23', value: 28400 },
  { date: '2025-04-24', value: 28600 },
  { date: '2025-04-25', value: 28200 },
  { date: '2025-04-26', value: 28500 },
  { date: '2025-04-27', value: 29100 },
  { date: '2025-04-28', value: 28900 },
  { date: '2025-04-29', value: 29600 },
  { date: '2025-04-30', value: 30200 },
  { date: '2025-05-01', value: 30000 },
  { date: '2025-05-02', value: 30400 },
  { date: '2025-05-03', value: 30800 },
  { date: '2025-05-04', value: 31200 },
  { date: '2025-05-05', value: 31500 },
  { date: '2025-05-06', value: 31800 },
  { date: '2025-05-07', value: 32200 },
  { date: '2025-05-08', value: 32600 },
  { date: '2025-05-09', value: 32300 },
  { date: '2025-05-10', value: 32800 },
  { date: '2025-05-11', value: 33200 }
];

// Mock market indices data
export const mockMarketIndices = [
  { name: 'S&P 500', symbol: 'SPX', price: 5473.21, change: 35.42, changePercent: 0.65 },
  { name: 'Nasdaq', symbol: 'IXIC', price: 17615.75, change: 187.63, changePercent: 1.08 },
  { name: 'Dow Jones', symbol: 'DJI', price: 38513.61, change: -52.65, changePercent: -0.14 },
  { name: 'Russell 2000', symbol: 'RUT', price: 2026.39, change: 14.32, changePercent: 0.71 }
];

// Mock news data
export const mockNewsData = [
  {
    id: '1',
    title: 'Fed Signals Potential Rate Cut in June as Inflation Cools',
    summary: 'Federal Reserve officials hinted at a possible interest rate reduction in June following recent inflation data showing signs of cooling in the economy.',
    source: 'Financial Times',
    url: '#',
    publishedAt: '2025-05-11T10:23:00Z',
    sentiment: 'positive',
    sentimentScore: 0.76,
    relevantStocks: ['SPY', 'QQQ', 'DIA']
  },
  {
    id: '2',
    title: 'NVIDIA Unveils Next-Gen AI Chips, Analysts Project 30% Revenue Growth',
    summary: 'NVIDIA released its newest generation of AI processors, with analysts projecting substantial revenue growth as demand for AI computing continues to surge.',
    source: 'TechCrunch',
    url: '#',
    publishedAt: '2025-05-11T09:15:00Z',
    sentiment: 'very-positive',
    sentimentScore: 0.92,
    relevantStocks: ['NVDA', 'AMD', 'INTC']
  },
  {
    id: '3',
    title: 'Apple\'s AR Headset Launch Delayed Again, Supply Chain Issues Cited',
    summary: 'Apple has announced another delay in the launch of its augmented reality headset, citing ongoing supply chain challenges affecting production timelines.',
    source: 'Bloomberg',
    url: '#',
    publishedAt: '2025-05-11T08:37:00Z',
    sentiment: 'negative',
    sentimentScore: 0.31,
    relevantStocks: ['AAPL', 'MSFT', 'META']
  },
  {
    id: '4',
    title: 'Tesla Beats Q1 Delivery Expectations Despite EV Market Slowdown',
    summary: 'Tesla reported stronger-than-expected first-quarter deliveries, bucking the trend of a broader slowdown in the electric vehicle market.',
    source: 'Reuters',
    url: '#',
    publishedAt: '2025-05-11T07:50:00Z',
    sentiment: 'positive',
    sentimentScore: 0.68,
    relevantStocks: ['TSLA', 'F', 'GM']
  },
  {
    id: '5',
    title: 'Amazon Expands Healthcare Push with New Clinic Acquisitions',
    summary: 'Amazon is furthering its healthcare ambitions by acquiring a network of primary care clinics, signaling a deeper push into the healthcare sector.',
    source: 'Wall Street Journal',
    url: '#',
    publishedAt: '2025-05-11T07:12:00Z',
    sentiment: 'positive',
    sentimentScore: 0.65,
    relevantStocks: ['AMZN', 'CVS', 'UNH']
  }
];

// Mock top market movers
export const mockMarketMovers = [
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 950.02, change: 25.43, changePercent: 2.75, sentimentScore: 0.88 },
  { symbol: 'META', name: 'Meta Platforms', price: 511.32, change: 4.87, changePercent: 0.96, sentimentScore: 0.65 },
  { symbol: 'AAPL', name: 'Apple Inc.', price: 183.86, change: 0.76, changePercent: 0.41, sentimentScore: 0.72 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 172.82, change: -3.58, changePercent: -2.03, sentimentScore: 0.30 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 174.13, change: -1.26, changePercent: -0.72, sentimentScore: 0.43 }
];

// Mock stock details for the sentiment search
export const mockStockDetails = {
  'AAPL': {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 183.86,
    change: 0.76,
    changePercent: 0.41,
    marketCap: '2.82T',
    peRatio: 28.5,
    fiftyTwoWeekHigh: 198.23,
    fiftyTwoWeekLow: 142.37,
    sentiment: 'positive',
    sentimentScore: 0.72,
    news: [
      {
        id: '101',
        title: 'Apple\'s AR Headset Launch Delayed Again, Supply Chain Issues Cited',
        summary: 'Apple has announced another delay in the launch of its augmented reality headset, citing ongoing supply chain challenges affecting production timelines.',
        source: 'Bloomberg',
        publishedAt: '2025-05-11T08:37:00Z',
        sentiment: 'negative',
        sentimentScore: 0.31,
      },
      {
        id: '102',
        title: 'Apple Reports Record Services Revenue, iPhone Sales Steady',
        summary: 'Apple\'s latest quarterly report shows record revenue from services while iPhone sales remained steady despite market challenges.',
        source: 'CNBC',
        publishedAt: '2025-05-10T14:22:00Z',
        sentiment: 'positive',
        sentimentScore: 0.78,
      },
      {
        id: '103',
        title: 'Apple Intelligence Features Coming to iOS 19, Analysts Say',
        summary: 'Analysts predict Apple will introduce significant AI features in iOS 19, potentially boosting device sales in the coming upgrade cycle.',
        source: 'MacRumors',
        publishedAt: '2025-05-09T11:15:00Z',
        sentiment: 'very-positive',
        sentimentScore: 0.85,
      }
    ],
    aiSuggestion: 'Hold',
    aiReasoning: 'While Apple shows strong services growth and promising AI developments, hardware challenges with AR headset delays create uncertainty. Current valuation appears fair given mixed signals.'
  },
  'NVDA': {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 950.02,
    change: 25.43,
    changePercent: 2.75,
    marketCap: '2.34T',
    peRatio: 68.2,
    fiftyTwoWeekHigh: 974.00,
    fiftyTwoWeekLow: 438.16,
    sentiment: 'very-positive',
    sentimentScore: 0.88,
    news: [
      {
        id: '201',
        title: 'NVIDIA Unveils Next-Gen AI Chips, Analysts Project 30% Revenue Growth',
        summary: 'NVIDIA released its newest generation of AI processors, with analysts projecting substantial revenue growth as demand for AI computing continues to surge.',
        source: 'TechCrunch',
        publishedAt: '2025-05-11T09:15:00Z',
        sentiment: 'very-positive',
        sentimentScore: 0.92,
      },
      {
        id: '202',
        title: 'NVIDIA Partners with Leading Cloud Providers on AI Infrastructure',
        summary: 'NVIDIA announced expanded partnerships with major cloud providers to deploy its latest AI infrastructure solutions across global data centers.',
        source: 'VentureBeat',
        publishedAt: '2025-05-10T13:45:00Z',
        sentiment: 'positive',
        sentimentScore: 0.82,
      },
      {
        id: '203',
        title: 'Semiconductor Supply Chain Normalization Could Impact NVIDIA Margins',
        summary: 'Industry analysts note that normalizing semiconductor supply chains could affect NVIDIA\'s historically high margins as competition intensifies.',
        source: 'Barron\'s',
        publishedAt: '2025-05-09T16:30:00Z',
        sentiment: 'neutral',
        sentimentScore: 0.48,
      }
    ],
    aiSuggestion: 'Buy',
    aiReasoning: 'Despite high valuation, NVIDIA maintains dominant position in AI hardware with continued innovation and strong partnerships. Next-gen chips and projected revenue growth justify maintaining or increasing positions.'
  }
};

// Mock AI Strategy data
export const mockStrategyPerformance = {
  conservative: [
    { date: '2025-01-01', rlAgent: 100, benchmark: 100 },
    { date: '2025-02-01', rlAgent: 102, benchmark: 101 },
    { date: '2025-03-01', rlAgent: 103, benchmark: 100 },
    { date: '2025-04-01', rlAgent: 105, benchmark: 102 },
    { date: '2025-05-01', rlAgent: 107, benchmark: 103 }
  ],
  balanced: [
    { date: '2025-01-01', rlAgent: 100, benchmark: 100 },
    { date: '2025-02-01', rlAgent: 103, benchmark: 101 },
    { date: '2025-03-01', rlAgent: 101, benchmark: 99 },
    { date: '2025-04-01', rlAgent: 107, benchmark: 102 },
    { date: '2025-05-01', rlAgent: 111, benchmark: 105 }
  ],
  aggressive: [
    { date: '2025-01-01', rlAgent: 100, benchmark: 100 },
    { date: '2025-02-01', rlAgent: 105, benchmark: 101 },
    { date: '2025-03-01', rlAgent: 98, benchmark: 97 },
    { date: '2025-04-01', rlAgent: 109, benchmark: 103 },
    { date: '2025-05-01', rlAgent: 115, benchmark: 106 }
  ]
};

// Mock settings
export const mockSettings = {
  autopilot: false,
  riskProfile: 'balanced',
  notificationsEnabled: true,
  alertThreshold: 5,
  emailNotifications: true,
  smsNotifications: false,
  email: 'user@example.com',
  phone: '+1234567890',
};
