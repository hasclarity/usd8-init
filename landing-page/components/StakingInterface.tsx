'use client';

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { CONTRACTS } from '@/lib/config/contracts';
import { ERC20_ABI, YEARN_VAULT_ABI, STAKING_ABI } from '@/lib/abis';
import { ArrowDown, ArrowUp, Gift, Loader2, Wallet } from 'lucide-react';

type TabType = 'deposit' | 'stake' | 'withdraw' | 'unstake' | 'claim';

export function StakingInterface() {
  const { address, isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<TabType>('deposit');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const { writeContract, data: hash, isPending: isWritePending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  // Read user balances
  const { data: usdcBalance } = useReadContract({
    address: CONTRACTS.USDC,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  const { data: sharesBalance } = useReadContract({
    address: CONTRACTS.YEARN_VAULT,
    abi: YEARN_VAULT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  const { data: stakeInfo } = useReadContract({
    address: CONTRACTS.STAKE_CONTRACT,
    abi: STAKING_ABI,
    functionName: 'getStakeInfo',
    args: address ? [address] : undefined,
  });

  const { data: usdcAllowance } = useReadContract({
    address: CONTRACTS.USDC,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: address ? [address, CONTRACTS.SUPPLY_POOL] : undefined,
  });

  const { data: sharesAllowance } = useReadContract({
    address: CONTRACTS.YEARN_VAULT,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: address ? [address, CONTRACTS.STAKE_CONTRACT] : undefined,
  });

  useEffect(() => {
    if (isConfirmed) {
      setAmount('');
      setIsProcessing(false);
    }
  }, [isConfirmed]);

  const handleApprove = async (token: `0x${string}`, spender: `0x${string}`) => {
    const amountWei = parseUnits(amount || '0', 6);
    return writeContract({
      address: token,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [spender, amountWei],
    });
  };

  const handleDeposit = async () => {
    if (!amount || !address) return;
    
    setIsProcessing(true);
    const amountWei = parseUnits(amount, 6);
    
    // Check allowance
    const allowance = usdcAllowance as bigint | undefined;
    if (!allowance || allowance < amountWei) {
      // Approval needed - the transaction will be handled by wagmi hooks
      await handleApprove(CONTRACTS.USDC, CONTRACTS.SUPPLY_POOL);
      // Note: User will need to click deposit again after approval completes
      return;
    }

    // Deposit to vault
    writeContract({
      address: CONTRACTS.YEARN_VAULT,
      abi: YEARN_VAULT_ABI,
      functionName: 'deposit',
      args: [amountWei, address],
    });
  };

  const handleStake = async () => {
    if (!amount || !address) return;
    
    setIsProcessing(true);
    const amountWei = parseUnits(amount, 6);
    
    // Check allowance
    const allowance = sharesAllowance as bigint | undefined;
    if (!allowance || allowance < amountWei) {
      // Approval needed - the transaction will be handled by wagmi hooks
      await handleApprove(CONTRACTS.YEARN_VAULT, CONTRACTS.STAKE_CONTRACT);
      // Note: User will need to click stake again after approval completes
      return;
    }

    // Stake shares
    writeContract({
      address: CONTRACTS.STAKE_CONTRACT,
      abi: STAKING_ABI,
      functionName: 'stake',
      args: [amountWei],
    });
  };

  const handleUnstake = async () => {
    if (!amount) return;
    
    setIsProcessing(true);
    const amountWei = parseUnits(amount, 6);

    writeContract({
      address: CONTRACTS.STAKE_CONTRACT,
      abi: STAKING_ABI,
      functionName: 'withdraw',
      args: [amountWei],
    });
  };

  const handleWithdraw = async () => {
    if (!amount || !address) return;
    
    setIsProcessing(true);
    const amountWei = parseUnits(amount, 6);

    writeContract({
      address: CONTRACTS.YEARN_VAULT,
      abi: YEARN_VAULT_ABI,
      functionName: 'redeem',
      args: [amountWei, address, address],
    });
  };

  const handleClaim = async () => {
    setIsProcessing(true);

    writeContract({
      address: CONTRACTS.STAKE_CONTRACT,
      abi: STAKING_ABI,
      functionName: 'claimRewards',
    });
  };

  const isPending = isWritePending || isConfirming || isProcessing;

  if (!isConnected) {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 text-center">
        <Wallet className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
        <p className="text-muted-foreground">
          Connect your wallet to start earning with USD8
        </p>
      </div>
    );
  }

  const stakedAmount = stakeInfo ? (stakeInfo as any)[0] : 0n;
  const unclaimedRewards = stakeInfo ? (stakeInfo as any)[2] : 0n;

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {(['deposit', 'stake', 'withdraw', 'unstake', 'claim'] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === tab
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-accent'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Balance Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-secondary/50 rounded-xl">
          <p className="text-sm text-muted-foreground mb-1">USDC Balance</p>
          <p className="text-xl font-bold">{usdcBalance ? formatUnits(usdcBalance as bigint, 6) : '0'}</p>
        </div>
        <div className="p-4 bg-secondary/50 rounded-xl">
          <p className="text-sm text-muted-foreground mb-1">USD8 Shares</p>
          <p className="text-xl font-bold">{sharesBalance ? formatUnits(sharesBalance as bigint, 6) : '0'}</p>
        </div>
        <div className="p-4 bg-secondary/50 rounded-xl">
          <p className="text-sm text-muted-foreground mb-1">Staked</p>
          <p className="text-xl font-bold">{formatUnits(stakedAmount, 6)}</p>
        </div>
      </div>

      {activeTab === 'claim' ? (
        <div className="space-y-4">
          <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
            <div className="flex items-center gap-3 mb-3">
              <Gift className="h-6 w-6 text-green-500" />
              <p className="text-sm text-muted-foreground">Unclaimed Rewards</p>
            </div>
            <p className="text-4xl font-bold text-green-500 mb-1">
              {formatUnits(unclaimedRewards, 6)} USDC
            </p>
            <p className="text-sm text-muted-foreground">
              Rewards are continuously accruing
            </p>
          </div>

          <button
            onClick={handleClaim}
            disabled={isPending || unclaimedRewards === 0n}
            className="w-full py-4 bg-green-500 hover:bg-green-600 disabled:bg-muted disabled:text-muted-foreground text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Gift className="h-5 w-5" />
                Claim Rewards
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Amount
              {activeTab === 'deposit' && ' (USDC)'}
              {(activeTab === 'stake' || activeTab === 'withdraw') && ' (USD8 Shares)'}
              {activeTab === 'unstake' && ' (Staked USD8)'}
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                step="0.000001"
                min="0"
              />
              <button
                onClick={() => {
                  if (activeTab === 'deposit' && usdcBalance) {
                    setAmount(formatUnits(usdcBalance as bigint, 6));
                  } else if (activeTab === 'stake' && sharesBalance) {
                    setAmount(formatUnits(sharesBalance as bigint, 6));
                  } else if (activeTab === 'unstake') {
                    setAmount(formatUnits(stakedAmount, 6));
                  } else if (activeTab === 'withdraw' && sharesBalance) {
                    setAmount(formatUnits(sharesBalance as bigint, 6));
                  }
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                Max
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              if (activeTab === 'deposit') handleDeposit();
              else if (activeTab === 'stake') handleStake();
              else if (activeTab === 'unstake') handleUnstake();
              else if (activeTab === 'withdraw') handleWithdraw();
            }}
            disabled={isPending || !amount || parseFloat(amount) <= 0}
            className="w-full py-4 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                {activeTab === 'deposit' && <ArrowDown className="h-5 w-5" />}
                {activeTab === 'stake' && <ArrowDown className="h-5 w-5" />}
                {activeTab === 'unstake' && <ArrowUp className="h-5 w-5" />}
                {activeTab === 'withdraw' && <ArrowUp className="h-5 w-5" />}
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </>
            )}
          </button>

          {isConfirmed && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
              <p className="text-green-500 font-medium">Transaction confirmed!</p>
            </div>
          )}
        </div>
      )}

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
        <h4 className="font-semibold mb-2 text-sm">How it works:</h4>
        <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
          {activeTab === 'deposit' && (
            <>
              <li>Deposit USDC to mint USD8 shares</li>
              <li>Shares represent your portion of the vault</li>
              <li>Start earning base APY immediately</li>
            </>
          )}
          {activeTab === 'stake' && (
            <>
              <li>Stake your USD8 shares to earn additional rewards</li>
              <li>Receive staking APY on top of base APY</li>
              <li>Rewards accrue continuously</li>
            </>
          )}
          {activeTab === 'unstake' && (
            <>
              <li>Unstake your USD8 shares</li>
              <li>Shares return to your wallet</li>
              <li>You can withdraw them for USDC anytime</li>
            </>
          )}
          {activeTab === 'withdraw' && (
            <>
              <li>Redeem USD8 shares for USDC</li>
              <li>Receive USDC based on share value</li>
              <li>Process completes in one transaction</li>
            </>
          )}
          {activeTab === 'claim' && (
            <>
              <li>Claim your accumulated staking rewards</li>
              <li>Rewards are paid in USDC</li>
              <li>Continue earning on staked balance</li>
            </>
          )}
        </ol>
      </div>
    </div>
  );
}
