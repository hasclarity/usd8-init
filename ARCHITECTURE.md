# USD8 Architecture Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USD8 ECOSYSTEM                        │
└─────────────────────────────────────────────────────────────┘

┌──────────────────┐         ┌──────────────────┐
│   Landing Page   │         │   Mobile App     │
│    (Next.js)     │         │  (React Native)  │
│                  │         │                  │
│  - Full Web3 UI  │         │  - Info Display  │
│  - Transactions  │         │  - Deep Linking  │
│  - Real-time     │         │  - Native Feel   │
└────────┬─────────┘         └────────┬─────────┘
         │                            │
         │    ┌──────────────────┐   │
         └────┤  Shared Library  ├───┘
              │                  │
              │  - ABIs          │
              │  - Types         │
              │  - Utils         │
              │  - Config        │
              └────────┬─────────┘
                       │
         ┌─────────────┴─────────────┐
         │                           │
    ┌────▼─────┐              ┌─────▼──────┐
    │  wagmi   │              │  Teller    │
    │  viem    │              │    API     │
    │          │              │            │
    └────┬─────┘              └────────────┘
         │
         │
    ┌────▼──────────────────────────────────┐
    │      Base Network (Chain ID: 8453)    │
    └───────────────────────────────────────┘
         │
         │
    ┌────┴──────────────────┬────────────────┐
    │                       │                │
┌───▼────┐         ┌───────▼──────┐   ┌─────▼─────┐
│  USDC  │         │ Yearn Vault  │   │  Staking  │
│ Token  │         │   (USD8)     │   │ Contract  │
│        │         │              │   │           │
└────────┘         └──────────────┘   └───────────┘
```

## User Flow

```
┌──────────┐
│  User    │
└────┬─────┘
     │
     │ 1. Connect Wallet
     ▼
┌──────────────────┐
│  Web3 Provider   │
│  (RainbowKit)    │
└────┬─────────────┘
     │
     │ 2. Deposit USDC
     ▼
┌──────────────────┐
│  Approve USDC    │──► USDC Contract
└────┬─────────────┘
     │
     │ 3. Mint Shares
     ▼
┌──────────────────┐
│  Yearn Vault     │──► Receive USD8 Shares
│  deposit()       │    (earning base APY)
└────┬─────────────┘
     │
     │ 4. Stake Shares
     ▼
┌──────────────────┐
│  Approve Shares  │──► USD8 Token
└────┬─────────────┘
     │
     │ 5. Stake
     ▼
┌──────────────────┐
│  Staking Contract│──► Earn staking rewards
│  stake()         │    (additional APY)
└────┬─────────────┘
     │
     │ 6. Rewards Grow
     ▼
┌──────────────────┐
│  Real-time       │
│  Rewards Ticker  │──► Shows continuously
└────┬─────────────┘    accruing rewards
     │
     │ 7. Claim Rewards
     ▼
┌──────────────────┐
│  claimRewards()  │──► Receive USDC
└────┬─────────────┘
     │
     │ 8. Unstake (optional)
     ▼
┌──────────────────┐
│  withdraw()      │──► Get shares back
└────┬─────────────┘
     │
     │ 9. Withdraw (optional)
     ▼
┌──────────────────┐
│  Vault redeem()  │──► Get USDC back
└──────────────────┘
```

## Data Flow

```
┌────────────┐
│ Teller API │
└─────┬──────┘
      │
      │ Every 30s
      │ (auto-refresh)
      ▼
┌────────────────┐
│ fetchUSD8Data()│
│                │
│ - totalApy     │
│ - TVL          │
│ - utilization  │
│ - strategies   │
└───────┬────────┘
        │
        │ Parse & Format
        ▼
┌────────────────┐
│  React State   │
│  (useState)    │
└───────┬────────┘
        │
        │ Render
        ▼
┌────────────────────────────┐
│  UI Components             │
│  - StatsCard               │
│  - FundDistribution        │
│  - BackingInfo             │
└────────────────────────────┘
```

## Component Hierarchy

```
App
├── ThemeProvider
│   └── Web3Provider
│       └── Page
│           ├── Header
│           │   ├── Logo
│           │   ├── ThemeToggle
│           │   └── ConnectButton (RainbowKit)
│           │
│           ├── Hero Section
│           │
│           ├── StatsCard
│           │   ├── Total APY Card
│           │   ├── TVL Card
│           │   └── Utilization Card
│           │
│           ├── BackingInfo
│           │   └── Corporate Bonds Grid
│           │
│           ├── RewardsTicker
│           │   └── Live Rewards Display
│           │
│           ├── Main Grid
│           │   ├── StakingInterface
│           │   │   ├── Tabs (Deposit/Stake/Claim/etc)
│           │   │   ├── Balance Display
│           │   │   ├── Input Field
│           │   │   └── Action Button
│           │   │
│           │   └── FundDistribution
│           │       ├── Pie Chart
│           │       └── Strategy List
│           │
│           ├── Features Section
│           │
│           └── Footer
```

## Smart Contract Interaction

```
Landing Page Component
         │
         │ useWriteContract hook
         ▼
    ┌──────────────┐
    │    wagmi     │
    └──────┬───────┘
           │
           │ formatTransaction
           ▼
    ┌──────────────┐
    │     viem     │
    └──────┬───────┘
           │
           │ RPC call
           ▼
    ┌──────────────┐
    │  Base RPC    │
    └──────┬───────┘
           │
           │ Submit transaction
           ▼
    ┌──────────────────┐
    │ Smart Contract   │
    │                  │
    │ - deposit()      │
    │ - stake()        │
    │ - claimRewards() │
    │ - withdraw()     │
    │ - redeem()       │
    └──────┬───────────┘
           │
           │ Transaction receipt
           ▼
    ┌──────────────────┐
    │ useWaitForTx     │
    │ (confirmation)   │
    └──────┬───────────┘
           │
           │ Update UI
           ▼
    ┌──────────────────┐
    │ Success Message  │
    │ Refresh Balances │
    └──────────────────┘
```

## State Management

```
┌─────────────────────────────────┐
│        React Context            │
│  - ThemeContext (theme state)   │
│  - WagmiConfig (wallet state)   │
└─────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────┐
│      Component State            │
│  - loading                      │
│  - data (TokenData)             │
│  - amount (input)               │
│  - activeTab                    │
└─────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────┐
│      Wagmi Hooks                │
│  - useAccount (address)         │
│  - useReadContract (balances)   │
│  - useWriteContract (actions)   │
│  - useWaitForTx (confirmations) │
└─────────────────────────────────┘
```

## Deployment Architecture

```
┌─────────────────────────────────────┐
│           GitHub Repo               │
└───────────┬─────────────────────────┘
            │
            │ git push
            ▼
     ┌──────────────┐
     │   Vercel     │
     │              │
     │ - Auto build │
     │ - Auto deploy│
     │ - CDN        │
     └──────┬───────┘
            │
            │ HTTPS
            ▼
     ┌──────────────┐
     │   Users      │
     │              │
     │ - Desktop    │
     │ - Mobile     │
     │ - Tablet     │
     └──────────────┘


Mobile App
     │
     │ eas build
     ▼
┌──────────────┐
│  Expo EAS    │
│              │
│ - Build APK  │
│ - Build IPA  │
└──────┬───────┘
       │
       │ Submit
       ▼
┌──────────────┬──────────────┐
│  App Store   │ Play Store   │
└──────────────┴──────────────┘
```

## Technology Stack

```
┌────────────────────────────────────────┐
│           Frontend Layer               │
│  - React 19                            │
│  - Next.js 16 (App Router)             │
│  - React Native (Expo)                 │
│  - TypeScript                          │
└─────────────┬──────────────────────────┘
              │
┌─────────────▼──────────────────────────┐
│           Styling Layer                │
│  - Tailwind CSS v4                     │
│  - StyleSheet (React Native)           │
│  - CSS Variables (theming)             │
└─────────────┬──────────────────────────┘
              │
┌─────────────▼──────────────────────────┐
│           Web3 Layer                   │
│  - wagmi 2.19                          │
│  - viem 2.21                           │
│  - RainbowKit 2.2                      │
└─────────────┬──────────────────────────┘
              │
┌─────────────▼──────────────────────────┐
│           Data Layer                   │
│  - React Query                         │
│  - Fetch API                           │
│  - AsyncStorage (mobile)               │
└─────────────┬──────────────────────────┘
              │
┌─────────────▼──────────────────────────┐
│        Blockchain Layer                │
│  - Base Network (L2)                   │
│  - Smart Contracts                     │
│  - JSON-RPC                            │
└────────────────────────────────────────┘
```

## Security Flow

```
User Action
    │
    │ Input validation
    ▼
┌────────────────┐
│ Client-side    │
│ Validation     │
└────┬───────────┘
     │
     │ Amount checks
     │ Balance checks
     ▼
┌────────────────┐
│ Approval Check │──► If needed, request approval
└────┬───────────┘
     │
     │ All checks pass
     ▼
┌────────────────┐
│ Sign Tx        │──► User signs in wallet
└────┬───────────┘
     │
     │ Signed
     ▼
┌────────────────┐
│ Submit to      │
│ Blockchain     │
└────┬───────────┘
     │
     │ Mined
     ▼
┌────────────────┐
│ Wait for       │──► Confirmations
│ Confirmation   │
└────┬───────────┘
     │
     │ Confirmed
     ▼
┌────────────────┐
│ Update UI      │
│ Show Success   │
└────────────────┘
```

---

**Legend**:
- `│ └ ┌ ┐ ─ ┴ ┬ ▼ ►` = Flow direction
- `┌─┐` = Component/System boundary
- `─►` = Data/action flow
- `│` = Dependency/connection
