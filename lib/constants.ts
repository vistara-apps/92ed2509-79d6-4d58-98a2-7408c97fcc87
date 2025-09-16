// API endpoints
export const API_ENDPOINTS = {
  BASE_RPC: process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://developer-rpc.base.org',
  COINGECKO: 'https://api.coingecko.com/api/v3',
  ALCHEMY: process.env.NEXT_PUBLIC_ALCHEMY_URL || '',
} as const;

// Subscription tiers
export const SUBSCRIPTION_TIERS = {
  free: {
    name: 'Free',
    price: 0,
    walletLimit: 1,
    features: ['Basic transaction history', 'Single wallet connection'],
    analyticsEnabled: false,
    impactAnalysisEnabled: false,
  },
  pro: {
    name: 'Pro',
    price: 5,
    walletLimit: 10,
    features: [
      'Unlimited wallet connections',
      'Advanced analytics',
      'Contract interaction explorer',
      'Portfolio performance tracking',
    ],
    analyticsEnabled: true,
    impactAnalysisEnabled: false,
  },
  premium: {
    name: 'Premium',
    price: 15,
    walletLimit: -1, // Unlimited
    features: [
      'Everything in Pro',
      'Token flow impact analysis',
      'Priority support',
      'Advanced reporting',
      'API access',
    ],
    analyticsEnabled: true,
    impactAnalysisEnabled: true,
  },
} as const;

// Network configurations
export const NETWORKS = {
  base: {
    id: 8453,
    name: 'Base',
    rpcUrl: 'https://developer-rpc.base.org',
    explorerUrl: 'https://basescan.org',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
  },
} as const;

// Common token addresses on Base
export const TOKEN_ADDRESSES = {
  WETH: '0x4200000000000000000000000000000000000006',
  USDC: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  DAI: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
  CBETH: '0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22',
} as const;

// Transaction types
export const TRANSACTION_TYPES = {
  SEND: 'send',
  RECEIVE: 'receive',
  CONTRACT: 'contract',
  SWAP: 'swap',
} as const;

// Chart colors
export const CHART_COLORS = {
  primary: '#2dd4bf', // crypto-teal
  secondary: '#22c55e', // crypto-green
  accent: '#f59e0b', // crypto-orange
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  success: '#22c55e',
} as const;

// Animation durations
export const ANIMATION_DURATION = {
  fast: 150,
  base: 200,
  slow: 300,
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Default pagination
export const PAGINATION = {
  defaultPageSize: 20,
  maxPageSize: 100,
} as const;

// Cache durations (in milliseconds)
export const CACHE_DURATION = {
  transactions: 30000, // 30 seconds
  prices: 60000, // 1 minute
  balances: 15000, // 15 seconds
} as const;
