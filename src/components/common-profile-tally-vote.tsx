"use client"

import { Card } from './ui/card';
import { MoveRight, Plus } from 'lucide-react';
import { buttonVariants } from './ui/button';
import Link from 'next/link';
import { NEXT_PUBLIC_SEPOLIA_ETHERSCAN_BASE_URL, VotedEvent, adminVotePath, contractAddress, reportPath, resolutionsVotingAbi } from '@/constants/common.constants';
import { CommonGetters } from './common-getters';
import { useSession } from 'next-auth/react';
import { useAccount, usePublicClient } from 'wagmi';
import { BlockTag, parseAbiItem } from 'viem';
import { useEffect, useState } from 'react';
import { decryptAES } from '@/lib/utils';
import { readContract } from '@wagmi/core';
import { IVote } from '@/models/common.model';
import { useLocalStorage } from 'usehooks-ts';

interface CommonProfileTallyVoteProps {
  currentVote: IVote;
}

export const CommonProfileTallyVote = ({ currentVote }: CommonProfileTallyVoteProps) => {
  const [foundVoteId] = useLocalStorage<number>("CURRENT_VOTE_ID", 0);
  const { data: session } = useSession();
  const client = usePublicClient();
  const [tallyVotePour, setTallyVotePour] = useState<string[]>([]);
  const [tallyVoteContre, setTallyVoteContre] = useState<string[]>([]);
  const [tallyVoteAbstention, setTallyVoteAbstention] = useState<string[]>([]);
  // const [foundVoteId, setFoundVoteId] = useState<number>(0);
  const [voteTransactionHash] = useLocalStorage<string>('VOTE_TRANSACTION_HASH', "");

  const getResults = async () => {
    const events = await getEvents();
    const decryptChoice = decryptAES(events.map(item => item.voteChoice)[0]);
    console.log("decryptChoice : ", decryptChoice);
    events.map(item => {
      switch (decryptAES(item.voteChoice)) {
        case "POUR":
          setTallyVotePour([...tallyVotePour, item.voteChoice]);
          break;
        case "CONTRE":
          setTallyVoteContre([...tallyVoteContre, item.voteChoice]);
          break;
        case "ABSTENTION":
          setTallyVoteAbstention([...tallyVoteAbstention, item.voteChoice]);
          break;
        default:
          break;
      }
    });
  }

  const getEvents = async () => {
    const depositLogs = await client.getLogs({
      address: contractAddress as `0x${string}`,
      event: parseAbiItem(VotedEvent),
      fromBlock: BigInt(0),
      toBlock: 'latest' as BlockTag
    });
    const events = depositLogs.map(
      log => ({
        voteId: log.args.voteId,
        voterAddress: log.args.voterAddress,
        isRegistered: log.args.isRegistered,
        role: log.args.role,
        voteChoice: log.args.voteChoice
      })
    );
    return events;
  };

  useEffect(() => {
    getResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex flex-col gap-10 w-full'>
      <CommonGetters currentVoteId={foundVoteId} />
      <Card className="space-y-6 w-full h-full bg-primary-foreground min-w-[80vw] min-h-max p-10 rounded-lg shadow-lg">
        <div className='flex flex-col items-center justify-center mx-auto gap-16'>
          <div className='flex flex-col gap-20'>
            <p className='flex flex-col items-center justify-center text-lg italic font-normal'>
              <span>Aucun scrutin en cours.</span>
              {foundVoteId && currentVote && !currentVote.isEnabled
                ?
                <div className='flex flex-col items-center justify-center gap-4'>
                  <p>Veuillez-trouver ci-dessous les resultas du derrnier scrutin;</p>
                  {voteTransactionHash &&

                    <div className='flex flex-col justify-center items-center'>
                      <span>Voici le lien de la transaction du votre vote</span>
                      <a href={NEXT_PUBLIC_SEPOLIA_ETHERSCAN_BASE_URL.concat(voteTransactionHash)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{NEXT_PUBLIC_SEPOLIA_ETHERSCAN_BASE_URL}{voteTransactionHash}</a>
                    </div>}
                  <p className='text-center text-lg italic font-normal'>
                    {currentVote.description}
                  </p>
                </div>
                :
                !foundVoteId
                  ?
                  <p className='text-center text-lg italic font-normal'>
                    Les résultats du vote précédent ne sont pas encore disponibles.
                  </p>
                  :
                  null
              }
            </p>
            {
              foundVoteId && currentVote && !currentVote.isEnabled
                ?
                <div className='flex items-center justify-center gap-8 sm:gap-12 md:gap-28'>
                  <div className='p-1 flex flex-col items-center justify-center rounded-full w-36 h-36 shadow-lg bg-green-400'>
                    <span>Pour</span>
                    <strong className='text-2xl font-bold'>{tallyVotePour.length}</strong>
                  </div>
                  <div className='p-1 flex flex-col items-center justify-center rounded-full w-36 h-36 shadow-lg bg-gray-400'>
                    <span>Abstention</span>
                    <strong className='text-2xl font-bold'>{tallyVoteAbstention.length}</strong>
                  </div>
                  <div className='p-1 flex flex-col items-center justify-center rounded-full w-36 h-36 shadow-lg bg-red-400'>
                    <span>Contre</span>
                    <strong className='text-2xl font-bold'>{tallyVoteContre.length}</strong>
                  </div>
                </div>
                :
                null
            }
            <div className='flex gap-6 items-center justify-center'>
              {(session
                &&
                session.user
                &&
                session.user.role === "ADMIN")
                ?
                <div className='flex flex-col gap-2'>
                  <div className="mx-auto">
                    <Link href={adminVotePath} className={buttonVariants({ variant: "default", size: "default", className: "flex items-center justify-center gap-2 rounded-full font-semibold" })}>
                      <span>Créer un scrutin</span>
                      <Plus className='h-5 w-5' />
                    </Link>
                  </div>
                </div>
                :
                null
              }
              {

                foundVoteId && currentVote && !currentVote.isEnabled
                  ?
                  <div className='flex flex-col gap-2'>
                    <div className="mx-auto">
                      <Link href={reportPath} className={buttonVariants({ variant: "default", size: "default", className: "flex items-center justify-center gap-2 rounded-full font-semibold" })}>
                        <span>Consulter le rapport</span>
                        <MoveRight className='h-5 w-5' />
                      </Link>
                    </div>
                  </div>
                  :
                  null
              }
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
};