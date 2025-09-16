'use client';

import { useState } from 'react';
import { useMiniKit } from '@coinbase/minikit';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Wallet, Plus, ChevronDown } from 'lucide-react';
import { cn, formatAddress } from '@/lib/utils';

interface WalletConnectorProps {
  variant?: 'default' | 'compact';
  onConnect?: (address: string) => void;
}

export function WalletConnector({ variant = 'default', onConnect }: WalletConnectorProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { context } = useMiniKit();
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = () => {
    const connector = connectors[0]; // Use first available connector
    if (connector) {
      connect({ connector });
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setIsDropdownOpen(false);
  };

  if (variant === 'compact') {
    return (
      <div className="relative">
        {isConnected && address ? (
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 rounded-lg px-3 py-2 text-sm transition-colors duration-200"
          >
            <div className="w-2 h-2 bg-crypto-teal rounded-full" />
            <span className="text-white">{formatAddress(address)}</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
        ) : (
          <button
            onClick={handleConnect}
            className="flex items-center gap-2 bg-crypto-teal hover:bg-crypto-teal/80 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            <Wallet className="w-4 h-4" />
            <span>Connect</span>
          </button>
        )}

        {/* Dropdown */}
        {isDropdownOpen && isConnected && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-slate-800 border border-slate-600/50 rounded-lg shadow-modal z-50">
            <div className="p-3 border-b border-slate-600/50">
              <div className="text-xs text-slate-400 mb-1">Connected Wallet</div>
              <div className="text-sm text-white font-mono">{formatAddress(address!, 6)}</div>
            </div>
            <div className="p-2">
              <button
                onClick={handleDisconnect}
                className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-700/50 rounded transition-colors duration-200"
              >
                Disconnect
              </button>
            </div>
          </div>
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
            onClick={handleConnect}
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
            <button
              onClick={handleDisconnect}
              className="text-xs text-slate-400 hover:text-white transition-colors duration-200"
            >
              Disconnect
            </button>
          </div>
          
          {context?.user && (
            <div className="text-xs text-slate-400">
              Farcaster: {context.user.displayName || 'Connected'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
