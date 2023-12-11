"use client"

import { CommonReportTable } from '@/components/common-report-table';
import { Button } from '@/components/ui/button';
import { ButtonWithPending } from '@/components/ui/button-with-pending';
import { VoteCompletedEvent, VoteCreatedActivatedEvent, VotedEvent, VoterRegisteredEvent, allEventItems, contractAddress } from '@/constants/common.constants';
import { TEventSignature } from '@/models/common.model';
import React, { useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { BlockTag, parseAbiItem } from 'viem';
import { usePublicClient } from 'wagmi';

const GlobalReportPage = () => {

  const client = usePublicClient();
  const [logsState, setLogsState] = useState<any[]>([]);
  const [pending, setPending] = useState<boolean>(false);

  const getAllEventsHandler = async () => {
    setPending(true);
    // VoteCreatedActivatedEvent;          // 0
    // VoterRegisteredEvent;               // 1
    // VotedEvent;                         // 2
    // VoteCompletedEvent;                 // 3
    let globalEvents = [];
    allEventItems.map(async (item) => {
      getEvents(item)
        .then((result) => {
          globalEvents.push(result);
        })
        .catch((err) => console.error(err));
    });
    setTimeout(() => {
      setLogsState(globalEvents);
      setPending(false);
    }, 5000)
  };

  const getEvents = async (abiItem: TEventSignature) => {
    const depositLogs = await client.getLogs({
      address: contractAddress as `0x${string}`,
      event: parseAbiItem(abiItem),
      fromBlock: BigInt(0),
      toBlock: 'latest' as BlockTag
    });

    const events = depositLogs.map(
      (log: any) => {
        switch (abiItem) {
          case VoteCreatedActivatedEvent:
            return {
              eventName: log.eventName,
              address: log.address,
              transactionHash: log.transactionHash,
              hashDescription: log.args.hashDescription,
              voteId: log.args.voteId,
              startDate: log.args.startDate,
              endDate: log.args.endDate,
              isEnabled: log.args.isEnabled
            };
          case VoterRegisteredEvent:
            return {
              eventName: log.eventName,
              address: log.address,
              transactionHash: log.transactionHash,
              voterAddress: log.args.voterAddress,
              isRegistered: log.args.isRegistered,
              role: log.args.role
            };
          case VotedEvent:
            return {
              eventName: log.eventName,
              address: log.address,
              transactionHash: log.transactionHash,
              voterAddress: log.args.voterAddress,
              voteChoice: log.args.voteChoice,
              voteId: log.args.voteId
            };
          case VoteCompletedEvent:
            return {
              eventName: log.eventName,
              address: log.address,
              transactionHash: log.transactionHash,
              hashDescription: log.args.hashDescription,
              voteId: log.args.voteId,
              startDate: log.args.startDate,
              endDate: log.args.endDate,
              isEnabled: log.args.isEnabled,
            };
          default:
            break;
        }
      });

    return events;
  };

  console.log(logsState);
  return (
    <div className='w-full'>
      <div className='w-full flex flex-row-reverse pr-40'>
        <ButtonWithPending pending={pending} onClick={getAllEventsHandler}>Refresh</ButtonWithPending>
      </div>
      <CommonReportTable logs={logsState} />
    </div>
  )
}

export default GlobalReportPage;