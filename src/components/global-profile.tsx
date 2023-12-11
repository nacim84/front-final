"use client"
import React, { useEffect, useState } from 'react';
import { IResponseBack, IVote } from '@/models/common.model';
import { getCurrentVoteByIdFromDb } from '@/server-actions/votes';
import { CommonProfile } from './common-profile';
import { CommonProfileTallyVote } from './common-profile-tally-vote';
import Loader from './loader';
import { useLocalStorage } from 'usehooks-ts';

export const GlobalProfile = () => {

  const [foundVoteId] = useLocalStorage<number>("CURRENT_VOTE_ID", 0);
  const [currentVote, setCurrentVote] = useState<IResponseBack>(null);

  const getCurrentVote = async () => {
    const currentVote = await getCurrentVoteByIdFromDb(foundVoteId);
    setCurrentVote(currentVote);
  }

  useEffect(() => {
    getCurrentVote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {
        currentVote
          ?
          <div className="flex flex-col md:flex-row-reverse items-start justify-center gap-10">
            {currentVote.data && currentVote.data.isEnabled
              ?
              <CommonProfile currentVote={currentVote.data as IVote} />
              :
              <CommonProfileTallyVote currentVote={currentVote.data as IVote} />
            }
          </div>
          :
          <Loader />
      }
    </>
  )
};