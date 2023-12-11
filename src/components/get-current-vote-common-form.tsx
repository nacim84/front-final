"use client"

import { useToast } from "./ui/use-toast";
import Image from "next/image";
import FailureIcon from "../../public/svg/failure-icon.svg";
import { ButtonWithPending } from "./ui/button-with-pending"
import { readContract } from '@wagmi/core';
import { useState } from "react"
import { contractAddress, resolutionsVotingAbi } from "@/constants/common.constants"
import { IVoteContract } from "@/models/common.model"
import { convertToDate } from "@/lib/utils";
import { useAccount } from "wagmi";

export const GetCurrentVoteCommonForm = () => {

 const [foundVote, setFoundVote] = useState<IVoteContract | null>(null);
 const [pending, isPending] = useState<boolean>(false);
 const { toast } = useToast();
 const account = useAccount();

 const getCurrentVoteHandler = async () => {
  try {
   isPending(true);
   const vote = await readContract({
    address: contractAddress as `0x${string}`,
    abi: resolutionsVotingAbi,
    functionName: 'getCurrentVote',
    account: account.address
   });

   const foundVote = vote as IVoteContract;
   isPending(false);
   setFoundVote(foundVote);
  } catch (err) {
   isPending(false);
   const error = err as Error;
   console.log(error.message)
   toast({
    description: error.message,
    children: <Image src={FailureIcon} className="w-6 h-6" alt="failure" />,
   })
  }
 };

 return (
  <div className="bg-transparent h-full w-full m-auto flex flex-col gap-10">
   <ButtonWithPending
    onClick={getCurrentVoteHandler}
    size="sm"
    variant="default"
    disabled={pending}
    className="w-full rounded-full transition duration-150" pending={pending}>Consulter le vote en cours</ButtonWithPending>
   {
    foundVote
    &&
    <div className="text-base flex flex-col items-start justify-center">
     <p className="truncate max-w-[25vw]">Hash description : <strong className="text-primary max-w-[50px] truncate">{String(foundVote.hashDescription)}</strong></p>
     <span>Date de début : <strong className="text-primary">{convertToDate(Number(foundVote.startDate))}</strong></span>
     <span>Date de fin : <strong className="text-primary">{convertToDate(Number(foundVote.endDate))}</strong></span>
     <span>Activation : <strong className="text-primary">{foundVote.isEnabled ? "Scrutin en cours..." : "Scrutin clôturé."}</strong></span>
    </div>
   }
  </div>
 )
};
