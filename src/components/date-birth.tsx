"use client"

import { TUserSchema } from '@/models/common.schema';
import React, { useEffect, useState } from 'react'
import DateTimePicker from 'react-datetime-picker';
import { UseFormReturn } from 'react-hook-form';

interface DateBirthProps {
 formUser: UseFormReturn<TUserSchema, any, undefined>;
}

export const DateBirth = ({ formUser: formVote }: DateBirthProps) => {

 const [dateBirth, onChangeDateBirth] = useState<Date>(new Date(2005, 1, 1, 0, 0, 0));

 useEffect(() => {
  formVote.setValue("dateBirth", dateBirth);
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [dateBirth]);

 return (
  <div className='flex items-center justify-between h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'>
   <span className='w-28 text-base whitespace-nowrap'>Date de naissance</span>
   <DateTimePicker onChange={onChangeDateBirth} value={dateBirth} className="bg-white mr-2 border-0 inline-flex relative w-[15vw] dark:bg-gray-800" />
  </div>
 )
};