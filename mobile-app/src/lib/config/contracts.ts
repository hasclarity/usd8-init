// USD8 Stablecoin Contract Configuration
// Network: Base (Chain ID: 8453)

export const CHAIN_ID = 8453; // Base

export const CONTRACTS = {
  // Yearn Vault - acts as the stablecoin/shares token
  YEARN_VAULT: "0x19f233b2953275196e6343f17b76da098c478e21" as `0x${string}`,
  
  // Thirdweb Staking Contract
  STAKE_CONTRACT: "0x5C98B1575f1e90c305aDe25b7BC8157253499fC2" as `0x${string}`,
  
  // USDC on Base
  USDC: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as `0x${string}`,
  
  // Supply Pool (from API data)
  SUPPLY_POOL: "0x2c14e05e5a4ff62e58df18b22e1a155e9c44722f" as `0x${string}`,
  
  // Shares Token (from API data)
  SHARES_TOKEN: "0x91a11cad744718d19aa63ebbc06fcd0d2d52c975" as `0x${string}`,
} as const;

export const CORPORATE_BONDS = [
  { name: "Apple", symbol: "AAPL", logo: "🍎" },
  { name: "Meta", symbol: "META", logo: "📘" },
  { name: "Google", symbol: "GOOGL", logo: "🔍" },
  { name: "Microsoft", symbol: "MSFT", logo: "🪟" },
  { name: "Nvidia", symbol: "NVDA", logo: "🎮" },
  { name: "Oracle", symbol: "ORCL", logo: "🔴" },
  { name: "JPMorgan", symbol: "JPM", logo: "🏦" },
  { name: "Citigroup", symbol: "C", logo: "🏛️" },
] as const;

export const API_ENDPOINT = "https://earn-single-token-middleware-production.up.railway.app/tvl/all";
