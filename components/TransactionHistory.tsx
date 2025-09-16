'use client';

import { useState } from 'react';
import { Search, Filter, ExternalLink, ChevronDown } from 'lucide-react';
import { TransactionListItem } from './TransactionListItem';
import { formatTimeAgo } from '@/lib/utils';
import type { Transaction } from '@/lib/types';

interface TransactionHistoryProps {
  transactions: Transaction[];
  loading?: boolean;
  showHeader?: boolean;
}

export function TransactionHistory({ 
  transactions, 
  loading = false, 
  showHeader = true 
}: TransactionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'timestamp' | 'value'>('timestamp');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTransactions = transactions
    .filter(tx => {
      if (filterType !== 'all' && tx.type !== filterType) return false;
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        return (
          tx.transactionHash.toLowerCase().includes(search) ||
          tx.from.toLowerCase().includes(search) ||
          tx.to.toLowerCase().includes(search) ||
          tx.tokenTransfers.some(tt => 
            tt.tokenSymbol.toLowerCase().includes(search)
          )
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'timestamp') {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
      return parseFloat(b.value) - parseFloat(a.value);
    });

  if (loading) {
    return (
      <div className="bg-slate-800/30 border border-slate-600/30 rounded-lg p-6">
        {showHeader && (
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Transaction History</h2>
            <div className="h-4 bg-slate-700 rounded w-20 animate-pulse"></div>
          </div>
        )}
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-slate-700/20 rounded-lg animate-pulse">
              <div className="w-10 h-10 bg-slate-600 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-600 rounded w-1/3"></div>
                <div className="h-3 bg-slate-600 rounded w-1/2"></div>
              </div>
              <div className="w-20 h-4 bg-slate-600 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/30 border border-slate-600/30 rounded-lg">
      {showHeader && (
        <div className="p-6 border-b border-slate-600/30">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Transaction History</h2>
            <div className="text-sm text-slate-400">
              {filteredTransactions.length} transactions
            </div>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search transactions, addresses, or tokens..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-crypto-teal/50 focus:border-crypto-teal/50"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors duration-200"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {showFilters && (
              <div className="flex gap-3 p-4 bg-slate-700/20 rounded-lg">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-crypto-teal/50"
                >
                  <option value="all">All Types</option>
                  <option value="send">Send</option>
                  <option value="receive">Receive</option>
                  <option value="contract">Contract</option>
                  <option value="swap">Swap</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'timestamp' | 'value')}
                  className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-crypto-teal/50"
                >
                  <option value="timestamp">Sort by Time</option>
                  <option value="value">Sort by Value</option>
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="divide-y divide-slate-600/30">
        {filteredTransactions.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No transactions found</h3>
            <p className="text-slate-400">
              {searchTerm || filterType !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Connect a wallet to see your transaction history'
              }
            </p>
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <TransactionListItem
              key={transaction.transactionHash}
              transaction={transaction}
            />
          ))
        )}
      </div>

      {filteredTransactions.length > 0 && (
        <div className="p-4 border-t border-slate-600/30 text-center">
          <button className="text-crypto-teal hover:text-crypto-teal/80 text-sm font-medium transition-colors duration-200">
            Load more transactions
          </button>
        </div>
      )}
    </div>
  );
}
