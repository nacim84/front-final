import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from "next-auth";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";
import { getUserFromDb } from '@/server-actions/auth';
import { IUser } from '@/models/common.model';

export const authConfig = {
 providers: [
  CredentialsProvider({
   id: "EthWeb3",
   name: "EthWeb3",
   credentials: {
    message: {
     label: "Message",
     type: "text",
     placeholder: "0x0",
    },
    signedMessage: {
     label: "SignedMessage",
     type: "text",
     placeholder: "0x0",
    },
   },

   async authorize(credentials, req) {
    if (!credentials?.signedMessage || !credentials?.message) {
     console.error("Your credentials are not valid.");
     throw new Error("Your credentials are not valid.");
    };
    try {
     const siwe = new SiweMessage(JSON.parse(credentials?.message || "{}"))
     const nextAuthUrl = new URL(process.env.NEXTAUTH_URL)

     const result = await siwe.verify({
      signature: credentials?.signedMessage || "",
      domain: nextAuthUrl.host,
      nonce: await getCsrfToken({ req }),
     });

     if (result.success) {
      const { flag, data, error } = await getUserFromDb(siwe.address);
      if (flag) {
       const foundUser = data as IUser;
       return {
        id: String(foundUser.id),
        address: result.data.address,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
        role: foundUser.role,
        image: foundUser.image
       };
      };
      console.error(error);
      throw new Error(error);
     };
     throw new Error("Authentication error : please to verify your signature/address.");
    } catch (e) {
     console.error(e);
     throw new Error("Authentication error : address not found, please to contact your administrator.")
    }
   },
  })
 ],

 session: {
  strategy: 'jwt'
 },

 secret: process.env.NEXTAUTH_SECRET,

 pages: {
  signIn: "/auth/signin"
 },

 callbacks: {
  async jwt({ token, user }) {
   if (user) {
    const customToken = { ...token, user };
    return customToken;
   }
   return token;
  },

  async session({ session, token }) {
   const { user, ...restToken } = token;
   const customSession = { ...session, user, token };
   return customSession;
  },
 }
} satisfies NextAuthOptions;