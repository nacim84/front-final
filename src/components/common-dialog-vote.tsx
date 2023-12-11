"use client"

import { cn } from '@/lib/utils';
import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import ConfirmVoteDialog from './confirm-vote-dialog';

interface CommonDialogVoteProps {
 text: string;
 action: (choice: string) => void;
 size?: "sm" | "icon" | "default" | "lg" | "custom" | null | undefined,
 variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "customPositive" | "customNegative" | "winner" | null | undefined,
 className?: string;
}

const CommonDialogVote = ({ text, className, action }: CommonDialogVoteProps) => {
 return (
  <Dialog>
   <DialogTrigger asChild>
    <button className={cn(`p-1 text-2xl flex font-bold items-center justify-center rounded-full w-36 h-36 shadow-lg cursor-pointer hover:-translate-y-2 hover:duration-200`, className)}>
     {text}
    </button>
   </DialogTrigger>
   <DialogContent>
    <ConfirmVoteDialog action={action} choice={text.toUpperCase()} />
   </DialogContent>
  </Dialog>
 )
}

export default CommonDialogVote;