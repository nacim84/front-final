import type { Metadata } from 'next';
import './globals.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { ConnectWalletProvider } from '@/config/connect-wallet-provider'
import { Navbar } from '@/components/navbar'
import { Toaster } from '@/components/ui/toaster'
import { CustomSessionProvider } from '@/config/custom-session-provider'
import { CustomThemeProvider } from '@/config/custom-theme-provider'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Final-Project',
  description: 'Final project for Alyra learning',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang='en' className='light'>
      <body className="font-poppins min-h-max">
        <ConnectWalletProvider>
          <CustomSessionProvider>
            <CustomThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Toaster />
              <Navbar />
              {children}
            </CustomThemeProvider>
          </CustomSessionProvider>
        </ConnectWalletProvider>
        <Toaster />
      </body>
    </html>
  )
}
