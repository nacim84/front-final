"use client"

import { CommonReportTable } from '@/components/common-report-table';
import { VoteCompletedEvent, VoteCreatedActivatedEvent, VotedEvent, VoterRegisteredEvent, allEventItems, contractAddress } from '@/constants/common.constants';
import { TEventSignature } from '@/models/common.model';
import React, { useEffect, useState } from 'react';
import { BlockTag, parseAbiItem } from 'viem';
import { useAccount, usePublicClient } from 'wagmi';

const GlobalReportPage = () => {

  const client = usePublicClient();
  const [logs, setLogs] = useState<any[][]>([]);

  const getAllEventsHandler = async () => {
    // VoteCreatedActivatedEvent;          // 0
    // VoterRegisteredEvent;               // 1
    // VotedEvent;                         // 2
    // VoteCompletedEvent;                 // 3
    let globalEvents: [][] = [];
    allEventItems.map(async (item) => {
      const event: any = await getEvents(item)
      globalEvents.push(event);
    });
    setLogs(globalEvents);
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

  useEffect(() => {
    getAllEventsHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='w-full'>
      <CommonReportTable logs={logs} />
    </div>
  )
}

export default GlobalReportPage;