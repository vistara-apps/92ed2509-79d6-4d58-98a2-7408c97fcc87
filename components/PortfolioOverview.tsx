'use client';

import { TrendingUp, TrendingDown, Wallet, Activity, Zap } from 'lucide-react';
import { formatUSD, formatPercentage } from '@/lib/utils';
import type { PortfolioMetrics } from '@/lib/types';

interface PortfolioOverviewProps {
  metrics: PortfolioMetrics;
  loading?: boolean;
}

export function PortfolioOverview({ metrics, loading }: PortfolioOverviewProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-slate-800/30 border border-slate-600/30 rounded-lg p-6 animate-pulse">
            <div className="h-4 bg-slate-700 rounded w-1/2 mb-3"></div>
            <div className="h-8 bg-slate-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-slate-700 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  const stats = [
    {
      label: 'Total Portfolio Value',
      value: formatUSD(metrics.totalValue),
      change: metrics.totalChange24h,
      changePercent: metrics.totalChangePercent24h,
      icon: Wallet,
      color: 'crypto-teal',
    },
    {
      label: 'Total Transactions',
      value: metrics.transactionCount.toLocaleString(),
      change: null,
      changePercent: null,
      icon: Activity,
      color: 'crypto-green',
    },
    {
      label: 'Active Contracts',
      value: metrics.activeContracts.toString(),
      change: null,
      changePercent: null,
      icon: Zap,
      color: 'crypto-orange',
    },
    {
      label: '24h Change',
      value: formatUSD(Math.abs(metrics.totalChange24h)),
      change: metrics.totalChange24h,
      changePercent: metrics.totalChangePercent24h,
      icon: metrics.totalChange24h >= 0 ? TrendingUp : TrendingDown,
      color: metrics.totalChange24h >= 0 ? 'crypto-green' : 'red-400',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.change === null || stat.change >= 0;
          
          return (
            <div
              key={stat.label}
              className="bg-slate-800/30 border border-slate-600/30 rounded-lg p-6 hover:bg-slate-800/40 transition-colors duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 bg-${stat.color}/20 rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 text-${stat.color}`} />
                </div>
                {stat.changePercent !== null && (
                  <div className={`flex items-center gap-1 text-sm ${
                    isPositive ? 'text-crypto-green' : 'text-red-400'
                  }`}>
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>{formatPercentage(Math.abs(stat.changePercent))}</span>
                  </div>
                )}
              </div>
              
              <div>
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400">
                  {stat.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Portfolio Composition Chart Placeholder */}
      <div className="bg-slate-800/30 border border-slate-600/30 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Portfolio Composition</h3>
          <div className="text-sm text-slate-400">Last 24 hours</div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mock chart area */}
          <div className="h-48 bg-slate-700/20 rounded-lg flex items-center justify-center border border-slate-600/20">
            <div className="text-center">
              <div className="w-16 h-16 bg-crypto-teal/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Activity className="w-8 h-8 text-crypto-teal" />
              </div>
              <div className="text-sm text-slate-400">Portfolio chart coming soon</div>
            </div>
          </div>
          
          {/* Top tokens */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-300 mb-4">Top Holdings</h4>
            {['ETH', 'USDC', 'DAI'].map((token, index) => (
              <div key={token} className="flex items-center justify-between p-3 bg-slate-700/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    index === 0 ? 'bg-crypto-teal/20 text-crypto-teal' :
                    index === 1 ? 'bg-crypto-green/20 text-crypto-green' :
                    'bg-crypto-orange/20 text-crypto-orange'
                  }`}>
                    {token}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{token}</div>
                    <div className="text-xs text-slate-400">
                      {(Math.random() * 10).toFixed(2)} tokens
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-white">
                    {formatUSD(Math.random() * 2000)}
                  </div>
                  <div className={`text-xs ${Math.random() > 0.5 ? 'text-crypto-green' : 'text-red-400'}`}>
                    {formatPercentage((Math.random() * 10 - 5))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
