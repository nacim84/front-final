import { authConfig } from "@/config/nextauth-config";
import { type ClassValue, clsx } from "clsx";
import { getServerSession } from "next-auth";
import { twMerge } from "tailwind-merge";
import CryptoJS from "crypto-js";


const NEXT_PUBLIC_AES_SECRET_KEY = process.env.NEXT_PUBLIC_AES_SECRET_KEY || "";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getNextAuthSession = async () => {
  const session = await getServerSession(authConfig);
  return session;
}

export const getRequireNextAuthSession = async () => {
  const session = await getNextAuthSession();
  return session;
};

export const convertToDate = (timestampSeconds: number): string => {
  return new Date(timestampSeconds * 1000).toLocaleString();
}

// AES Encryption
export const encryptAES = (choiceVote: string) => {
  console.log("choice to crypt : ", JSON.stringify(choiceVote));
  // Encrypt
  const dataToCrype = `${Math.floor(Math.random() * 10000000)},${choiceVote}`;
  const ciphertext = CryptoJS.AES.encrypt(dataToCrype, NEXT_PUBLIC_AES_SECRET_KEY).toString();
  return ciphertext;
}

export const decryptAES = (dataToDecCrypt: string): string => {
  // Decrypt
  const bytes = CryptoJS.AES.decrypt(dataToDecCrypt, NEXT_PUBLIC_AES_SECRET_KEY);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  const tokenChoiceVoteArray: Array<string> = originalText.split(",", 2);
  return tokenChoiceVoteArray[1];
}


