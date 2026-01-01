# Quick Start Guide

Get USD8 up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- A wallet (MetaMask or Coinbase Wallet)
- Some USDC on Base network

## 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd usd8-init

# Install landing page dependencies
cd landing-page
npm install

# Install mobile app dependencies (optional)
cd ../mobile-app
npm install
```

## 2. Configure WalletConnect (Important!)

Get a free WalletConnect Project ID:

1. Visit https://cloud.walletconnect.com/
2. Create an account/login
3. Create a new project
4. Copy your Project ID

Update `landing-page/components/Web3Provider.tsx`:

```typescript
const config = getDefaultConfig({
  appName: 'USD8 Stablecoin',
  projectId: 'YOUR_PROJECT_ID_HERE', // Replace this!
  // ...
});
```

## 3. Run the Landing Page

```bash
cd landing-page
npm run dev
```

Visit http://localhost:3000

## 4. Run the Mobile App (Optional)

```bash
cd mobile-app
npm start
```

Scan the QR code with Expo Go app on your phone.

## 5. Test the App

1. **Connect Wallet**
   - Click "Connect Wallet" in the header
   - Select your wallet (Coinbase Wallet recommended)
   - Approve the connection

2. **Switch to Base Network**
   - Your wallet will prompt you to switch to Base
   - Approve the network switch

3. **Get Some USDC**
   - For testing, use Base Sepolia testnet
   - Get testnet USDC from faucet
   - For production, bridge USDC to Base

4. **Try the Features**
   - **Deposit**: Deposit USDC to get USD8 shares
   - **Stake**: Stake your shares for rewards
   - **Watch**: See your rewards grow in real-time
   - **Claim**: Claim your rewards anytime
   - **Unstake**: Unstake when you want
   - **Withdraw**: Withdraw your USDC

## Understanding USD8

### What is USD8?

USD8 is a stablecoin backed by corporate bonds from 8 major companies:
- 🍎 Apple
- 📘 Meta
- 🔍 Google
- 🪟 Microsoft
- 🎮 Nvidia
- 🔴 Oracle
- 🏦 JPMorgan
- 🏛️ Citigroup

### How Does It Work?

1. **Deposit USDC** → Get USD8 shares (starts earning base APY)
2. **Stake USD8** → Earn additional staking rewards
3. **Earn** → Watch your rewards grow every second
4. **Withdraw** → Redeem shares for USDC anytime

### Current Yields

- **Base APY**: 7.4%
- **Staking APY**: 2.99%
- **Total APY**: 10.39%

*Note: APYs are variable and based on real-time market conditions*

## Smart Contracts (Base Mainnet)

```
Yearn Vault (USD8): 0x19f233b2953275196e6343f17b76da098c478e21
Staking Contract:   0x5C98B1575f1e90c305aDe25b7BC8157253499fC2
USDC on Base:       0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
```

## Mobile Usage

The mobile app shows information and directs you to Coinbase Wallet:

1. Open the mobile app
2. Tap "Open in Coinbase Wallet"
3. Use the dApp browser in Coinbase Wallet
4. Connect and interact with USD8

## Troubleshooting

### "Cannot connect to wallet"
- Make sure you have a Web3 wallet installed
- Try refreshing the page
- Check you're on the Base network

### "Insufficient funds"
- Ensure you have USDC on Base network
- Bridge USDC from Ethereum to Base

### "Transaction failed"
- Check you have enough ETH for gas on Base
- Increase slippage tolerance
- Try again

### "API data not loading"
- Check your internet connection
- The API might be temporarily down
- Refresh the page

## Next Steps

1. **Read the full README**: `README.md`
2. **Deployment guide**: `DEPLOYMENT.md`
3. **Explore the code**: Start with `landing-page/app/page.tsx`
4. **Join the community**: [Add your Discord/Telegram]

## Important Notes

⚠️ **Always DYOR (Do Your Own Research)**
- Smart contracts carry risks
- Only invest what you can afford to lose
- Verify all contract addresses
- Test on testnet first

🔒 **Security**
- Never share your private keys
- Double-check URLs
- Use hardware wallets for large amounts
- Keep your seed phrase safe

📊 **APY is Variable**
- Rates change based on market conditions
- Past performance ≠ future results
- Monitor your positions regularly

## Support

Need help?
1. Check this guide first
2. Read the full README.md
3. Review DEPLOYMENT.md for advanced topics
4. Open an issue on GitHub

## Happy Earning! 🚀

You're all set! Start earning stable yields with USD8.

Remember:
- Start small to test
- Understand the risks
- Monitor your positions
- Enjoy the rewards!
