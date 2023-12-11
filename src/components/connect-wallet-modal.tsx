import React from 'react'
import { CustomConnectWallet } from './custom-connect-wallet';

export const ConnectWalletModal = () => {
 return (
  <div className='flex flex-col items-center justify-between gap-6 pt-10'>
   <h1 className='text-3xl font-semibold text-white italic'>Please connect to your wallet.</h1>
   <CustomConnectWallet />
  </div>
 )
};