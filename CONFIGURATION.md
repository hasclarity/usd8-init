# USD8 Configuration Guide

This guide explains how to customize USD8 for your specific deployment.

## Smart Contract Configuration

Edit: `shared/src/config/contracts.ts` (and copy to landing-page/lib and mobile-app/src/lib)

```typescript
export const CONTRACTS = {
  // Yearn Vault - acts as the stablecoin/shares token
  YEARN_VAULT: "0x19f233b2953275196e6343f17b76da098c478e21",
  
  // Thirdweb Staking Contract  
  STAKE_CONTRACT: "0x5C98B1575f1e90c305aDe25b7BC8157253499fC2",
  
  // USDC on Base
  USDC: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  
  // ... other contracts
};
```

### To Use Different Contracts:
1. Update the addresses in `contracts.ts`
2. Copy the file to both `landing-page/lib/config/` and `mobile-app/src/lib/config/`
3. Rebuild both apps

## Corporate Bonds Configuration

Edit: `shared/src/config/contracts.ts`

```typescript
export const CORPORATE_BONDS = [
  { name: "Apple", symbol: "AAPL", logo: "🍎" },
  { name: "Meta", symbol: "META", logo: "📘" },
  // Add or modify companies here
] as const;
```

### To Customize:
- Change company names
- Update ticker symbols
- Modify emojis (or use image URLs)

## API Endpoint Configuration

Edit: `shared/src/config/contracts.ts`

```typescript
export const API_ENDPOINT = "https://your-api-endpoint.com/tvl/all";
```

### API Response Format

Your API should return an array of token data. USD8 looks for the token with `"token": "USDC"`:

```json
[
  {
    "token": "USDC",
    "totalApy": 10.39,
    "baseApy": 7.4,
    "stakingApy": 2.99,
    "depositTVL_usd": 695544.86,
    "utilization": 17.72,
    "yearnVault": {
      "debts": [
        {
          "name": "Strategy Name",
          "percentOfAssets": 23.69,
          "currentDebt": "102978453571"
        }
      ]
    }
  }
]
```

## Branding Configuration

### Colors

Edit: `landing-page/app/globals.css`

```css
:root {
  --color-primary: 99 102 241;  /* Indigo */
  --color-success: 34 197 94;   /* Green */
  /* Modify these values */
}
```

For mobile, edit: `mobile-app/src/components/ThemeProvider.tsx`

```typescript
const lightColors = {
  primary: '#6366F1',  // Change this
  success: '#22C55E',  // And this
  // ...
};
```

### Logo

Replace the logo gradient in:
- `landing-page/components/Header.tsx`
- `mobile-app/src/screens/HomeScreen.tsx`

```tsx
// Web
<div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600">
  <div className="text-white font-bold text-xl">$8</div>
</div>

// Mobile
<View style={{ backgroundColor: '#6366F1' }}>
  <Text style={{ color: '#FFFFFF' }}>$8</Text>
</View>
```

### App Name

1. **Landing Page**
   - `landing-page/app/layout.tsx`: Update metadata
   - `landing-page/components/Header.tsx`: Update title

2. **Mobile App**
   - `mobile-app/app.json`: Update name and slug
   - `mobile-app/src/screens/HomeScreen.tsx`: Update header

## Network Configuration

To deploy on a different network (e.g., Ethereum, Polygon):

Edit: `shared/src/config/contracts.ts`

```typescript
export const CHAIN_ID = 8453; // Base
// Change to:
// 1 for Ethereum Mainnet
// 137 for Polygon
// 42161 for Arbitrum
// etc.
```

Also update in:
- `landing-page/components/Web3Provider.tsx`
- `mobile-app/src/components/Web3Provider.tsx`

```typescript
import { base } from 'wagmi/chains';
// Change to your network, e.g.:
// import { mainnet } from 'wagmi/chains';
// import { polygon } from 'wagmi/chains';
```

## WalletConnect Configuration

Get a project ID from https://cloud.walletconnect.com/

Edit: `landing-page/components/Web3Provider.tsx`

```typescript
const config = getDefaultConfig({
  appName: 'Your App Name',
  projectId: 'YOUR_PROJECT_ID_HERE',
  // ...
});
```

## Mobile App Deep Links

Edit: `mobile-app/src/screens/HomeScreen.tsx`

```typescript
const openCoinbaseWallet = () => {
  const dappUrl = 'https://your-deployed-url.com';  // Update this
  Linking.openURL(`https://go.cb-w.com/dapp?cb_url=${encodeURIComponent(dappUrl)}`);
};
```

## Text and Copy

### Landing Page Hero

Edit: `landing-page/app/page.tsx`

```tsx
<h1>Your Custom Headline</h1>
<p>Your custom description</p>
```

### Mobile App Hero

Edit: `mobile-app/src/screens/HomeScreen.tsx`

```tsx
<Text>Your Custom Headline</Text>
<Text>Your custom description</Text>
```

## Feature Flags

To disable features, comment out sections in:
- Deposit: `StakingInterface.tsx` - remove 'deposit' from tabs
- Stake: Remove 'stake' from tabs
- Claim: Remove 'claim' from tabs

## Analytics Configuration

### Google Analytics

1. Install: `npm install @next/third-parties`

2. Add to `landing-page/app/layout.tsx`:

```typescript
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  )
}
```

### Sentry (Error Tracking)

1. Install: `npm install @sentry/nextjs`

2. Follow Sentry's Next.js setup guide

## Performance Optimization

### Image Optimization

Replace emoji logos with actual images:

1. Add images to `public/logos/`
2. Update corporate bonds config to use image paths
3. Use Next.js `Image` component

### API Caching

Add caching to API calls in `shared/src/utils/index.ts`:

```typescript
let cachedData: TokenData | null = null;
let lastFetch = 0;
const CACHE_DURATION = 30000; // 30 seconds

export async function fetchUSD8Data(): Promise<TokenData | null> {
  const now = Date.now();
  if (cachedData && (now - lastFetch) < CACHE_DURATION) {
    return cachedData;
  }
  
  // ... fetch logic
  lastFetch = now;
  cachedData = usdcData;
  return cachedData;
}
```

## Environment Variables

Create `.env.local` files:

### Landing Page

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_API_ENDPOINT=https://your-api.com
NEXT_PUBLIC_CHAIN_ID=8453
```

### Using Environment Variables

```typescript
const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || 
  "https://earn-single-token-middleware-production.up.railway.app/tvl/all";
```

## Testing Configuration

### Testnet Setup

1. Change chain ID to testnet (e.g., Base Sepolia: 84532)
2. Update contract addresses to testnet contracts
3. Use testnet USDC

### Mock Data

For development without API access, add mock data:

```typescript
const MOCK_DATA: TokenData = {
  token: "USDC",
  totalApy: 10.39,
  // ... full mock object
};

export async function fetchUSD8Data(): Promise<TokenData | null> {
  if (process.env.NODE_ENV === 'development') {
    return MOCK_DATA;
  }
  // ... real fetch
}
```

## Building for Production

After configuration:

```bash
# Landing page
cd landing-page
npm run build
npm start

# Mobile app
cd mobile-app
eas build --platform all
```

## Checklist

Before deploying:

- [ ] Update contract addresses
- [ ] Configure WalletConnect Project ID
- [ ] Update API endpoint
- [ ] Customize branding (colors, logo, text)
- [ ] Set up analytics (optional)
- [ ] Test on testnet
- [ ] Update social links
- [ ] Add contact information
- [ ] Configure error tracking
- [ ] Set up monitoring
- [ ] Test all features
- [ ] Review security settings

## Need Help?

- Check `README.md` for general information
- See `DEPLOYMENT.md` for deployment instructions
- Review `QUICKSTART.md` for getting started
- Open an issue for specific problems
