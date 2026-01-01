import type { Metadata } from "next";
import "./globals.css";
import { Web3Provider } from "@/components/Web3Provider";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "USD8 - Corporate Bond-Backed Stablecoin",
  description: "Earn stable yields with USD8, backed by bonds from Apple, Meta, Google, Microsoft, Nvidia, Oracle, JPMorgan, and Citigroup",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <Web3Provider>
            {children}
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
