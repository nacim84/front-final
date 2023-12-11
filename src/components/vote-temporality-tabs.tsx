import { TVoteSchema } from '@/models/common.schema';
import React from 'react'
import { UseFormReturn } from 'react-hook-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { PlannedVote } from './planned-vote';

interface VoteTemporalityProps {
 formVote: UseFormReturn<TVoteSchema, any, undefined>;
}

export const VoteTemporality = ({ formVote }: VoteTemporalityProps) => {
 return (
  <Tabs defaultValue="live" className="w-full text-base">
   <TabsList className='w-full'>
    <TabsTrigger className='w-full' value="live">Vote live</TabsTrigger>
    <TabsTrigger className='w-full' value="planned">Vote programmé</TabsTrigger>
   </TabsList>
   <TabsContent value="live">
    <span className='text-sm italic text-primary'>Le vote en &quot;Live&quot;, vous trouverez les bouttons d&apos;administration du vote, dans la page de votre profile.</span>
   </TabsContent>
   <TabsContent value="planned">
    <PlannedVote formVote={formVote} />
   </TabsContent>
  </Tabs>
 )
};