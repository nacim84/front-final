"use client"

import React from 'react'
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { LogIn } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { authSignInPath } from '@/constants/common.constants';

const SigninButton = () => {

 const path = usePathname();
 return (
  <>
   {path !== authSignInPath ?
    <Link href={authSignInPath} className={buttonVariants({ variant: "default", size: "xs", className: "flex items-center justify-center gap-2 px-4 whitespace-nowrap font-semibold" })}>
     <span>Connexion</span>
     <LogIn className="w-4 h-4" />
    </Link>
    :
    null
   }
  </>

 )
}

export default SigninButton;