"use client"

import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

interface CustomSessionProvider {
 children: ReactNode
}

export const CustomSessionProvider = ({ children }: CustomSessionProvider) => {
 return (
  <SessionProvider refetchInterval={0}>
   {children}
  </SessionProvider>
 )
};