'use client';

import { useState } from 'react';
import { Code, ExternalLink, Activity, Zap } from 'lucide-react';
import { formatAddress, formatTimeAgo, formatTokenAmount } from '@/lib/utils';
import type { Transaction, ContractInteraction } from '@/lib/types';

interface ContractInteractionsProps {
  transactions: Transaction[];
  loading?: boolean;
}

interface ContractSummary {
  address: string;
  name?: string;
  protocol?: string;
  interactionCount: number;
  lastInteraction: Date;
  totalValue: number;
  functions: string[];
}

export function ContractInteractions({ transactions, loading }: ContractInteractionsProps) {
  const [selectedContract, setSelectedContract] = useState<string | null>(null);

  // Process transactions to extract contract interactions
  const contractSummaries = transactions
    .filter(tx => tx.contractInteractions.length > 0)
    .reduce((acc, tx) => {
      tx.contractInteractions.forEach(interaction => {
        const key = interaction.contractAddress;
        if (!acc[key]) {
          acc[key] = {
            address: interaction.contractAddress,
            name: interaction.contractName,
            protocol: interaction.protocol,
            interactionCount: 0,
            lastInteraction: new Date(tx.timestamp),
            totalValue: 0,
            functions: [],
          };
        }
        
        acc[key].interactionCount++;
        if (new Date(tx.timestamp) > acc[key].lastInteraction) {
          acc[key].lastInteraction = new Date(tx.timestamp);
        }
        
        // Add function name if not already present
        if (interaction.functionName && !acc[key].functions.includes(interaction.functionName)) {
          acc[key].functions.push(interaction.functionName);
        }
        
        // Add transaction value
        const txValue = tx.tokenTransfers.reduce((sum, transfer) => 
          sum + (transfer.usdValue || 0), 0
        );
        acc[key].totalValue += txValue;
      });
      
      return acc;
    }, {} as Record<string, ContractSummary>);

  const contractList = Object.values(contractSummaries)
    .sort((a, b) => b.interactionCount - a.interactionCount);

  const selectedContractTransactions = selectedContract
    ? transactions.filter(tx => 
        tx.contractInteractions.some(ci => ci.contractAddress === selectedContract)
      )
    : [];

  if (loading) {
    return (
      <div className="bg-slate-800/30 border border-slate-600/30 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Smart Contract Interactions</h2>
          <div className="h-4 bg-slate-700 rounded w-20 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-4 bg-slate-700/20 rounded-lg animate-pulse">
                <div className="h-4 bg-slate-600 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-slate-600 rounded w-3/4"></div>
              </div>
            ))}
          </div>
          <div className="h-64 bg-slate-700/20 rounded-lg animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/30 border border-slate-600/30 rounded-lg">
      <div className="p-6 border-b border-slate-600/30">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Smart Contract Interactions</h2>
          <div className="text-sm text-slate-400">
            {contractList.length} contracts
          </div>
        </div>
      </div>

      {contractList.length === 0 ? (
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Code className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No contract interactions found</h3>
          <p className="text-slate-400">
            Contract interactions will appear here when you interact with smart contracts
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Contract List */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-white mb-4">Active Contracts</h3>
            {contractList.map((contract) => (
              <div
                key={contract.address}
                onClick={() => setSelectedContract(
                  selectedContract === contract.address ? null : contract.address
                )}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedContract === contract.address
                    ? 'bg-crypto-teal/10 border-crypto-teal/50'
                    : 'bg-slate-700/20 border-slate-600/30 hover:bg-slate-700/30'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Code className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">
                        {contract.name || 'Unknown Contract'}
                      </div>
                      <div className="text-xs text-slate-400 font-mono">
                        {formatAddress(contract.address, 8)}
                      </div>
                      {contract.protocol && (
                        <div className="text-xs text-crypto-teal mt-1">
                          {contract.protocol}
                        </div>
                      )}
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-white transition-colors duration-200">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="text-slate-400">Interactions</div>
                    <div className="text-white font-medium">{contract.interactionCount}</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Last Activity</div>
                    <div className="text-white font-medium">
                      {formatTimeAgo(contract.lastInteraction)}
                    </div>
                  </div>
                </div>

                {contract.functions.length > 0 && (
                  <div className="mt-3">
                    <div className="text-xs text-slate-400 mb-2">Functions Used</div>
                    <div className="flex flex-wrap gap-1">
                      {contract.functions.slice(0, 3).map((func) => (
                        <span
                          key={func}
                          className="text-xs bg-slate-600/50 text-slate-300 px-2 py-1 rounded"
                        >
                          {func}
                        </span>
                      ))}
                      {contract.functions.length > 3 && (
                        <span className="text-xs text-slate-400">
                          +{contract.functions.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contract Details */}
          <div className="space-y-4">
            {selectedContract ? (
              <div>
                <h3 className="text-lg font-medium text-white mb-4">
                  Contract Details
                </h3>
                
                {/* Contract Info */}
                <div className="bg-slate-700/20 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-medium text-white">
                      {contractSummaries[selectedContract]?.name || 'Unknown Contract'}
                    </div>
                    <button className="text-crypto-teal hover:text-crypto-teal/80 transition-colors duration-200">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-xs text-slate-400 font-mono mb-3">
                    {selectedContract}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="text-slate-400">Total Interactions</div>
                      <div className="text-white font-medium">
                        {contractSummaries[selectedContract]?.interactionCount}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400">Functions</div>
                      <div className="text-white font-medium">
                        {contractSummaries[selectedContract]?.functions.length}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Transactions */}
                <div>
                  <h4 className="text-sm font-medium text-slate-300 mb-3">
                    Recent Interactions
                  </h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {selectedContractTransactions.slice(0, 10).map((tx) => (
                      <div
                        key={tx.transactionHash}
                        className="p-3 bg-slate-700/20 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Zap className="w-3 h-3 text-blue-400" />
                            <span className="text-xs font-medium text-white">
                              {tx.contractInteractions.find(ci => ci.contractAddress === selectedContract)?.functionName || 'Unknown'}
                            </span>
                          </div>
                          <span className="text-xs text-slate-400">
                            {formatTimeAgo(tx.timestamp)}
                          </span>
                        </div>
                        
                        {tx.tokenTransfers.length > 0 && (
                          <div className="text-xs text-slate-400">
                            {tx.tokenTransfers.map((transfer, i) => (
                              <div key={i}>
                                {formatTokenAmount(transfer.amount, 18, 4)} {transfer.tokenSymbol}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center">
                <div>
                  <Activity className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <div className="text-sm text-slate-400">
                    Select a contract to view details
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
