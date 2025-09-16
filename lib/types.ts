// Core data model types
export interface User {
  userId: string;
  farcasterUserId?: string;
  connectedWallets: Wallet[];
  subscriptionTier: 'free' | 'pro' | 'premium';
  createdAt: Date;
}

export interface Wallet {
  walletAddress: string;
  network: string;
  displayName?: string;
  userId: string;
  balance?: string;
  usdValue?: number;
}

export interface Transaction {
  transactionHash: string;
  blockNumber: number;
  timestamp: Date;
  from: string;
  to: string;
  value: string;
  gasUsed?: string;
  gasPrice?: string;
  tokenTransfers: TokenTransfer[];
  contractInteractions: ContractInteraction[];
  walletAddress: string;
  network: string;
  status: 'success' | 'failed' | 'pending';
  type: 'send' | 'receive' | 'contract' | 'swap';
}

export interface TokenTransfer {
  transactionHash: string;
  tokenAddress: string;
  tokenSymbol: string;
  tokenName?: string;
  amount: string;
  from: string;
  to: string;
  decimals?: number;
  usdValue?: number;
}

export interface ContractInteraction {
  transactionHash: string;
  contractAddress: string;
  functionName?: string;
  functionSignature?: string;
  contractName?: string;
  protocol?: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Component prop types
export interface WalletConnectorProps {
  variant?: 'default' | 'compact';
  onConnect?: (address: string) => void;
}

export interface TransactionListItemProps {
  transaction: Transaction;
  variant?: 'default' | 'contractCall';
  onClick?: (transaction: Transaction) => void;
}

export interface WalletSummaryCardProps {
  wallet: Wallet;
  variant?: 'default' | 'compact';
  transactions?: Transaction[];
}

export interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  variant?: 'default' | 'scrollable';
  loading?: boolean;
}

export interface TableColumn<T> {
  key: keyof T;
  header: string;
  render?: (value: any, item: T) => React.ReactNode;
  sortable?: boolean;
}

// Chart data types
export interface ChartDataPoint {
  timestamp: number;
  value: number;
  label?: string;
}

export interface PortfolioMetrics {
  totalValue: number;
  totalChange24h: number;
  totalChangePercent24h: number;
  topTokens: TokenHolding[];
  transactionCount: number;
  activeContracts: number;
}

export interface TokenHolding {
  tokenAddress: string;
  tokenSymbol: string;
  tokenName: string;
  balance: string;
  usdValue: number;
  change24h: number;
  changePercent24h: number;
}

// Hook return types
export interface UseWalletDataReturn {
  wallets: Wallet[];
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  addWallet: (address: string) => Promise<void>;
  removeWallet: (address: string) => void;
  refreshData: () => Promise<void>;
}

export interface UseTransactionHistoryReturn {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
}

// Subscription tiers
export interface SubscriptionTier {
  name: 'free' | 'pro' | 'premium';
  price: number;
  features: string[];
  walletLimit: number;
  analyticsEnabled: boolean;
  impactAnalysisEnabled: boolean;
}
