"use client"

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React, { ReactNode } from 'react'

interface CommonDialogProps {
  component: ReactNode;
  text?: string;
  title?: string;
  disabled?: boolean;
  icon?: ReactNode,
  size?: "sm" | "icon" | "default" | "lg" | "custom" | null | undefined,
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "customPositive" | "customNegative" | "winner" | null | undefined,
  className?: string;
}

export const CommonDialog = ({ component, text, title, disabled, icon, size, variant, className }: CommonDialogProps) => {
  return (
    <Dialog>
      {disabled
        ?
        <Button size={size} variant={variant!} disabled={disabled} className='flex items-center justify-between rounded-full'><span className='text-base'>{text}</span>{icon}</Button>
        :
        <DialogTrigger asChild>
          <Button size={size} variant={variant!} className='font-semibold w-full flex items-center justify-between rounded-full'><span className='text-base'>{text}</span>{icon}</Button>
        </DialogTrigger>
      }
      <DialogContent className={className}>
        {title && <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
        </DialogHeader>}
        {component}
      </DialogContent>
    </Dialog>
  )
};