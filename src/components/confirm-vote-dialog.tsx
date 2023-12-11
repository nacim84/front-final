import React from 'react'
import { ButtonWithPending } from './ui/button-with-pending'
import { DialogClose } from './ui/dialog'

interface ConfirmVoteDialogProps {
 action: (choice: string) => void;
 choice: string;
 pending: boolean;
}

export const ConfirmVoteDialog = ({ action, choice, pending }: ConfirmVoteDialogProps) => {
 return (
  <div className='flex flex-col gap-1 md:gap-8 items-center w-full h-full'>
   <span className="text-primary text-2xl font-semibold">Veuillez confirmer votre vote</span>
   <span className="text-primary italic text-base font-semibold">Votre vote est : <strong>{choice}</strong></span>
   <div className='flex items-center justify-between w-full gap-6'>
    <ButtonWithPending onClick={() => action(choice)} size="default" pending={pending} variant="default" className="rounded-full w-full font-semibold">Je scelle mon vote</ButtonWithPending>
    <DialogClose asChild>
     <ButtonWithPending size="default" variant="customNegative" className="rounded-full font-semibold">Je change mon vote</ButtonWithPending>
    </DialogClose>
   </div>
  </div>
 )
}

export default ConfirmVoteDialog