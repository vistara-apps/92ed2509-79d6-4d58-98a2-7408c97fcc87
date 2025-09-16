'use client';

import { cn } from '@/lib/utils';

interface AppShellProps {
  children: React.ReactNode;
  className?: string;
}

export function AppShell({ children, className }: AppShellProps) {
  return (
    <div className={cn(
      'min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
      'relative overflow-hidden',
      className
    )}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #2dd4bf 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, #22c55e 0%, transparent 50%)`,
        }} />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-crypto-teal rounded-full opacity-60 animate-pulse" />
      <div className="absolute top-40 right-20 w-1 h-1 bg-crypto-green rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-crypto-orange rounded-full opacity-50 animate-pulse" style={{ animationDelay: '2s' }} />
    </div>
  );
}
