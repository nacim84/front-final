"use client"

import React from 'react'
import SuccessIcon from "../../public/svg/success-icon.svg"
import FailureIcon from "../../public/svg/failure-icon.svg";
import Image from "next/image";
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { SendHorizontal } from 'lucide-react';
import { useToast } from './ui/use-toast';
import { ButtonWithPending } from './ui/button-with-pending';
import { Textarea } from './ui/textarea';
import { TContactSchema, contactFormResolver } from '@/models/common.schema';
import { sendEmail } from '@/server-actions/email';

export const CommonContactForm = () => {
  const { toast } = useToast();
  const formContact = useForm<TContactSchema>({
    resolver: contactFormResolver,
    defaultValues: {
      receiverEmail: "",
      subject: "",
      comment: "",
    },
  });
  const pending = formContact.formState.isSubmitting;

  const sendEmailHandler = async (formData: TContactSchema) => {
    const { flag } = sendEmail(formData);
    if (flag) {
      toast({
        description: "Email sent successfully.",
        children: <Image src={SuccessIcon} className="w-6 h-6" alt="success" />,
      });
      formContact.reset();
    } else {
      toast({
        description: "Send email failed.",
        children: <Image src={FailureIcon} className="w-6 h-6" alt="failure" />,

      });
    };
  };

  return (
    <Form {...formContact}>
      <form
        onSubmit={formContact.handleSubmit(
          sendEmailHandler
        )}
      >
        <Card className="space-y-6 w-full h-full bg-primary-foreground min-w-[40vw] min-h-[10vw] p-6 rounded-lg shadow-lg">
          <FormField
            control={formContact.control}
            name="receiverEmail"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className='text-base h-12' placeholder="User email..." {...field} />
                </FormControl>
                <FormMessage className="text-sm italic" />
              </FormItem>
            )}
          />
          <FormField
            control={formContact.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className='text-base h-12' placeholder="Objet..." {...field} />
                </FormControl>
                <FormMessage className="text-sm italic" />
              </FormItem>
            )}
          />
          <FormField
            control={formContact.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Comment..."
                    className="resize-y"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm italic" />
              </FormItem>
            )}
          />
          <div className="w-full pt-6">
            <ButtonWithPending pending={pending} size='lg' className='w-full rounded-full text-base font-semibold'>
              <span>Send</span>
              <SendHorizontal className="w-5 h-5 ml-4" />
            </ButtonWithPending>
          </div>
        </Card>
      </form>
    </Form>
  );
};