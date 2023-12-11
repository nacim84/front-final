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

const formSchema = z.object({
 voteId: z.coerce.number(),
});

interface GetVotedVoterVoterFormProps {
 currentVoteId: number;
}

export const GetVotedVoterVoterForm = ({ currentVoteId }: GetVotedVoterVoterFormProps) => {

 const [foundVoter, setFoundVoter] = useState<IVoterContract | null>(null);
 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
   voteId: currentVoteId || 1
  },
 });
 const pending = form.formState.isSubmitting;
 const { toast } = useToast();
 const account = useAccount();

 const getVotedVoterHandler = async (values: z.infer<typeof formSchema>) => {
  try {
   const voter = await readContract({
    address: contractAddress as `0x${string}`,
    abi: resolutionsVotingAbi,
    functionName: 'getVotedVoterForVoter',
    account: account.address,
    args: [BigInt(values.voteId)]
   });

   const foundVoter = voter as IVoterContract;
   setFoundVoter(foundVoter);
  } catch (err) {
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
   <Form {...form}>
    <form onSubmit={form.handleSubmit(getVotedVoterHandler)} className="space-y-4">
     <FormField
      control={form.control}
      name="voteId"
      render={({ field }) => (
       <FormItem>
        <FormControl>
         <Input placeholder="Vote id" type="number" min="1" step="1" className="rounded-lg" {...field} />
        </FormControl>
        <FormMessage />
       </FormItem>
      )}
     />
     <ButtonWithPending size="sm" disabled={pending} variant="default" className="w-full rounded-full transition duration-150" pending={pending}>Submit</ButtonWithPending>
    </form>
   </Form>
   {
    foundVoter
    &&
    <div className="text-base flex flex-col items-start justify-center">
     <span>Vote : <strong className="text-primary">{foundVoter.hasVoted ? "Vous avez voté." : "Vous n'avez pas voté."}</strong></span>
     <span>Choix de vote : <strong className="text-primary">{foundVoter.voteChoice ? decryptAES(foundVoter.voteChoice) : "Pas de vote."}</strong></span>
    </div>
   }
  </div>
 )
};
