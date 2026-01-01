'use client';

import { useMemo } from 'react';
import type { TokenData } from '@/lib/types';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface FundDistributionProps {
  data: TokenData | null;
}

const COLORS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b',
  '#10b981', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6',
];

export function FundDistribution({ data }: FundDistributionProps) {
  const chartData = useMemo(() => {
    if (!data) return [];
    
    return data.yearnVault.debts
      .filter(debt => debt.percentOfAssets > 0)
      .sort((a, b) => b.percentOfAssets - a.percentOfAssets)
      .slice(0, 10)
      .map((debt) => ({
        name: debt.name,
        value: debt.percentOfAssets,
        amount: parseFloat(debt.currentDebt) / 1e6,
        symbol: debt.symbol,
      }));
  }, [data]);

  if (!data) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6">Fund Distribution</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(1)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                        <p className="font-semibold text-sm mb-1">{data.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatPercentage(data.value)} of assets
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(data.amount)}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
          {data.yearnVault.debts
            .filter(debt => debt.percentOfAssets > 0)
            .sort((a, b) => b.percentOfAssets - a.percentOfAssets)
            .map((debt, index) => (
              <div
                key={debt.strategy}
                className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <div>
                    <p className="font-medium text-sm">{debt.name}</p>
                    {debt.collateralSymbol && (
                      <p className="text-xs text-muted-foreground">{debt.collateralSymbol}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">
                    {formatPercentage(debt.percentOfAssets)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(parseFloat(debt.currentDebt) / 1e6, 0)}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
        <h3 className="font-semibold mb-2 text-sm">About the Distribution</h3>
        <p className="text-xs text-muted-foreground">
          Funds are deployed across multiple strategies including lending pools, liquidity provision,
          and yield farming to maximize returns while maintaining safety. The vault automatically
          rebalances to optimize yield and manage risk.
        </p>
      </div>
    </div>
  );
}
