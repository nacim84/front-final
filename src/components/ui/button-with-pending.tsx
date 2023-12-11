"use client"

import React, { ReactNode } from 'react'
import { Button } from './button'
import { BeatLoader } from 'react-spinners';

interface ButtonWithPendingProps {
  children?: ReactNode,
  pending?: boolean,
  className?: string,
  disabled?: boolean | undefined,
  size?: "sm" | "icon" | "default" | "lg" | "custom" | null | undefined,
  text?: string,
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "customPositive" | "customNegative" | "winner" | null | undefined,
  onClick?: () => void
}

export const ButtonWithPending = ({ children, pending, text, className, size, disabled, variant, onClick }: ButtonWithPendingProps) => {
  return (
    <Button onClick={onClick} variant={variant} size={size} disabled={disabled || pending} className={className} type='submit'>
      {pending ? (
        <span className="flex items-center justify-center gap-2">
          {text}
          <BeatLoader size={6} color={"white"} />
        </span>
      ) : (
        <>
          {children}
        </>
      )}
    </Button>
  )
};