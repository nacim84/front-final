"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "./ui/use-toast";

import Image from "next/image";
import FailureIcon from "../../public/svg/failure-icon.svg";
import { ButtonWithPending } from "./ui/button-with-pending"
import { readContract } from '@wagmi/core';
import { useState } from "react"
import { contractAddress, resolutionsVotingAbi } from "@/constants/common.constants"
import { IVoterContract } from "@/models/common.model"
import { useAccount } from "wagmi"
import { decryptAES } from "@/lib/utils"

export const GetVoterVoterForm = () => {

 const [foundVoter, setFoundVoter] = useState<IVoterContract | null>(null);
 const [pending, isPending] = useState<boolean>(false);
 const account = useAccount();
 const { toast } = useToast();

 const getRegisteredVoterForVoterHandler = async () => {
  try {
   isPending(true);
   const voter = await readContract({
    address: contractAddress as `0x${string}`,
    abi: resolutionsVotingAbi,
    functionName: 'getRegisteredVoterForVoter',
    account: account.address,
   });

   const foundVoter = voter as IVoterContract;
   isPending(false);
   setFoundVoter(foundVoter);
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
    size="sm"
    variant="default"
    disabled={pending}
    className="w-full rounded-full transition duration-150"
    pending={pending}
    onClick={getRegisteredVoterForVoterHandler}
   >Vérifier votre enregistrement</ButtonWithPending>
   {
    foundVoter
    &&
    <div className="text-base flex flex-col items-start justify-center">
     <span>Enregistrement : <strong className="text-primary">{foundVoter.isRegistered ? "Vous êtes enregistré." : "Vous n'êtes pas enregistré."}</strong></span>
     {/* <span>Vote : <strong className="text-primary">{foundVoter.hasVoted ? "Vous avez voté." : "Vous n'avez pas voté."}</strong></span> */}
     <span>Role : <strong className="text-primary">{foundVoter.role ? "Administrateur et électeur" : "Electeur"}</strong></span>
     {/* <span>Choix de vote : <strong className="text-primary">{foundVoter.voteChoice ? decryptAES(foundVoter.voteChoice) : "Pas de vote."}</strong></span> */}
    </div>
   }
  </div>
 )
};
