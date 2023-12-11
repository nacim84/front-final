"use client"
import { signOut } from 'next-auth/react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { TButtonSizes, TButtonVariants } from '@/models/ui.model'
import { useDisconnect } from 'wagmi'

interface SignoutButtonProps {
 variant: TButtonVariants;
 size: TButtonSizes;
 text: string;
}

const SignoutButton = ({ variant, size, text }: SignoutButtonProps) => {
 const { disconnectAsync } = useDisconnect();
 const handleSignout = async () => {
  disconnectAsync();
  signOut({ callbackUrl: "/" });
 };
 return (
  <Button
   size={size}
   variant={variant}
   onClick={handleSignout}
   className="flex items-center justify-center gap-2 whitespace-nowrap"
  >
   <LogOut className="w-4 h-4" />
   <span>{text}</span>
  </Button>
 )
}

export default SignoutButton;