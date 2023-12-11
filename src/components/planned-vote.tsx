"use client"

import { TVoteSchema } from '@/models/common.schema';
import React, { useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { UseFormReturn } from 'react-hook-form';

interface PlannedVoteProps {
 formVote: UseFormReturn<TVoteSchema, any, undefined>;
}

export const PlannedVote = ({ formVote }: PlannedVoteProps) => {
 const [startDate, onChangeStartDate] = useState<Date>(new Date());
 const [endDate, onChangeEndDate] = useState<Date>(new Date());

 useEffect(() => {
  formVote.setValue("voteTemporality", { type: "PLANNED", startDate: startDate, endDate: endDate });
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [startDate, endDate]);

 return (
  <div className='space-y-4'>
   <span className='text-sm italic text-gray-800 dark:text-gray-400'>Le vote &quot;Programmé&quot;, ouvre et cloture automatiquement votre scrutin sans action de votre part.
    <br />Mode parfait si vous laissez plusieurs jours aux votants pour s&apos;exprimer.
   </span>
   <div className='flex flex-col items-center gap-4'>

    <div className='flex gap-2 items-center'>
     <span className='w-28 text-base font-semibold'>Date de début</span>
     <DateTimePicker onChange={onChangeStartDate} value={startDate} className="bg-white border-0 inline-flex relative w-[20vw] dark:bg-gray-800" />
    </div>
    <div className='flex gap-2 items-center'>
     <span className='w-28 text-base font-semibold'>Date de fin</span>
     <DateTimePicker onChange={onChangeEndDate} value={endDate} className="bg-white border-0 inline-flex relative w-[20vw] dark:bg-gray-800" />
    </div>
   </div>
  </div>
 )
};