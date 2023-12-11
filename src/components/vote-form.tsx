"use client"

import React from 'react'
import SuccessIcon from "../../public/svg/success-icon.svg"
import FailureIcon from "../../public/svg/failure-icon.svg";
import Image from "next/image";
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { useToast } from './ui/use-toast';
import { ButtonWithPending } from './ui/button-with-pending';
import { TVoteSchema, voteFormResolver } from '@/models/common.schema';
import { Textarea } from './ui/textarea';
import { VoteTemporality } from './vote-temporality-tabs';
import { VoteTypesMenu } from './vote-types-menu';
import { usePublicClient } from 'wagmi';
import { prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core';
import { VoteCreatedActivatedEvent, contractAddress, profilePath, resolutionsVotingAbi } from '@/constants/common.constants';
import { BlockTag, keccak256, parseAbiItem, toHex } from 'viem';
import { addVoteToDb } from '@/server-actions/votes';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from 'usehooks-ts';

export const VoteForm = () => {
  const client = usePublicClient();
  const { toast } = useToast();
  const router = useRouter();
  const [f, setFoundVoteId] = useLocalStorage<number>("CURRENT_VOTE_ID", 0);
  const [t, setVoteTransactionHash] = useLocalStorage<string>('VOTE_TRANSACTION_HASH', "");

  const formVote = useForm<TVoteSchema>({
    resolver: voteFormResolver,
    defaultValues: {
      type: "RESOLUTIONS",
      voteTemporality: { type: "LIVE", startDate: new Date(), endDate: new Date() },
      title: "",
      description: "",
      alertSender: ""
    },
  });

  const createNewVoteHandler = async (formData: TVoteSchema) => {
    try {
      const startDateSec = Math.round(formData.voteTemporality.startDate.getTime() / 1000);
      const endDateSec = Math.round(formData.voteTemporality.endDate.getTime() / 1000);

      // 1 - Create vote in BC
      const { request } = await prepareWriteContract({
        address: contractAddress as `0x${string}`,
        abi: resolutionsVotingAbi,
        functionName: 'addVote',
        args: [
          keccak256(toHex(formData.description)),
          startDateSec,
          endDateSec
        ]
      });
      const { hash } = await writeContract(request);

      await waitForTransaction({ hash: hash });
      const events = await getEvents();

      // 2 - Create vote in DB
      await addVoteToDb(formData);
      setFoundVoteId(Number(events.map(e => e.voteId)));
      setVoteTransactionHash("");
      toast({
        description: `Vote add successfully : ${events.map(
          e => `VoteId : ${Number(e.voteId)}, StartDate : ${Number(e.startDate)}, EndDate : ${Number(e.endDate)}.`)}`,
        children: <Image src={SuccessIcon} className="w-6 h-6" alt="success" />,
      });
      formVote.reset();
      router.push(profilePath);

    } catch (err) {
      const error = err as Error;
      console.log(error.message)
      toast({
        description: error.message,
        children: <Image src={FailureIcon} className="w-6 h-6" alt="failure" />,
      })
    };
  };

  const getEvents = async () => {
    const depositLogs = await client.getLogs({
      address: contractAddress as `0x${string}`,
      event: parseAbiItem(VoteCreatedActivatedEvent),
      fromBlock: "latest" as BlockTag,
      toBlock: 'latest' as BlockTag
    });
    const events = depositLogs.map(
      log => ({
        transactionHash: log.transactionHash,
        hashDescription: log.args.hashDescription,
        voteId: log.args.voteId,
        startDate: log.args.startDate,
        endDate: log.args.endDate
      })
    );
    return events;
  };

  const pending = formVote.formState.isSubmitting;
  return (
    <Form {...formVote}>
      <form
        onSubmit={formVote.handleSubmit(
          createNewVoteHandler
        )}
      >
        <Card className="space-y-6 h-full bg-primary-foreground w-[40vw] min-h-[10vh] p-6 rounded-lg shadow-lg">
          <FormField
            control={formVote.control}
            name="voteTemporality"
            render={() => (
              <FormItem className='w-full'>
                <VoteTemporality formVote={formVote} />
                <FormMessage className="text-sm italic" />
              </FormItem>
            )}
          />
          <FormField
            control={formVote.control}
            name="type"
            render={() => (
              <FormItem className='w-full'>
                <VoteTypesMenu formVote={formVote} />
                <FormDescription className='text-sm italic text-gray-800 dark:text-gray-400'>
                  <span>En choisissant &quot;Résolutions&quot;, les réponses seront;</span>
                  <ul className='list-decimal pl-4 mt-2'>
                    <li>Pour</li>
                    <li>Abstention</li>
                    <li>Contre</li>
                  </ul>
                </FormDescription>
                <FormMessage className="text-sm italic" />
              </FormItem>
            )}
          />
          <FormField
            control={formVote.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className='text-base h-12' placeholder="Titre de votre scrutin..." {...field} />
                </FormControl>
                <FormMessage className="text-sm italic" />
              </FormItem>
            )}
          />
          <FormField
            control={formVote.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Description..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm italic" />
              </FormItem>
            )}
          />
          <FormField
            control={formVote.control}
            name="alertSender"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="text-base h-12" placeholder="Expéditeur affiché dans vos invitations ..." {...field} />
                </FormControl>
                <FormMessage className="text-sm italic" />
              </FormItem>
            )}
          />
          <div className="w-full pt-6">
            <ButtonWithPending pending={pending} size='lg' className='w-full rounded-full text-base font-semibold'>
              <span>Add</span>
              <Plus className="w-5 h-5 ml-4" />
            </ButtonWithPending>
          </div>
        </Card>
      </form>
    </Form>
  );
};