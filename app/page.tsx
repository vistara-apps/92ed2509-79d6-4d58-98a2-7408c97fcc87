import { AppShell } from '@/components/AppShell';
import { WalletConnector } from '@/components/WalletConnector';
import { Dashboard } from '@/components/Dashboard';

export default function HomePage() {
  return (
    <AppShell>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Header */}
        <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
          <div className="px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold gradient-text">
                  CryptoFlow Insights
                </h1>
                <p className="text-slate-400 text-sm mt-1">
                  Unlock clarity in your crypto money flow
                </p>
              </div>
              <WalletConnector />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 py-6">
          <Dashboard />
        </main>
      </div>
    </AppShell>
  );
}
