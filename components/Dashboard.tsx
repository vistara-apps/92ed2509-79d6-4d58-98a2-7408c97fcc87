'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { WalletConnector } from './WalletConnector';
import { TransactionHistory } from './TransactionHistory';
import { PortfolioOverview } from './PortfolioOverview';
import { ContractInteractions } from './ContractInteractions';
import { WalletSummaryCard } from './WalletSummaryCard';
import { generateMockTransactions, calculatePortfolioMetrics } from '@/lib/utils';
import type { Transaction, Wallet, PortfolioMetrics } from '@/lib/types';

export function Dashboard() {
  const { address, isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'contracts'>('overview');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [portfolioMetrics, setPortfolioMetrics] = useState<PortfolioMetrics | null>(null);
  const [loading, setLoading] = useState(false);

  // Mock data generation for demo
  useEffect(() => {
    if (isConnected && address) {
      setLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const mockTransactions = generateMockTransactions(25);
        const mockWallet: Wallet = {
          walletAddress: address,
          network: 'base',
          displayName: 'Primary Wallet',
          userId: 'user-1',
          balance: '2.45',
          usdValue: 4250.75,
        };
        
        setTransactions(mockTransactions);
        setWallets([mockWallet]);
        setPortfolioMetrics(calculatePortfolioMetrics(mockTransactions, [mockWallet]));
        setLoading(false);
      }, 1500);
    } else {
      setTransactions([]);
      setWallets([]);
      setPortfolioMetrics(null);
    }
  }, [isConnected, address]);

  if (!isConnected) {
    return (
      <div className="max-w-md mx-auto mt-20">
        <WalletConnector />
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', count: wallets.length },
    { id: 'transactions', label: 'Transactions', count: transactions.length },
    { id: 'contracts', label: 'Contracts', count: portfolioMetrics?.activeContracts || 0 },
  ] as const;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Portfolio Overview */}
      {portfolioMetrics && (
        <PortfolioOverview 
          metrics={portfolioMetrics}
          loading={loading}
        />
      )}

      {/* Navigation Tabs */}
      <div className="bg-slate-800/30 border border-slate-600/30 rounded-lg p-1">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-crypto-teal text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                activeTab === tab.id
                  ? 'bg-white/20'
                  : 'bg-slate-600/50'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <TransactionHistory 
                transactions={transactions.slice(0, 10)} 
                loading={loading}
                showHeader={false}
              />
            </div>
            <div className="space-y-6">
              {wallets.map((wallet) => (
                <WalletSummaryCard
                  key={wallet.walletAddress}
                  wallet={wallet}
                  transactions={transactions.filter(tx => tx.walletAddress === wallet.walletAddress)}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <TransactionHistory 
            transactions={transactions} 
            loading={loading}
          />
        )}

        {activeTab === 'contracts' && (
          <ContractInteractions 
            transactions={transactions}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}
