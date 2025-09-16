'use client';

import { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronRight } from 'lucide-react';
import { formatAddress, formatTokenAmount, formatUSD, formatTimeAgo, getTransactionTypeInfo } from '@/lib/utils';
import type { Transaction } from '@/lib/types';

interface TransactionListItemProps {
  transaction: Transaction;
  variant?: 'default' | 'contractCall';
  onClick?: (transaction: Transaction) => void;
}

export function TransactionListItem({ 
  transaction, 
  variant = 'default',
  onClick 
}: TransactionListItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const typeInfo = getTransactionTypeInfo(transaction.type);
  
  const handleClick = () => {
    if (onClick) {
      onClick(transaction);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  const primaryTransfer = transaction.tokenTransfers[0];
  const hasMultipleTransfers = transaction.tokenTransfers.length > 1;
  const hasContractInteraction = transaction.contractInteractions.length > 0;

  return (
    <div className="hover:bg-slate-700/20 transition-colors duration-200">
      <div 
        className="p-4 cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex items-center gap-4">
          {/* Transaction Type Icon */}
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${typeInfo.bgColor}`}>
            <span className={`text-lg ${typeInfo.color}`}>
              {typeInfo.icon}
            </span>
          </div>

          {/* Transaction Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-white capitalize">
                {transaction.type}
              </span>
              {hasContractInteraction && (
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">
                  Contract
                </span>
              )}
              {hasMultipleTransfers && (
                <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded">
                  Multi-token
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>{formatAddress(transaction.from)}</span>
              <span>→</span>
              <span>{formatAddress(transaction.to)}</span>
              <span>•</span>
              <span>{formatTimeAgo(transaction.timestamp)}</span>
            </div>
          </div>

          {/* Value and Status */}
          <div className="text-right">
            {primaryTransfer ? (
              <div>
                <div className="text-sm font-medium text-white">
                  {formatTokenAmount(primaryTransfer.amount, 18, 4)} {primaryTransfer.tokenSymbol}
                </div>
                {primaryTransfer.usdValue && (
                  <div className="text-xs text-slate-400">
                    {formatUSD(primaryTransfer.usdValue)}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-sm font-medium text-white">
                {formatTokenAmount(transaction.value)} ETH
              </div>
            )}
            
            <div className="flex items-center gap-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${
                transaction.status === 'success' ? 'bg-crypto-green' :
                transaction.status === 'failed' ? 'bg-red-400' :
                'bg-yellow-400'
              }`} />
              <span className="text-xs text-slate-400 capitalize">
                {transaction.status}
              </span>
            </div>
          </div>

          {/* Expand/Collapse Icon */}
          <div className="ml-2">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-400" />
            )}
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-slate-600/30 bg-slate-700/10">
          <div className="pt-4 space-y-4">
            {/* Transaction Hash */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Transaction Hash</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-300">
                  {formatAddress(transaction.transactionHash, 8)}
                </span>
                <button className="text-crypto-teal hover:text-crypto-teal/80 transition-colors duration-200">
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Block Number */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Block</span>
              <span className="text-xs text-slate-300">
                {transaction.blockNumber.toLocaleString()}
              </span>
            </div>

            {/* Token Transfers */}
            {transaction.tokenTransfers.length > 0 && (
              <div>
                <div className="text-xs text-slate-400 mb-2">Token Transfers</div>
                <div className="space-y-2">
                  {transaction.tokenTransfers.map((transfer, index) => (
                    <div key={index} className="flex items-center justify-between text-xs bg-slate-700/20 rounded p-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">
                          {transfer.tokenSymbol}
                        </span>
                        <span className="text-slate-400">
                          {formatAddress(transfer.from)} → {formatAddress(transfer.to)}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-white">
                          {formatTokenAmount(transfer.amount, 18, 4)}
                        </div>
                        {transfer.usdValue && (
                          <div className="text-slate-400">
                            {formatUSD(transfer.usdValue)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contract Interactions */}
            {transaction.contractInteractions.length > 0 && (
              <div>
                <div className="text-xs text-slate-400 mb-2">Contract Interactions</div>
                <div className="space-y-2">
                  {transaction.contractInteractions.map((interaction, index) => (
                    <div key={index} className="flex items-center justify-between text-xs bg-blue-500/10 rounded p-2">
                      <div>
                        <div className="text-white font-medium">
                          {interaction.functionName || 'Unknown Function'}
                        </div>
                        <div className="text-slate-400">
                          {formatAddress(interaction.contractAddress)}
                        </div>
                      </div>
                      <button className="text-crypto-teal hover:text-crypto-teal/80 transition-colors duration-200">
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
