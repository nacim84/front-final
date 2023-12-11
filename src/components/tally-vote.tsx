"use client"

import { PartyPopper } from 'lucide-react';
import React, { useState } from 'react';
import { VoteCompletedEvent, contractAddress, profilePath, resolutionsVotingAbi } from '@/constants/common.constants';
import { prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core';
import { BlockTag, parseAbiItem } from 'viem';
import { usePublicClient } from 'wagmi';
import { useToast } from '@/components/ui/use-toast';
import Image from "next/image";
import SuccessIcon from "../../public/svg/success-icon.svg"
import FailureIcon from "../../public/svg/failure-icon.svg";
import { ButtonWithPending } from './ui/button-with-pending';
import { useRouter } from 'next/navigation';
import { updateVoteToDb } from '@/server-actions/votes';

export const TallyVote = () => {
 const client = usePublicClient();
 const { toast } = useToast();
 const [pending, isPending] = useState<boolean>(false);
 const router = useRouter();

 const tallyVoteHandler = async () => {
  try {
   isPending(true);
   const { request } = await prepareWriteContract({
    address: contractAddress as `0x${string}`,
    abi: resolutionsVotingAbi,
    functionName: "tallyVotes",
   });
   const { hash } = await writeContract(request);
   await waitForTransaction({ hash: hash });
   const events = await getEvents();
   const voteId = Number(events.map(e => e.voteId)[0]);

   updateVoteToDb(voteId);
   isPending(false);
   toast({
    description: `Vote completed successfully : ${events.map(
     e => `VoteId : ${Number(e.voteId)}, 
     HashDescription : ${e.hashDescription}, 
     StartDate : ${Number(e.startDate)}, 
     EndDate : ${Number(e.endDate)},
      IsEnabled : ${e.isEnabled}
     .`)}`,
    children: <Image src={SuccessIcon} className="w-6 h-6" alt="success" />,
   });

   // Reditrect to profile page, for display results
   router.push(profilePath);
  } catch (err) {
   isPending(false);
   const error = err as Error;
   console.log(error.message)
   toast({
    description: error.message,
    children: <Image src={FailureIcon} className="w-6 h-6" alt="failure" />,
   });
  }
 };

 const getEvents = async () => {
  const depositLogs = await client.getLogs({
   address: contractAddress as `0x${string}`,
   event: parseAbiItem(VoteCompletedEvent),
   fromBlock: "latest" as BlockTag,
   toBlock: 'latest' as BlockTag
  });
  const events = depositLogs.map(
   log => ({
    hashDescription: log.args.hashDescription,
    voteId: log.args.voteId,
    startDate: log.args.startDate,
    endDate: log.args.endDate,
    isEnabled: log.args.isEnabled,
   })
  );
  return events;
 };
 return (
  <div className='transform transition duration-500 hover:scale-100 w-full'>
   <ButtonWithPending
    pending={pending}
    size="lg"
    variant="winner"
    onClick={tallyVoteHandler}
    className='w-full space-x-24 rounded-full transition duration-150'>
    <div className='flex items-center justify-between w-full'>
     <span className='text-base'>Dépouillement des votes</span>
     <PartyPopper className='h-8 w-8' />
    </div>
   </ButtonWithPending>
  </div>
 )
};