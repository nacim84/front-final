"use client"
import { cn } from '@/lib/utils';
import { Session } from 'next-auth';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import RnBlockIcon from "../../public/svg/rn-block.svg";

const font = Poppins({
 weight: "600",
 subsets: ["latin"],
});

interface LogoProps {
 session: Session | null;
}

const Logo = ({ session }: LogoProps) => {
 return (
  <Link href="/" className={cn(
   "text-xl md:text-2xl text-primary whitespace-nowrap",
   font.className, session && session.user ? "hidden md:block" : "block"
  )}>
   <div className='flex items-center gap-2 text-secondary-foreground'>
    <Image src={RnBlockIcon} className="w-10 h-10 bg-white p-1 rounded-full" alt="logo" />
    <strong>Voting-FAA&rsquo;A</strong>
   </div>
  </Link>
 )
}

export default Logo;