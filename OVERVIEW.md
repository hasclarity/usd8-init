# USD8 Project Overview

## What is USD8?

USD8 is a corporate bond-backed stablecoin that provides stable yields backed by bonds from 8 Fortune 500 companies:

🍎 Apple | 📘 Meta | 🔍 Google | 🪟 Microsoft | 🎮 Nvidia | 🔴 Oracle | 🏦 JPMorgan | 🏛️ Citigroup

**Current APY: 10.39%** (7.4% base + 2.99% staking)

## Quick Links

- **Get Started**: [QUICKSTART.md](QUICKSTART.md) - 5-minute setup guide
- **Full Documentation**: [README.md](README.md) - Complete project documentation
- **Deploy**: [DEPLOYMENT.md](DEPLOYMENT.md) - Production deployment guide
- **Configure**: [CONFIGURATION.md](CONFIGURATION.md) - Customization options
- **Contribute**: [CONTRIBUTING.md](CONTRIBUTING.md) - Development guidelines

## Project Components

### 1. Landing Page (Next.js)

**Location**: `landing-page/`

A fully-featured Web3 application with:
- 🔗 Wallet connection (RainbowKit + WalletConnect)
- 💸 Deposit USDC to mint USD8 shares
- 📈 Stake shares for additional rewards
- 🎁 Claim rewards in real-time
- 📉 Unstake and withdraw anytime
- 🌓 Light/dark theme support
- 📊 Interactive fund distribution charts
- 📱 Mobile-responsive design

**Tech Stack**:
- Next.js 16.1 (App Router)
- TypeScript
- Tailwind CSS v4
- wagmi + viem (Web3)
- RainbowKit (Wallet UI)
- Recharts (Data viz)

### 2. Mobile App (React Native)

**Location**: `mobile-app/`

A mobile-optimized companion app featuring:
- 📊 Real-time stats and APY display
- 🏢 Corporate bonds visualization
- 🔄 Pull-to-refresh data updates
- 🌓 Automatic theme detection
- 📲 Deep link to Coinbase Wallet

**Tech Stack**:
- Expo SDK
- React Native
- TypeScript
- wagmi + viem
- AsyncStorage

### 3. Shared Libraries

**Location**: `shared/`

Common code used by both applications:
- Smart contract ABIs
- Contract addresses and configs
- TypeScript type definitions
- Utility functions
- API integration code

## Key Features

### For Users

1. **Deposit & Earn**
   - Deposit USDC on Base network
   - Receive USD8 shares
   - Automatically earn base yield

2. **Stake for More**
   - Stake USD8 shares
   - Earn additional staking rewards
   - Watch rewards tick up in real-time

3. **Full Control**
   - Claim rewards anytime
   - Unstake without penalties
   - Withdraw USDC on demand
   - No lock-up periods

4. **Transparency**
   - View fund distribution
   - See all yield strategies
   - Track utilization rates
   - Real-time APY updates

### For Developers

1. **Modern Stack**
   - TypeScript throughout
   - React best practices
   - Tailwind CSS styling
   - Web3 integration

2. **Well Documented**
   - Comprehensive READMEs
   - Code comments
   - Type definitions
   - Configuration guides

3. **Easy to Deploy**
   - Vercel-ready
   - Expo EAS compatible
   - Environment variables
   - CI/CD friendly

4. **Customizable**
   - Change contracts
   - Update branding
   - Modify features
   - Configure networks

## Smart Contracts (Base Network)

```
Network:        Base (Chain ID: 8453)
Yearn Vault:    0x19f233b2953275196e6343f17b76da098c478e21
Staking:        0x5C98B1575f1e90c305aDe25b7BC8157253499fC2
USDC:           0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
Supply Pool:    0x2c14e05e5a4ff62e58df18b22e1a155e9c44722f
```

## Current Metrics

- **Total APY**: 10.39%
- **Base APY**: 7.4%
- **Staking APY**: 2.99%
- **TVL**: $695K+ (variable)
- **Utilization**: ~17.7%
- **Strategies**: 27 active strategies

## How It Works

```
User Deposits USDC
       ↓
Vault Mints USD8 Shares
       ↓
Shares Earn Base Yield (7.4%)
       ↓
User Stakes Shares
       ↓
Earns Staking Rewards (2.99%)
       ↓
Total Yield: 10.39% APY
```

## File Structure

```
usd8-init/
├── landing-page/              # Next.js web app
│   ├── app/
│   │   ├── layout.tsx        # Root layout with providers
│   │   ├── page.tsx          # Home page
│   │   └── globals.css       # Global styles + theme
│   ├── components/
│   │   ├── Web3Provider.tsx  # Web3 config
│   │   ├── ThemeProvider.tsx # Theme management
│   │   ├── Header.tsx        # App header
│   │   ├── StakingInterface.tsx  # Main staking UI
│   │   ├── StatsCard.tsx     # Metrics display
│   │   ├── FundDistribution.tsx  # Charts
│   │   └── RewardsTicker.tsx # Real-time rewards
│   └── lib/                  # Utilities, types, ABIs
│
├── mobile-app/               # React Native app
│   ├── App.tsx              # Root component
│   ├── app.json             # Expo config
│   └── src/
│       ├── components/      # Providers
│       ├── screens/         # App screens
│       └── lib/            # Shared code copy
│
├── shared/                  # Shared between platforms
│   └── src/
│       ├── abis/           # Contract ABIs
│       ├── config/         # Addresses, constants
│       ├── types/          # TypeScript types
│       └── utils/          # Helper functions
│
└── Documentation
    ├── README.md           # Main documentation
    ├── QUICKSTART.md       # 5-minute guide
    ├── DEPLOYMENT.md       # Deploy instructions
    ├── CONFIGURATION.md    # Customization guide
    └── CONTRIBUTING.md     # Development guide
```

## Development Workflow

1. **Clone & Install**
   ```bash
   git clone <repo>
   cd usd8-init
   cd landing-page && npm install
   cd ../mobile-app && npm install
   ```

2. **Configure**
   - Get WalletConnect Project ID
   - Update `Web3Provider.tsx`
   - Set contract addresses (if needed)

3. **Develop**
   ```bash
   # Web
   cd landing-page && npm run dev
   
   # Mobile
   cd mobile-app && npm start
   ```

4. **Test**
   - Connect wallet
   - Test all features
   - Check themes
   - Verify mobile responsiveness

5. **Deploy**
   - Web: Deploy to Vercel
   - Mobile: Build with EAS

## Security Considerations

⚠️ **Important**:
- Always verify contract addresses
- Test on testnet first
- Never commit private keys
- Use hardware wallets for large amounts
- DYOR before investing

## Roadmap Ideas

Future enhancements could include:

- [ ] Transaction history
- [ ] Portfolio analytics
- [ ] Multi-language support
- [ ] Advanced charts and metrics
- [ ] Notifications for rewards
- [ ] Governance features
- [ ] Additional networks
- [ ] More yield strategies

## Performance

- **Web**: Lighthouse score 90+
- **Mobile**: Smooth 60fps animations
- **Bundle**: Optimized with code splitting
- **API**: Cached responses (30s)

## Browser/Device Support

### Web
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Mobile
- ✅ iOS 13+
- ✅ Android 8+
- ✅ React Native 0.75+

## Dependencies

### Key Dependencies

**Web**:
- next: 16.1.1
- react: 19.0.0
- wagmi: 2.19.5
- viem: 2.21.54
- @rainbow-me/rainbowkit: 2.2.10

**Mobile**:
- expo: Latest
- react-native: 0.75
- wagmi: 2.19.5
- @tanstack/react-query: Latest

## Support

- 📖 Documentation: Read the guides
- 🐛 Issues: Open a GitHub issue
- 💬 Community: [Your Discord/Telegram]
- 📧 Email: [Your email]

## License

MIT License - feel free to use, modify, and distribute.

## Acknowledgments

Built with:
- **Teller Protocol** - Lending infrastructure
- **Yearn Finance** - Vault technology
- **Base** - L2 network
- **Thirdweb** - Staking contracts

## Final Notes

USD8 demonstrates:
- ✅ Full Web3 integration
- ✅ Multi-platform development
- ✅ Modern React patterns
- ✅ TypeScript best practices
- ✅ Responsive design
- ✅ Theme management
- ✅ Real-time data
- ✅ Production-ready code

Ready to deploy and earn! 🚀

---

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Network**: Base (Chain ID: 8453)  
**Status**: Production Ready ✅
