"use server"

import { IResponseBack, IUser } from "@/models/common.model";
import { TUserSchema } from "@/models/common.schema";
import { faker } from "@faker-js/faker";
import prisma from "@/lib/prisma";
import { keccak256 } from 'viem';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const addUserToDb = async (formData: TUserSchema): Promise<IResponseBack> => {
 const urlAvatar = faker.image.avatarGitHub();
 const dateBirth = new Date(1984, 1, 28).toISOString();
 try {
  const newUser = {
   addressHash: keccak256(formData.address as `0x${string}`),
   firstName: formData.firstName,
   lastName: formData.lastName,
   email: formData.email,
   dateBirth: dateBirth,
   role: formData.role,
   image: urlAvatar
  };
  const savedUser = await prisma.user.create({ data: newUser });
  console.log(`Created user with id: ${savedUser.id}`)

  return { flag: true, data: savedUser };
 } catch (err) {
  console.error("Not found user : error : ", (err as PrismaClientKnownRequestError).message);

  return { flag: false, error: (err as PrismaClientKnownRequestError).message };
 }
};

export const deleteUserFromDb = async (userId: number): Promise<IResponseBack> => {
 try {
  const deletedUser = await prisma.user.delete(
   {
    where: {
     id: userId,
    },
   });
  console.log(`Deleted user with id: ${deletedUser.id}`)
  return { flag: true, data: deletedUser };
 } catch (err) {
  console.error(`Deleted user with id ${userId} failed, error : `, (err as PrismaClientKnownRequestError).message);

  return { flag: false, error: (err as PrismaClientKnownRequestError).message };
 }
};


export const getAllUsersFromDb = async (): Promise<IResponseBack> => {
 try {
  const users = await prisma.user.findMany();
  const usersAdapter = users.map((user) => {
   return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    addressHash: user.addressHash,
    email: user.email,
    role: user.role
   }
  });
  console.log(`Get all users : ${usersAdapter}`)
  return { flag: true, data: usersAdapter };
 } catch (err) {
  console.error(`Get all users failed, error : `, (err as PrismaClientKnownRequestError).message);
  return { flag: false, error: (err as PrismaClientKnownRequestError).message };
 }
};