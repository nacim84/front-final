"use client"

import { WagmiConfig, configureChains } from 'wagmi';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { sepolia, localhost } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { ReactNode } from 'react';
import { alchemyProvider } from 'wagmi/providers/alchemy';

interface ConnectWalletProviderProps {
 children: ReactNode
}

export const ConnectWalletProvider = ({ children }: ConnectWalletProviderProps) => {
 const NEXT_PUBLIC_PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID || "";
 const NEXT_PUBLIC_ALCHEMY_ID = process.env.NEXT_PUBLIC_ALCHEMY_ID || "";

 const metadata = {
  name: 'Final Project',
  description: 'Final project for Alyra school',
  url: 'http://localhost:3000',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
 }

 const { chains } = configureChains(
  [localhost, sepolia],
  [alchemyProvider({ apiKey: NEXT_PUBLIC_ALCHEMY_ID }),
  publicProvider()
  ]
 );

 const wagmiConfig = defaultWagmiConfig({ chains, projectId: NEXT_PUBLIC_PROJECT_ID, metadata });

 createWeb3Modal({ wagmiConfig, projectId: NEXT_PUBLIC_PROJECT_ID, chains });

 return (
  <WagmiConfig config={wagmiConfig}>
   {children}
  </WagmiConfig>
 );
};
