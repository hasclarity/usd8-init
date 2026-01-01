import { API_ENDPOINT } from "../config/contracts";
import type { TokenData } from "../types";

export async function fetchUSD8Data(): Promise<TokenData | null> {
  try {
    const response = await fetch(API_ENDPOINT);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Find the USDC token data
    const usdcData = data.find((token: TokenData) => token.token === "USDC");
    
    return usdcData || null;
  } catch (error) {
    console.error("Error fetching USD8 data:", error);
    return null;
  }
}

export function formatNumber(value: number, decimals = 2): string {
  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(decimals)}B`;
  }
  if (value >= 1e6) {
    return `${(value / 1e6).toFixed(decimals)}M`;
  }
  if (value >= 1e3) {
    return `${(value / 1e3).toFixed(decimals)}K`;
  }
  return value.toFixed(decimals);
}

export function formatCurrency(value: number, decimals = 2): string {
  return `$${formatNumber(value, decimals)}`;
}

export function formatPercentage(value: number, decimals = 2): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatTokenAmount(value: bigint, decimals = 6): string {
  const divisor = BigInt(10 ** decimals);
  const wholePart = value / divisor;
  const fractionalPart = value % divisor;
  
  if (fractionalPart === 0n) {
    return wholePart.toString();
  }
  
  const fractionalStr = fractionalPart.toString().padStart(decimals, '0');
  const trimmed = fractionalStr.replace(/0+$/, '');
  
  // Handle case where all fractional digits were zeros
  if (trimmed === '') {
    return wholePart.toString();
  }
  
  return `${wholePart}.${trimmed}`;
}

export function parseTokenAmount(value: string, decimals = 6): bigint {
  const [whole = "0", fraction = ""] = value.split(".");
  const paddedFraction = fraction.padEnd(decimals, "0").slice(0, decimals);
  return BigInt(whole + paddedFraction);
}
