'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { StatsCard, BackingInfo } from '@/components/StatsCard';
import { StakingInterface } from '@/components/StakingInterface';
import { FundDistribution } from '@/components/FundDistribution';
import { RewardsTicker } from '@/components/RewardsTicker';
import { fetchUSD8Data } from '@/lib/utils';
import type { TokenData } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default function Home() {
  const [data, setData] = useState<TokenData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const result = await fetchUSD8Data();
      setData(result);
      setLoading(false);
    }
    
    if (mounted) {
      loadData();
      // Refresh data every 30 seconds
      const interval = setInterval(loadData, 30000);
      
      return () => clearInterval(interval);
    }
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Stable Yields, Backed by Giants
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Earn up to 10.39% APY with USD8, a stablecoin backed by corporate bonds 
            from the world's most trusted companies.
          </p>
        </section>

        {/* Stats */}
        <StatsCard data={data} loading={loading} />

        {/* Corporate Bonds Backing */}
        <BackingInfo />

        {/* Rewards Ticker */}
        <RewardsTicker />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Staking Interface */}
          <div>
            <StakingInterface />
          </div>

          {/* Fund Distribution */}
          <div>
            <FundDistribution data={data} />
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-8 bg-card border border-border rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">Why USD8?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-lg">🛡️ Secure</h3>
              <p className="text-sm text-muted-foreground">
                Backed by investment-grade corporate bonds from Apple, Meta, Google, 
                Microsoft, Nvidia, Oracle, JPMorgan, and Citigroup.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">💰 Profitable</h3>
              <p className="text-sm text-muted-foreground">
                Earn competitive yields through a combination of base APY from the vault 
                and staking rewards on the Base network.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">🚀 Simple</h3>
              <p className="text-sm text-muted-foreground">
                Deposit USDC, stake your shares, and watch your rewards grow in real-time. 
                Withdraw anytime with no lock-up periods.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 USD8. Built on Base. Powered by Teller Protocol.</p>
          <p className="mt-2">
            Always DYOR. Smart contracts are audited but use at your own risk.
          </p>
        </div>
      </footer>
    </div>
  );
}

