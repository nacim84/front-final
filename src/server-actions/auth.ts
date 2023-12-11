"use server"

import { IResponseBack } from "@/models/common.model";
import prisma from "@/lib/prisma";
import { keccak256 } from 'viem';

export const getUserFromDb = async (address: string): Promise<IResponseBack> => {
  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        addressHash: keccak256(address as `0x${string}`)
      },
    });
    console.log(`Auth user : `, foundUser)
    return { flag: true, data: foundUser };

  } catch (err) {
    console.error("Not found user : error : ", err);
    return { flag: false, error: err };
  }

}