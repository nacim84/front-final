"use client"

import React from 'react'
import SuccessIcon from "../../public/svg/success-icon.svg"
import FailureIcon from "../../public/svg/failure-icon.svg";
import Image from "next/image";
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Plus } from 'lucide-react';
import AuthoritiesMenu from './authorities-menu';
import { TUserSchema, userFormResolver } from '@/models/common.schema';
import { useToast } from './ui/use-toast';
import { ButtonWithPending } from './ui/button-with-pending';
import { addUserToDb } from '@/server-actions/users';
import { DateBirth } from './date-birth';
import { VoterRegisteredEvent, contractAddress, resolutionsVotingAbi } from '@/constants/common.constants';
import { usePublicClient } from 'wagmi';
import { prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core';
import { BlockTag, parseAbiItem } from 'viem';

export const UserForm = () => {
  const client = usePublicClient();
  const { toast } = useToast();
  const formUser = useForm<TUserSchema>({
    resolver: userFormResolver,
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      dateBirth: new Date(2005, 1, 1, 0, 0, 0),
      email: "",
      role: "USER"
    },
  });

  const createNewUserHandler = async (formData: TUserSchema) => {

    console.log(formData);
    try {
      // 1 - Create voter in BC
      const { request } = await prepareWriteContract({
        address: contractAddress as `0x${string}`,
        abi: resolutionsVotingAbi,
        functionName: 'addVoter',
        args: [
          formData.address,
          formData.role === "USER" ? 0 : 1
        ]
      });
      const { hash } = await writeContract(request);

      await waitForTransaction({ hash: hash });
      const events = await getEvents();

      // 2 - Create voter in DB
      await addUserToDb(formData);

      toast({
        description: `Voter add successfully : ${events.map(
          e =>
            `Address : ${e.voterAddress},
              IsRegistered : ${e.isRegistered},
              Role : ${e.role}.`
        )}`,
        children: <Image src={SuccessIcon} className="w-6 h-6" alt="success" />,
      });
      formUser.reset();
    } catch (err) {
      console.log((err as Error).message)
      toast({
        description: (err as Error).message,
        children: <Image src={FailureIcon} className="w-6 h-6" alt="failure" />,
      })
    };
  };

  const getEvents = async () => {
    const depositLogs = await client.getLogs({
      address: contractAddress as `0x${string}`,
      event: parseAbiItem(VoterRegisteredEvent),
      fromBlock: "latest" as BlockTag,
      toBlock: 'latest' as BlockTag
    });
    const events = depositLogs.map(
      log => ({
        voterAddress: log.args.voterAddress,
        isRegistered: log.args.isRegistered,
        role: log.args.role
      })
    );
    return events;
  };
  const pending = formUser.formState.isSubmitting;
  return (
    <Form {...formUser}>
      <form
        onSubmit={formUser.handleSubmit(
          createNewUserHandler
        )}
      >
        <Card className="space-y-6 w-full h-full bg-primary-foreground min-w-[40vw] min-h-[10vh] p-6 rounded-lg shadow-lg">
          <FormField
            control={formUser.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className='text-base h-12' placeholder="First name..." {...field} />
                </FormControl>
                <FormMessage className="text-sm italic" />
              </FormItem>
            )}
          />
          <FormField
            control={formUser.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="text-base h-12" placeholder="Last name..." {...field} />
                </FormControl>
                <FormMessage className="text-sm italic" />
              </FormItem>
            )}
          />
          <FormField
            control={formUser.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="text-base h-12" placeholder="0x..." {...field} />
                </FormControl>
                <FormMessage className="text-sm italic" />
              </FormItem>
            )}
          />
          <FormField
            control={formUser.control}
            name="dateBirth"
            render={() => (
              <FormItem className='w-full'>
                <DateBirth formUser={formUser} />
                <FormMessage className="text-sm italic" />
              </FormItem>
            )}
          />
          <FormField
            control={formUser.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="text-base h-12" placeholder="Email..." {...field} />
                </FormControl>
                <FormMessage className="text-sm italic" />
              </FormItem>
            )}
          />
          <FormField
            control={formUser.control}
            name="role"
            render={({ field }) => (
              <FormItem className='w-full'>
                <AuthoritiesMenu formUser={formUser} field={field} />
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