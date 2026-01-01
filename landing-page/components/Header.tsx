'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ThemeToggle } from './ThemeToggle';
import Image from 'next/image';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
              $8
            </div>
            <div>
              <h1 className="text-xl font-bold">USD8</h1>
              <p className="text-xs text-muted-foreground">Corporate Bond-Backed Stablecoin</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}
