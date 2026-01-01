'use client';

import { useEffect, useState } from 'react';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import type { TokenData } from '@/lib/types';
import { CORPORATE_BONDS } from '@/lib/config/contracts';
import { TrendingUp, Shield, Wallet } from 'lucide-react';

interface StatsCardProps {
  data: TokenData | null;
  loading: boolean;
}

export function StatsCard({ data, loading }: StatsCardProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-6 animate-pulse">
            <div className="h-4 bg-muted rounded w-24 mb-3"></div>
            <div className="h-8 bg-muted rounded w-32"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-green-500/10 rounded-lg">
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-sm text-muted-foreground font-medium">Total APY</p>
        </div>
        <p className="text-3xl font-bold text-green-500">{formatPercentage(data.totalApy)}</p>
        <p className="text-xs text-muted-foreground mt-2">
          {formatPercentage(data.baseApy)} base + {formatPercentage(data.stakingApy)} staking
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Wallet className="h-5 w-5 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground font-medium">Total Value Locked</p>
        </div>
        <p className="text-3xl font-bold">{formatCurrency(data.depositTVL_usd, 0)}</p>
        <p className="text-xs text-muted-foreground mt-2">
          Across {data.yearnVault.debts.length} strategies
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Shield className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-sm text-muted-foreground font-medium">Utilization Rate</p>
        </div>
        <p className="text-3xl font-bold">{formatPercentage(data.utilization)}</p>
        <p className="text-xs text-muted-foreground mt-2">
          Of total supply actively deployed
        </p>
      </div>
    </div>
  );
}

export function BackingInfo() {
  return (
    <div className="bg-card border border-border rounded-2xl p-8 mb-8">
      <h2 className="text-2xl font-bold mb-4">Backed by Corporate Bonds</h2>
      <p className="text-muted-foreground mb-6">
        USD8 is secured by high-grade corporate bonds from 8 major companies, providing stability and consistent yields.
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {CORPORATE_BONDS.map((bond) => (
          <div
            key={bond.symbol}
            className="flex flex-col items-center p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors"
          >
            <div className="text-4xl mb-2">{bond.logo}</div>
            <p className="font-semibold text-sm">{bond.name}</p>
            <p className="text-xs text-muted-foreground">{bond.symbol}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
