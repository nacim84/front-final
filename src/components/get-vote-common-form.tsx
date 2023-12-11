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
import { IVoteContract } from "@/models/common.model"
import { convertToDate } from "@/lib/utils"
import { useAccount } from "wagmi"

const formSchema = z.object({
 voteId: z.coerce.number(),
});

interface GetVoteCommonFormProps {
 currentVoteId: number;
}

export const GetVoteCommonForm = ({ currentVoteId }: GetVoteCommonFormProps) => {

 const [foundVote, setFoundVote] = useState<IVoteContract | null>(null);
 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
   voteId: currentVoteId || 1
  },
 });
 const pending = form.formState.isSubmitting;
 const { toast } = useToast();
 const account = useAccount();

 const getVoteByIdVoteHandler = async (values: z.infer<typeof formSchema>) => {
  try {
   const vote = await readContract({
    address: contractAddress as `0x${string}`,
    abi: resolutionsVotingAbi,
    functionName: 'getVote',
    account: account.address,
    args: [BigInt(values.voteId)]
   });

   const foundVote = vote as IVoteContract;
   setFoundVote(foundVote);
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
    <form onSubmit={form.handleSubmit(getVoteByIdVoteHandler)} className="space-y-4">
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
    foundVote
    &&
    <div className="text-base flex flex-col items-start justify-center">
     <p className="truncate max-w-[25vw]">Hash description : <strong className="text-primary">{String(foundVote.hashDescription)}</strong></p>
     <span>Date de début : <strong className="text-primary">{convertToDate(Number(foundVote.startDate))}</strong></span>
     <span>Date de fin : <strong className="text-primary">{convertToDate(Number(foundVote.endDate))}</strong></span>
     <span>Activation : <strong className="text-primary">{foundVote.isEnabled ? "Scrutin en cours..." : "Scrutin clôturé."}</strong></span>
    </div>
   }
  </div>
 )
};
