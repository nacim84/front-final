"use client"

import React, { useState } from 'react'
import SuccessIcon from "../../public/svg/success-icon.svg"
import FailureIcon from "../../public/svg/failure-icon.svg";
import { Card } from './ui/card';
import CommonDialogVote from './common-dialog-vote';
import { prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core';
import { NEXT_PUBLIC_SEPOLIA_ETHERSCAN_BASE_URL, VotedEvent, contractAddress, resolutionsVotingAbi } from '@/constants/common.constants';
import { BlockTag, parseAbiItem } from 'viem';
import { usePublicClient } from 'wagmi';
import { useToast } from './ui/use-toast';
import Image from "next/image";
import { CommonGetters } from './common-getters';
import { IVote } from '@/models/common.model';
import { decryptAES, encryptAES } from '@/lib/utils';
import { useLocalStorage } from 'usehooks-ts';


interface CommonProfileProps {
  currentVote: IVote;
}

export const CommonProfile = ({ currentVote }: CommonProfileProps) => {
  const client = usePublicClient();
  const { toast } = useToast();
  const [pending, setPending] = useState<boolean>(false);
  const [voteTransactionHash, setVoteTransactionHash] = useLocalStorage<string>('VOTE_TRANSACTION_HASH', "");
  const [foundVoteId] = useLocalStorage<number>("CURRENT_VOTE_ID", 0);

  const voteChoiceHandler = async (choice: string) => {
    try {
      setPending(true);
      const encryptChoice = encryptAES(choice); // token[blank]choice
      console.log("encryptChoice : ", encryptChoice);
      const { request } = await prepareWriteContract({
        address: contractAddress as `0x${string}`,
        abi: resolutionsVotingAbi,
        functionName: 'setVoteChoice',
        args: [encryptChoice]
      });
      const { hash } = await writeContract(request);

      await waitForTransaction({ hash: hash });
      const events = await getEvents();

      // Save the trasaction hash in localStorage
      console.log("transactionHash : " + events[0].transactionHash);
      setVoteTransactionHash(events[0].transactionHash);
      setPending(false);
      toast({
        description: `Voted successfully : ${events.map(
          e =>
            `VoterAddress : ${e.voterAddress},
              voteChoice : ${decryptAES(e.voteChoice)},
              VoteId : ${e.voteId}.`
        )}`,
        children: <Image src={SuccessIcon} className="w-6 h-6" alt="success" />,
      });
    } catch (err) {
      console.log((err as Error).message);
      setPending(false);
      toast({
        description: (err as Error).message,
        children: <Image src={FailureIcon} className="w-6 h-6" alt="failure" />,
      })
    };
  };

  const spanVoteItems = [
    { text: "Pour", className: "bg-green-400", action: voteChoiceHandler },
    { text: "Abstention", className: "bg-gray-400", action: voteChoiceHandler },
    { text: "Contre", className: "bg-red-400", action: voteChoiceHandler }
  ];

  const getEvents = async () => {
    const depositLogs = await client.getLogs({
      address: contractAddress as `0x${string}`,
      event: parseAbiItem(VotedEvent),
      fromBlock: "latest" as BlockTag,
      toBlock: 'latest' as BlockTag
    });
    const events = depositLogs.map(
      log => ({
        transactionHash: log.transactionHash,
        voterAddress: log.args.voterAddress,
        voteChoice: log.args.voteChoice,
        voteId: log.args.voteId
      })
    );
    return events;
  };

  return (
    <div className='flex flex-col gap-10 w-full'>
      <CommonGetters currentVoteId={foundVoteId} />
      <Card className="space-y-6 w-full h-full bg-primary-foreground min-w-[80vw] p-10 rounded-lg shadow-lg">
        <div className='flex flex-col items-center justify-center mx-auto gap-16'>
          <div className='flex flex-col gap-1 items-center justify-center'>
            <h1 className='text-2xl font-semibold'>Referendum municipale</h1>
            <p className='italic text-sm'>{`Date de début : ${currentVote.startDate}.`}</p>
            <p className='italic text-sm'>{`Date de fin : ${currentVote.endDate}.`}</p>

            {voteTransactionHash &&
              <div className='flex flex-col justify-center items-center mt-4'>
                <span>Voici le lien de la transaction du votre vote</span>
                <a href={NEXT_PUBLIC_SEPOLIA_ETHERSCAN_BASE_URL.concat(voteTransactionHash)} className="font-medium italic text-blue-600 dark:text-blue-500 hover:underline">{NEXT_PUBLIC_SEPOLIA_ETHERSCAN_BASE_URL}{voteTransactionHash}</a>
              </div>}
          </div>

          <div className='flex flex-col gap-20'>
            <p className='text-center text-lg italic font-normal'>
              {currentVote.description}
            </p>
            <div className='flex items-center justify-center gap-8 sm:gap-12 md:gap-28'>
              {
                spanVoteItems.map(
                  (item, idx) =>
                    <CommonDialogVote key={idx} text={item.text} pending={pending} className={item.className} action={item.action} />
                )
              }
            </div>
          </div>
        </div>
      </Card>
    </div>)
};
