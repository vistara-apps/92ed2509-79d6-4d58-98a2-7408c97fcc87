import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format wallet address for display
export function formatAddress(address: string, chars = 4): string {
  if (!address) return '';
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

// Format token amounts
export function formatTokenAmount(amount: string | number, decimals = 18, precision = 4): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '0';
  
  const divisor = Math.pow(10, decimals);
  const formatted = (num / divisor).toFixed(precision);
  
  // Remove trailing zeros
  return parseFloat(formatted).toString();
}

// Format USD values
export function formatUSD(amount: number): string {
  if (amount === 0) return '$0.00';
  if (amount < 0.01) return '<$0.01';
  if (amount < 1) return `$${amount.toFixed(3)}`;
  if (amount < 1000) return `$${amount.toFixed(2)}`;
  if (amount < 1000000) return `$${(amount / 1000).toFixed(1)}K`;
  return `$${(amount / 1000000).toFixed(1)}M`;
}

// Format percentage changes
export function formatPercentage(change: number): string {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}%`;
}

// Format time ago
export function formatTimeAgo(timestamp: Date | number): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return date.toLocaleDateString();
}

// Get transaction type icon and color
export function getTransactionTypeInfo(type: string) {
  switch (type) {
    case 'send':
      return { icon: '↗', color: 'text-red-400', bgColor: 'bg-red-500/20' };
    case 'receive':
      return { icon: '↙', color: 'text-green-400', bgColor: 'bg-green-500/20' };
    case 'contract':
      return { icon: '⚙', color: 'text-blue-400', bgColor: 'bg-blue-500/20' };
    case 'swap':
      return { icon: '⇄', color: 'text-purple-400', bgColor: 'bg-purple-500/20' };
    default:
      return { icon: '•', color: 'text-gray-400', bgColor: 'bg-gray-500/20' };
  }
}

// Generate random transaction data for demo
export function generateMockTransactions(count = 10) {
  const types = ['send', 'receive', 'contract', 'swap'];
  const tokens = ['ETH', 'USDC', 'DAI', 'WETH'];
  
  return Array.from({ length: count }, (_, i) => ({
    transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
    blockNumber: 18000000 + i,
    timestamp: new Date(Date.now() - i * 3600000),
    from: `0x${Math.random().toString(16).substr(2, 40)}`,
    to: `0x${Math.random().toString(16).substr(2, 40)}`,
    value: (Math.random() * 10).toFixed(6),
    tokenTransfers: [{
      transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      tokenAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
      tokenSymbol: tokens[Math.floor(Math.random() * tokens.length)],
      amount: (Math.random() * 1000).toFixed(2),
      from: `0x${Math.random().toString(16).substr(2, 40)}`,
      to: `0x${Math.random().toString(16).substr(2, 40)}`,
      usdValue: Math.random() * 5000,
    }],
    contractInteractions: [],
    walletAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
    network: 'base',
    status: 'success' as const,
    type: types[Math.floor(Math.random() * types.length)] as any,
  }));
}

// Calculate portfolio metrics
export function calculatePortfolioMetrics(transactions: any[], wallets: any[]) {
  const totalValue = wallets.reduce((sum, wallet) => sum + (wallet.usdValue || 0), 0);
  const transactionCount = transactions.length;
  const activeContracts = new Set(
    transactions
      .flatMap(tx => tx.contractInteractions)
      .map(ci => ci.contractAddress)
  ).size;
  
  return {
    totalValue,
    totalChange24h: totalValue * (Math.random() * 0.1 - 0.05), // Mock 24h change
    totalChangePercent24h: (Math.random() * 10 - 5),
    transactionCount,
    activeContracts,
    topTokens: [], // Would be calculated from actual token holdings
  };
}

// Validate Ethereum address
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
