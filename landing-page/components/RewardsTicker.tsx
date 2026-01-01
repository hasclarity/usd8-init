'use client';

import { useState, useEffect } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { CONTRACTS } from '@/lib/config/contracts';
import { STAKING_ABI } from '@/lib/abis';
import { TrendingUp } from 'lucide-react';

export function RewardsTicker() {
  const { address, isConnected } = useAccount();
  const [displayRewards, setDisplayRewards] = useState(0);
  const [baseRewards, setBaseRewards] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const { data: stakeInfo } = useReadContract({
    address: CONTRACTS.STAKE_CONTRACT,
    abi: STAKING_ABI,
    functionName: 'getStakeInfo',
    args: address ? [address] : undefined,
    query: {
      refetchInterval: 5000, // Refetch every 5 seconds
    },
  });

  useEffect(() => {
    if (stakeInfo) {
      const stakedAmount = (stakeInfo as any)[0] as bigint;
      const unclaimedRewards = (stakeInfo as any)[2] as bigint;
      const newBaseRewards = parseFloat(formatUnits(unclaimedRewards, 6));
      
      setBaseRewards(newBaseRewards);
      setDisplayRewards(newBaseRewards);
      setLastUpdate(Date.now());
    }
  }, [stakeInfo]);

  useEffect(() => {
    if (!isConnected || baseRewards === 0) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const timePassed = (now - lastUpdate) / 1000; // seconds
      
      // Calculate rewards per second based on staked amount and APY
      // Note: This uses a hardcoded APY of 10.39%. Consider making this dynamic
      // by fetching from token data or making it configurable.
      // rewards_per_second = (staked_amount * apy) / (365 * 24 * 60 * 60)
      if (stakeInfo) {
        const stakedAmount = parseFloat(formatUnits((stakeInfo as any)[0] as bigint, 6));
        const apyRate = 0.1039; // 10.39% - TODO: Make this dynamic
        const rewardsPerSecond = (stakedAmount * apyRate) / (365 * 24 * 60 * 60);
        
        setDisplayRewards(prev => prev + rewardsPerSecond);
      }
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [isConnected, baseRewards, lastUpdate, stakeInfo]);

  if (!isConnected || !stakeInfo) {
    return null;
  }

  const stakedAmount = (stakeInfo as any)[0] as bigint;
  
  if (stakedAmount === 0n) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-6 mb-8">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-green-500 rounded-lg animate-pulse">
          <TrendingUp className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold">Your Rewards Are Growing</h3>
      </div>
      
      <div className="flex items-baseline gap-2">
        <p className="text-4xl font-bold text-green-500 tabular-nums">
          {displayRewards.toFixed(6)}
        </p>
        <p className="text-xl text-muted-foreground">USDC</p>
      </div>
      
      <p className="text-sm text-muted-foreground mt-2">
        Accruing at {((displayRewards - baseRewards) * 60).toFixed(6)} USDC/min
      </p>
    </div>
  );
}
