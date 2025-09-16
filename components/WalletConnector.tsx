'use client';

import { useState } from 'react';
import { Wallet } from 'lucide-react';
import { formatAddress } from '@/lib/utils';

interface WalletConnectorProps {
  variant?: 'default' | 'compact';
  onConnect?: (address: string) => void;
}

export function WalletConnector({ variant = 'default', onConnect }: WalletConnectorProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  if (variant === 'compact') {
    return (
      <div className="relative">
        {isConnected && address ? (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-crypto-teal rounded-full" />
            <span className="text-white text-sm">{formatAddress(address)}</span>
            <Wallet className="w-4 h-4 text-crypto-teal" />
          </div>
        ) : (
          <button
            onClick={() => {
              setIsConnected(true);
              setAddress('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
              onConnect?.('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
            }}
            className="flex items-center gap-2 bg-crypto-teal hover:bg-crypto-teal/80 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            <Wallet className="w-4 h-4" />
            <span>Connect</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {!isConnected ? (
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wallet className="w-8 h-8 text-crypto-teal" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Connect Your Wallet</h3>
          <p className="text-slate-400 text-sm mb-6">
            Connect your Base wallet to start tracking your crypto transactions
          </p>
          <button
            onClick={() => {
              setIsConnected(true);
              setAddress('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
              onConnect?.('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
            }}
            className="bg-crypto-teal hover:bg-crypto-teal/80 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            <Wallet className="w-5 h-5" />
            Connect Wallet
          </button>
        </div>
      ) : (
        <div className="bg-slate-800/30 border border-slate-600/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-crypto-teal/20 rounded-full flex items-center justify-center">
                <Wallet className="w-5 h-5 text-crypto-teal" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">Connected Wallet</div>
                <div className="text-xs text-slate-400 font-mono">{formatAddress(address!, 8)}</div>
              </div>
            </div>
            <Wallet className="w-4 h-4 text-crypto-teal" />
          </div>
        </div>
      )}
    </div>
  );
}
