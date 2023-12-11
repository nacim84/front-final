"use client"
import React, { ReactNode } from 'react'

interface CommonModalProps {
  component: ReactNode;
}
export const CommonModal = ({ component }: CommonModalProps) => {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-50 bg-violet-950 backdrop-blur-md flex items-center justify-center'>
      <div className='bg-primary-foreground p-4 flex flex-col items-center w-[30rem] h-[13rem] rounded-lg shadow-lg'>
        {component}
      </div>
    </div>
  )
};