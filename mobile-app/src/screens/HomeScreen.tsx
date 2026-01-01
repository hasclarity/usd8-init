import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Linking,
  RefreshControl,
} from 'react-native';
import { useTheme } from '../components/ThemeProvider';
import { fetchUSD8Data } from '../lib/utils';
import type { TokenData } from '../lib/types';
import { CORPORATE_BONDS } from '../lib/config/contracts';
import { formatCurrency, formatPercentage } from '../lib/utils';

export function HomeScreen() {
  const { colors, effectiveTheme } = useTheme();
  const [data, setData] = useState<TokenData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const result = await fetchUSD8Data();
      setData(result);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const openCoinbaseWallet = () => {
    // Deep link to Coinbase Wallet browser with the dapp URL
    const dappUrl = 'https://usd8.app'; // Replace with your actual deployed URL
    Linking.openURL(`https://go.cb-w.com/dapp?cb_url=${encodeURIComponent(dappUrl)}`);
  };

  const styles = createStyles(colors);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={effectiveTheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>$8</Text>
            </View>
            <View>
              <Text style={[styles.title, { color: colors.text }]}>USD8</Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Corporate Bond-Backed
              </Text>
            </View>
          </View>
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <Text style={[styles.heroTitle, { color: colors.text }]}>
            Stable Yields,{'\n'}Backed by Giants
          </Text>
          <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
            Earn up to 10.39% APY with USD8, backed by bonds from the world's most trusted companies
          </Text>
        </View>

        {/* Stats Cards */}
        {!loading && data && (
          <View style={styles.statsContainer}>
            <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total APY</Text>
              <Text style={[styles.statValue, { color: colors.success }]}>
                {formatPercentage(data.totalApy)}
              </Text>
              <Text style={[styles.statDetail, { color: colors.textSecondary }]}>
                {formatPercentage(data.baseApy)} base + {formatPercentage(data.stakingApy)} staking
              </Text>
            </View>

            <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total Value Locked</Text>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {formatCurrency(data.depositTVL_usd, 0)}
              </Text>
              <Text style={[styles.statDetail, { color: colors.textSecondary }]}>
                Across {data.yearnVault.debts.length} strategies
              </Text>
            </View>

            <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Utilization</Text>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {formatPercentage(data.utilization)}
              </Text>
              <Text style={[styles.statDetail, { color: colors.textSecondary }]}>
                Of supply deployed
              </Text>
            </View>
          </View>
        )}

        {/* Corporate Bonds */}
        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Backed by Corporate Bonds
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
            USD8 is secured by high-grade corporate bonds from 8 major companies
          </Text>
          
          <View style={styles.bondsGrid}>
            {CORPORATE_BONDS.map((bond) => (
              <View key={bond.symbol} style={[styles.bondCard, { backgroundColor: colors.surface }]}>
                <Text style={styles.bondLogo}>{bond.logo}</Text>
                <Text style={[styles.bondName, { color: colors.text }]}>{bond.name}</Text>
                <Text style={[styles.bondSymbol, { color: colors.textSecondary }]}>{bond.symbol}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* CTA to use Coinbase Wallet */}
        <View style={[styles.ctaSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.ctaTitle, { color: colors.text }]}>Start Earning with USD8</Text>
          <Text style={[styles.ctaSubtitle, { color: colors.textSecondary }]}>
            Use Coinbase Wallet to deposit, stake, and earn rewards
          </Text>
          
          <TouchableOpacity
            style={[styles.ctaButton, { backgroundColor: colors.primary }]}
            onPress={openCoinbaseWallet}
          >
            <Text style={[styles.ctaButtonText, { color: colors.primaryForeground }]}>
              Open in Coinbase Wallet
            </Text>
          </TouchableOpacity>

          <View style={styles.steps}>
            <Text style={[styles.stepsTitle, { color: colors.text }]}>How it works:</Text>
            <Text style={[styles.stepText, { color: colors.textSecondary }]}>
              1. Deposit USDC to mint USD8 shares
            </Text>
            <Text style={[styles.stepText, { color: colors.textSecondary }]}>
              2. Stake your shares for additional rewards
            </Text>
            <Text style={[styles.stepText, { color: colors.textSecondary }]}>
              3. Claim rewards anytime
            </Text>
            <Text style={[styles.stepText, { color: colors.textSecondary }]}>
              4. Unstake and withdraw whenever you want
            </Text>
          </View>
        </View>

        {/* Features */}
        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Why USD8?</Text>
          
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🛡️</Text>
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, { color: colors.text }]}>Secure</Text>
              <Text style={[styles.featureText, { color: colors.textSecondary }]}>
                Backed by investment-grade corporate bonds from Apple, Meta, Google, Microsoft, Nvidia, Oracle, JPMorgan, and Citigroup.
              </Text>
            </View>
          </View>

          <View style={styles.feature}>
            <Text style={styles.featureIcon}>💰</Text>
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, { color: colors.text }]}>Profitable</Text>
              <Text style={[styles.featureText, { color: colors.textSecondary }]}>
                Earn competitive yields through a combination of base APY and staking rewards on Base.
              </Text>
            </View>
          </View>

          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🚀</Text>
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, { color: colors.text }]}>Simple</Text>
              <Text style={[styles.featureText, { color: colors.textSecondary }]}>
                Deposit, stake, and earn. No lock-up periods. Withdraw anytime.
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            © 2026 USD8. Built on Base. Powered by Teller Protocol.
          </Text>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            Always DYOR. Smart contracts are audited but use at your own risk.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
  },
  hero: {
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  statsContainer: {
    padding: 20,
    gap: 16,
  },
  statCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  statLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statDetail: {
    fontSize: 12,
  },
  section: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  bondsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  bondCard: {
    width: '47%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bondLogo: {
    fontSize: 32,
    marginBottom: 8,
  },
  bondName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  bondSymbol: {
    fontSize: 12,
  },
  ctaSection: {
    margin: 20,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: 14,
    marginBottom: 24,
    textAlign: 'center',
  },
  ctaButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 24,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  steps: {
    width: '100%',
    marginTop: 8,
  },
  stepsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  stepText: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  feature: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },
  featureIcon: {
    fontSize: 24,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },
});
