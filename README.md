# USD8 Stablecoin

USD8 is a corporate bond-backed stablecoin that earns up to 10.39% APY. It's backed by bonds from 8 major companies: Apple, Meta, Google, Microsoft, Nvidia, Oracle, JPMorgan, and Citigroup.

## Features

- 🛡️ **Secure**: Backed by investment-grade corporate bonds from Fortune 500 companies
- 💰 **Profitable**: Earn up to 10.39% APY (7.4% base + 2.99% staking)
- 🚀 **Simple**: Deposit USDC, stake your shares, and earn rewards with no lock-up periods
- 🌓 **Light/Dark Mode**: Fully supports both themes across all platforms
- 📱 **Mobile Optimized**: Designed for the best mobile experience
- ⛓️ **Base Network**: Built on Coinbase's Base L2 for low fees and fast transactions

## Project Structure

This repository contains two applications:

- **`landing-page/`**: Next.js web application with full Web3 integration
- **`mobile-app/`**: React Native (Expo) mobile application optimized for Coinbase Wallet

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- For mobile development: Expo CLI

### Landing Page (Web)

The landing page is a Next.js application that provides full Web3 functionality including:
- Wallet connection via RainbowKit
- Deposit USDC to mint USD8 shares
- Stake shares for additional rewards
- Claim rewards in real-time
- Unstake and withdraw anytime

#### Installation

```bash
cd landing-page
npm install
```

#### Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

#### Build

```bash
npm run build
npm start
```

### Mobile App (React Native)

The mobile app provides an informative interface and directs users to use Coinbase Wallet for transactions.

#### Installation

```bash
cd mobile-app
npm install
```

#### Development

```bash
# Start the development server
npm start

# Run on iOS (requires macOS)
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web
```

## How USD8 Works

### 1. Deposit (Mint)
Deposit USDC into the Yearn Vault to receive USD8 shares. These shares represent your portion of the vault and automatically earn the base APY.

### 2. Stake
Stake your USD8 shares in the staking contract to earn additional rewards on top of the base yield.

### 3. Claim Rewards
Your staking rewards accrue continuously and can be claimed anytime. The landing page shows real-time updates of your growing rewards.

### 4. Unstake
Unstake your USD8 shares anytime to move them back to your wallet. No lock-up periods.

### 5. Withdraw
Redeem your USD8 shares for USDC at any time based on the current share price.

## Smart Contracts

### Network: Base (Chain ID: 8453)

- **Yearn Vault (USD8 Shares)**: `0x19f233b2953275196e6343f17b76da098c478e21`
- **Staking Contract**: `0x5C98B1575f1e90c305aDe25b7BC8157253499fC2`
- **USDC**: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
- **Supply Pool**: `0x2c14e05e5a4ff62e58df18b22e1a155e9c44722f`

## Fund Distribution

USD8 deploys capital across multiple yield strategies including:
- Lending pools
- Liquidity provision
- Yield farming protocols
- Treasury management

The vault automatically rebalances to optimize yields while maintaining safety. View real-time distribution on the landing page.

## API

USD8 uses the Teller Protocol API to fetch real-time data:

**Endpoint**: `https://earn-single-token-middleware-production.up.railway.app/tvl/all`

This provides:
- Current APY (base + staking)
- Total Value Locked (TVL)
- Utilization rates
- Fund distribution across strategies

## Development

### Shared Code

The `shared/` directory contains code shared between web and mobile:
- Smart contract ABIs
- Contract addresses and configuration
- TypeScript types
- Utility functions

Both applications copy this shared code locally during build.

### Testing

For testing Web3 functionality:
1. Connect to Base network in your wallet
2. Ensure you have USDC on Base
3. Test the deposit → stake → claim → unstake → withdraw flow

## Security

- Smart contracts are deployed on Base mainnet
- Always verify contract addresses before interacting
- DYOR (Do Your Own Research) before depositing funds
- Smart contracts inherit security from Teller Protocol and Yearn Finance

## Contributing

This is a demonstration project for a corporate bond-backed stablecoin. For production use:
1. Conduct thorough smart contract audits
2. Set up proper monitoring and alerting
3. Implement comprehensive testing
4. Add admin controls and emergency procedures

## License

MIT

## Disclaimer

This software is provided "as is" without warranty of any kind. Use at your own risk. Always DYOR and never invest more than you can afford to lose.
