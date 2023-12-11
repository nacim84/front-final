"use server"

import EmailTemplate from '@/components/email-template';
import { NEXT_PUBLIC_RESEND_API_KEY } from '@/constants/common.constants';
import { TContactSchema } from '@/models/common.schema';
import { Resend } from 'resend';

const resend = new Resend(NEXT_PUBLIC_RESEND_API_KEY);

export const sendEmail = (formData: TContactSchema) => {
 console.log("formData : ", formData);
 resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'rabia.nacim@yahoo.com',
  subject: 'Hello World',
  react: EmailTemplate({ firstName: 'John' })
 });

 return { flag: true };
};