export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-crypto-teal border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-white mb-2">Loading CryptoFlow Insights</h2>
        <p className="text-slate-400">Analyzing your crypto transactions...</p>
      </div>
    </div>
  );
}
