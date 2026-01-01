# USD8 Deployment Guide

This guide covers deploying both the landing page and mobile app for the USD8 stablecoin project.

## Landing Page Deployment (Vercel Recommended)

### Prerequisites
- GitHub repository
- Vercel account (free tier works)
- WalletConnect Project ID (get from https://cloud.walletconnect.com/)

### Steps

1. **Get WalletConnect Project ID**
   ```
   Visit: https://cloud.walletconnect.com/
   Create a new project
   Copy your Project ID
   ```

2. **Update Web3Provider.tsx**
   Replace `'USD8_STABLECOIN_PROJECT'` with your actual WalletConnect Project ID in:
   ```
   landing-page/components/Web3Provider.tsx
   ```

3. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm install -g vercel

   # Navigate to landing page
   cd landing-page

   # Deploy
   vercel

   # For production
   vercel --prod
   ```

4. **Configure Vercel Dashboard**
   - Go to your project settings
   - Set Root Directory: `landing-page`
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Alternative: Deploy to Netlify

```bash
cd landing-page
npm run build
# Upload the .next folder to Netlify
```

### Environment Variables

No environment variables needed for basic deployment. Optional variables:

- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: Your WalletConnect project ID
- `NEXT_PUBLIC_APP_URL`: Your deployed URL (for metadata)

## Mobile App Deployment

### Option 1: Expo Application Services (EAS)

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**
   ```bash
   eas login
   ```

3. **Configure the project**
   ```bash
   cd mobile-app
   eas build:configure
   ```

4. **Update app.json**
   - Replace `your-project-id` with your Expo project ID
   - Update bundle identifiers if needed

5. **Build for iOS**
   ```bash
   eas build --platform ios
   ```

6. **Build for Android**
   ```bash
   eas build --platform android
   ```

7. **Submit to App Stores**
   ```bash
   # iOS App Store
   eas submit --platform ios

   # Google Play Store
   eas submit --platform android
   ```

### Option 2: Direct Deep Link Setup

Instead of deploying a standalone app, you can direct users to use the landing page through Coinbase Wallet's browser:

1. **Deploy landing page** (see above)

2. **Create a landing page for mobile users** that shows:
   - QR code to the web app
   - "Open in Coinbase Wallet" button
   - Instructions for using the dApp browser

3. **Update the mobile app** `HomeScreen.tsx`:
   ```typescript
   const dappUrl = 'https://your-deployed-url.vercel.app';
   ```

## Testing

### Landing Page Testing

1. **Local Testing**
   ```bash
   cd landing-page
   npm run dev
   ```
   Visit http://localhost:3000

2. **Test with Coinbase Wallet**
   - Install Coinbase Wallet extension
   - Connect to Base network
   - Get testnet USDC from Base Sepolia faucet
   - Test deposit → stake → claim → unstake → withdraw flow

3. **Mobile Responsive Testing**
   - Open DevTools
   - Toggle device toolbar
   - Test on various screen sizes

### Mobile App Testing

1. **Local Testing (Expo Go)**
   ```bash
   cd mobile-app
   npm start
   ```
   - Scan QR code with Expo Go app
   - Test on physical device

2. **iOS Simulator**
   ```bash
   npm run ios
   ```

3. **Android Emulator**
   ```bash
   npm run android
   ```

## Post-Deployment Checklist

- [ ] WalletConnect Project ID configured
- [ ] Landing page deployed and accessible
- [ ] Mobile app deep links working
- [ ] Test wallet connection on Base network
- [ ] Verify smart contract addresses are correct
- [ ] Test all user flows (deposit, stake, claim, unstake, withdraw)
- [ ] Check theme switching (light/dark)
- [ ] Verify API data is loading correctly
- [ ] Test on multiple devices and browsers
- [ ] SSL certificate active (HTTPS)
- [ ] Analytics configured (optional)
- [ ] Error tracking setup (optional - Sentry recommended)

## Custom Domain Setup

### For Landing Page (Vercel)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain (e.g., usd8.finance)
3. Update DNS records as instructed
4. Wait for DNS propagation (can take up to 48 hours)

## Monitoring and Analytics

### Recommended Tools

1. **Vercel Analytics** (built-in)
   - Already included with Vercel deployment
   - No configuration needed

2. **Google Analytics**
   ```bash
   npm install @next/third-parties
   ```
   Add to `landing-page/app/layout.tsx`

3. **Sentry** (Error Tracking)
   ```bash
   npm install @sentry/nextjs
   ```
   Follow Sentry's Next.js setup guide

## Troubleshooting

### Issue: Build fails on Vercel
**Solution**: Ensure all dependencies are in `package.json`, not just `devDependencies`

### Issue: Wallet connection doesn't work
**Solution**: 
1. Check WalletConnect Project ID is correctly set
2. Verify you're on Base network (Chain ID: 8453)
3. Clear browser cache and retry

### Issue: Mobile app not opening Coinbase Wallet
**Solution**:
1. Ensure Coinbase Wallet is installed
2. Check deep link URL is correct
3. Test on actual device, not simulator

### Issue: API data not loading
**Solution**:
1. Check API endpoint is accessible
2. Verify CORS settings
3. Check browser console for errors

## Security Considerations

1. **Never commit private keys or secrets**
2. **Use environment variables** for sensitive data
3. **Enable HTTPS** on all deployments
4. **Regular dependency updates**: `npm audit` and fix vulnerabilities
5. **Rate limiting**: Consider adding rate limiting to API calls
6. **Smart contract verification**: Always verify contracts on Basescan

## Support

For issues or questions:
1. Check the README.md
2. Review smart contract documentation
3. Test on Base Sepolia testnet first
4. Open an issue on GitHub

## Next Steps

After successful deployment:

1. **Marketing**
   - Create social media presence
   - Write blog posts about USD8
   - Engage with DeFi communities

2. **Community Building**
   - Set up Discord/Telegram
   - Create documentation site
   - Regular updates on yields and strategies

3. **Expansion**
   - Add more yield strategies
   - Integrate with additional protocols
   - Multi-chain deployment

4. **Enhancements**
   - Add transaction history
   - Implement notifications
   - Create dashboard with analytics
   - Add governance features
