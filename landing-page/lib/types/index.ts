export interface YearnVaultDebt {
  strategy: string;
  currentDebt: string;
  percentOfAssets: number;
  collateralSymbol: string | null;
  collateralAddress: string | null;
  symbol: string;
  name: string;
}

export interface YearnVault {
  baseApy: number;
  pricePerShare: string;
  totalDebt: string;
  totalDebtNormalized: number;
  totalIdle: string;
  totalAssets: string;
  totalAssetsNormalized: number;
  debts: YearnVaultDebt[];
  nonPoolDebt: number;
  nonPoolDebtRaw: number;
}

export interface SupplyPoolMetrics {
  total_principal_tokens_committed: string;
  total_interest_collected: string;
  token_difference_from_liquidations: string;
  total_principal_tokens_withdrawn: string;
  total_principal_tokens_borrowed: string;
  total_principal_tokens_repaid: string;
  current_min_interest_rate: string;
  shares_token_address: string;
  collateral_token_address: string;
  principal_token_address: string;
}

export interface TokenData {
  token: string;
  logoURI: string;
  priceUsd: number;
  totalCollateralUsed: number;
  totalSupplied: number;
  depositTVL: number;
  totalCollateralUsed_usd: number;
  totalSupplied_usd: number;
  depositTVL_usd: number;
  totalBorrowed: number;
  totalBorrowed_usd: number;
  totalLoansNonPool: number;
  totalLoansNonPool_usd: number;
  totalProtocolSupplied: number;
  totalProtocolSupplied_usd: number;
  utilization: number;
  usdcBorrowed: number;
  usdcPrincipalAddress: string;
  supplyToken: string;
  supplyPool: string;
  borrowPool: string;
  borrowPoolPrincipalToken: string;
  isStable: boolean;
  chainId: number;
  baseApy: number;
  stakingApy: number;
  totalApy: number;
  rewardTokenSymbol: string;
  stakeContract: string;
  collateralRewards: boolean;
  supplyPoolMetrics: SupplyPoolMetrics;
  borrowBaseApy: number;
  borrowPoolMetrics: Record<string, unknown>;
  borrowRewardsApy: number;
  borrowTotalApy: number;
  yearnVault: YearnVault;
  yearnVaultAddress: string;
  isV2SupplyPool: boolean;
  isV2BorrowPool: boolean;
}

export interface ApiResponse {
  data: TokenData[];
}

export interface UserBalance {
  deposited: bigint;
  staked: bigint;
  rewards: bigint;
  shares: bigint;
}
