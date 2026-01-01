import React from 'react';
import { ThemeProvider } from './src/components/ThemeProvider';
import { Web3Provider } from './src/components/Web3Provider';
import { HomeScreen } from './src/screens/HomeScreen';

export default function App() {
  return (
    <ThemeProvider>
      <Web3Provider>
        <HomeScreen />
      </Web3Provider>
    </ThemeProvider>
  );
}

