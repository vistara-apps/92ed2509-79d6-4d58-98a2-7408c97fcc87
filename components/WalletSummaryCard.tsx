'use client';

import { Wallet, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { formatAddress, formatUSD, formatTokenAmount, formatPercentage } from '@/lib/utils';
import type { Wallet as WalletType, Transaction } from '@/lib/types';

interface WalletSummaryCardProps {
  wallet: WalletType;
  variant?: 'default' | 'compact';
  transactions?: Transaction[];
}

export function WalletSummaryCard({ 
  wallet, 
  variant = 'default',
  transactions = [] 
}: WalletSummaryCardProps) {
  // Calculate wallet metrics
  const recentTransactions = transactions.slice(0, 5);
  const totalTransactions = transactions.length;
  const last24hTransactions = transactions.filter(
    tx => new Date(tx.timestamp).getTime() > Date.now() - 24 * 60 * 60 * 1000
  ).length;
  
  // Mock performance data
  const performance24h = (Math.random() * 10 - 5); // -5% to +5%
  const isPositive = performance24h >= 0;

  if (variant === 'compact') {
    return (
      <div className="bg-slate-800/30 border border-slate-600/30 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-crypto-teal/20 rounded-lg flex items-center justify-center">
            <Wallet className="w-4 h-4 text-crypto-teal" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">
              {wallet.displayName || 'Wallet'}
            </div>
            <div className="text-xs text-slate-400 font-mono">
              {formatAddress(wallet.walletAddress, 6)}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-white">
              {wallet.usdValue ? formatUSD(wallet.usdValue) : '--'}
            </div>
            <div className="text-xs text-slate-400">
              {wallet.balance ? `${formatTokenAmount(wallet.balance)} ETH` : 'Loading...'}
            </div>
          </div>
          <div className={`flex items-center gap-1 text-sm ${
            isPositive ? 'text-crypto-green' : 'text-red-400'
          }`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{formatPercentage(Math.abs(performance24h))}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/30 border border-slate-600/30 rounded-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-crypto-teal/20 rounded-lg flex items-center justify-center">
            <Wallet className="w-6 h-6 text-crypto-teal" />
          </div>
          <div>
            <div className="text-lg font-semibold text-white">
              {wallet.displayName || 'Primary Wallet'}
            </div>
            <div className="text-sm text-slate-400 font-mono">
              {formatAddress(wallet.walletAddress, 8)}
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-white">
            {wallet.usdValue ? formatUSD(wallet.usdValue) : '--'}
          </div>
          <div className={`flex items-center gap-1 text-sm ${
            isPositive ? 'text-crypto-green' : 'text-red-400'
          }`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{formatPercentage(Math.abs(performance24h))} 24h</span>
          </div>
        </div>
      </div>

      {/* Balance */}
      <div className="bg-slate-700/20 rounded-lg p-4">
        <div className="text-sm text-slate-400 mb-1">ETH Balance</div>
        <div className="text-xl font-bold text-white">
          {wallet.balance ? formatTokenAmount(wallet.balance, 18, 6) : '0.000000'} ETH
        </div>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{totalTransactions}</div>
          <div className="text-xs text-slate-400">Total Transactions</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-crypto-teal">{last24hTransactions}</div>
          <div className="text-xs text-slate-400">Last 24h</div>
        </div>
      </div>

      {/* Recent Activity */}
      {recentTransactions.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-300">Recent Activity</span>
          </div>
          <div className="space-y-2">
            {recentTransactions.map((tx, index) => (
              <div key={tx.transactionHash} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    tx.type === 'send' ? 'bg-red-400' :
                    tx.type === 'receive' ? 'bg-crypto-green' :
                    'bg-blue-400'
                  }`} />
                  <span className="text-slate-400 capitalize">{tx.type}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">{formatAddress(tx.to)}</span>
                </div>
                <div className="text-slate-300">
                  {tx.tokenTransfers[0] ? (
                    `${formatTokenAmount(tx.tokenTransfers[0].amount, 18, 2)} ${tx.tokenTransfers[0].tokenSymbol}`
                  ) : (
                    `${formatTokenAmount(tx.value)} ETH`
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
