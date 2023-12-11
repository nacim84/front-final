"use client"

import { Card } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
import { TallyVote } from '@/components/tally-vote';
import { VotingVotersAdmin } from '@/components/voting-voters-admin';
import { getAllUsersFromDb } from '@/server-actions/users';
import { getAllVotesFromDb } from '@/server-actions/votes';
import { IUser, IVote } from '@/models/common.model';
import { AllUsersTable } from '@/components/all-users-table';
import { AllVotesTable } from '@/components/all-votes-table';
import { contractAddress, resolutionsVotingAbi } from '@/constants/common.constants';
import { useAccount } from 'wagmi';
import { readContract } from '@wagmi/core';

const DashboardPage = () => {

 const [users, setUsers] = useState<IUser[]>([]);
 const [votes, setVotes] = useState<IVote[]>([]);
 const [foundVoteId, setFoundVoteId] = useState<number>(0);
 const account = useAccount();


 const getVoteId = async () => {
  try {
   const voteId = await readContract({
    address: contractAddress as `0x${string}`,
    abi: resolutionsVotingAbi,
    functionName: 'voteId',
    account: account.address
   });
   setFoundVoteId(Number(voteId));
  } catch (err) {
   const error = err as Error;
   console.log(error.message)
  }
 };

 // Load all users
 const getAllUsers = async () => {
  const response = await getAllUsersFromDb();
  if (response.flag) {
   setUsers(response.data as IUser[]);
  } else {
   console.error("Error Users  : ", response.error);
  }
 }

 // Load all votes
 const getAllVotes = async () => {
  const response = await getAllVotesFromDb();

  if (response.flag) {
   setVotes(response.data as IVote[]);
  } else {
   console.error("Error Votes  : ", response.error);
  }
 }

 useEffect(() => {
  getVoteId();
  getAllUsers();
  getAllVotes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

 return (
  <div className='flex flex-row-reverse gap-10 max-w-[90vw]'>
   <Card className="space-y-6 w-full h-full bg-primary-foreground min-w-[25vw] p-10 rounded-lg shadow-lg">
    <div className='flex flex-col items-center gap-20 justify-center'>
     <VotingVotersAdmin currentVoteId={foundVoteId} />
     <TallyVote />
    </div>
   </Card>
   <Card className="space-y-6 w-full h-full bg-primary-foreground min-w-[60vw] p-10 rounded-lg shadow-lg">
    <div className='flex items-center justify-center'>
     <Card className="space-y-6 h-full bg-primary-foreground min-w-[55vw] p-4 rounded-lg shadow-lg">
      <AllUsersTable data={users} />
     </Card>
    </div>
    <div className='flex items-center justify-center'>
     <Card className="space-y-6 h-full bg-primary-foreground min-w-[55vw] p-4 rounded-lg shadow-lg">
      <AllVotesTable data={votes} />
     </Card>
    </div>
   </Card>
  </div>
 )
};

export default DashboardPage;