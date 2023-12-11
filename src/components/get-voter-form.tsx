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
 voterAddress: z.string().min(42, {
  message: "Voter address description must be at least 42 characters.",
 }),
})

export const GetVoterForm = () => {

 const [foundVoter, setFoundVoter] = useState<IVoterContract | null>(null);
 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
   voterAddress: "",
  },
 });
 const pending = form.formState.isSubmitting;
 const { toast } = useToast();
 const account = useAccount();

 const getRegisteredVoterHandler = async (values: z.infer<typeof formSchema>) => {
  try {
   const voter = await readContract({
    address: contractAddress as `0x${string}`,
    abi: resolutionsVotingAbi,
    functionName: 'getRegisteredVoter',
    account: account.address,
    args: [values.voterAddress as `0x${string}`]
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
    <form onSubmit={form.handleSubmit(getRegisteredVoterHandler)} className="space-y-4">
     <FormField
      control={form.control}
      name="voterAddress"
      render={({ field }) => (
       <FormItem>
        <FormControl>
         <Input placeholder="Voter address" className="rounded-lg" {...field} />
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
     <span>Enregistrement : <strong className="text-primary">{foundVoter.isRegistered ? "Vous êtes enregistré." : "Vous n'êtes pas enregistré."}</strong></span>
     {/* <span>Vote : <strong className="text-primary">{foundVoter.hasVoted ? "Vous avez voté." : "Vous n'avez pas voté."}</strong></span> */}
     <span>Role : <strong className="text-primary">{foundVoter.role ? "Administrateur et électeur" : "Electeur"}</strong></span>
     {/* <span>Choix de vote : <strong className="text-primary">{foundVoter.voteChoice ? decryptAES(foundVoter.voteChoice) : "Pas de vote."}</strong></span> */}
    </div>
   }
  </div>
 )
};
