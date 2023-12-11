import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT, JWT } from "next-auth/jwt";
import { Interface } from "readline";


/** Custom User and Jwt token types, for synchronize it with the Backend */
declare module "next-auth" {
 interface Session {
  user: {
   id: string;
   firstName: string,
   lastName: string,
   email: string;
   role: EnumRole;
   image: string;
  },
  token: JWT;
 }

 interface User {
  id: string;
  firstName: string,
  lastName: string,
  email: string;
  role: EnumRole;
  image: string;
 }
}

declare module "next-auth/jwt" {
 interface JWT {
  user: {
   id: string;
   firstName: string,
   lastName: string,
   email: string;
   role: EnumRole;
   image: string;
  }
 }
}