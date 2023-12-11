"use server"

import { IResponseBack } from "@/models/common.model";
import { TVoteSchema } from "@/models/common.schema";
import prisma from "@/lib/prisma";
import { getRequireNextAuthSession } from "@/lib/utils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";


export const addVoteToDb = async (formData: TVoteSchema): Promise<IResponseBack> => {
 try {
  const session = await getRequireNextAuthSession();

  const newVote = {
   voteTemporality: formData.voteTemporality.type,
   startDate: formData.voteTemporality.startDate,
   endDate: formData.voteTemporality.endDate,
   type: formData.type,
   title: formData.title,
   description: formData.description,
   alertSender: formData.alertSender,
   authorId: Number(session.user.id),
   isEnabled: true
  };

  console.log(newVote);
  const savedVote = await prisma.vote.create({ data: newVote });
  console.log(`Created vote with id: ${savedVote.id}`);

  return { flag: true, data: savedVote };
 } catch (err) {
  console.error("Create vote failed, error : ", (err as PrismaClientKnownRequestError).message);

  return { flag: false, error: `Create vote failed, error : ${(err as PrismaClientKnownRequestError).message}` };
 }
};

export const deleteVoteFromDb = async (voteId: number): Promise<IResponseBack> => {
 try {
  const deletedVote = await prisma.vote.delete(
   {
    where: {
     id: voteId,
    },
   });
  console.log(`Deleted vote with id: ${deletedVote.id}`)
  return { flag: true, data: deletedVote };
 } catch (err) {
  console.error(`Deleted vote with id ${voteId} failed, error : `, (err as PrismaClientKnownRequestError).message);

  return { flag: false, error: (err as PrismaClientKnownRequestError).message };
 }
}

export const getCurrentVoteFromDb = async (): Promise<IResponseBack> => {
 try {
  const enabledVote = await prisma.vote.findFirst(
   {
    where: {
     isEnabled: true
    }
   }
  );
  return { flag: true, data: enabledVote };
 } catch (err) {
  console.error("Get enabled vote failed, error : ", (err as PrismaClientKnownRequestError).message);
  return { flag: false, error: `Get enabled vote failed, error : ${(err as PrismaClientKnownRequestError).message}` };
 }
}

export const getCurrentVoteByIdFromDb = async (idVote: number): Promise<IResponseBack> => {
 try {
  const enabledVote = await prisma.vote.findUnique(
   {
    where: {
     id: idVote
    }
   }
  );
  return { flag: true, data: enabledVote };
 } catch (err) {
  console.error("Get vote failed, error : ", (err as PrismaClientKnownRequestError).message);
  return { flag: false, error: `Get vote failed, error : ${(err as PrismaClientKnownRequestError).message}` };
 }
}

export const updateVoteToDb = async (id: number): Promise<IResponseBack> => {
 try {
  const enabledVote = await prisma.vote.update(
   {
    where: {
     id: id,
     isEnabled: true,
    },
    data: {
     isEnabled: false,
    },
   }
  );
  console.log(`Updated successfully : ${enabledVote.title}`)
  return { flag: true, data: enabledVote };
 } catch (err) {
  console.error("Updated vote failed, error : ", (err as PrismaClientKnownRequestError).message);
  return { flag: false, error: `Updated failed, error : ${(err as PrismaClientKnownRequestError).message}` };
 }
}

export const getAllVotesFromDb = async (): Promise<IResponseBack> => {
 try {
  const votes = await prisma.vote.findMany();
  const votesAdapter = votes.map((vote) => {
   return {
    id: vote.id,
    startDate: vote.startDate,
    endDate: vote.endDate,
    title: vote.title,
    description: vote.description,
    isEnabled: vote.isEnabled

   }
  })
  console.log(`Get all votes : ${votesAdapter}`)
  return { flag: true, data: votesAdapter };
 } catch (err) {
  console.error(`Get all votes failed, error : `, (err as PrismaClientKnownRequestError).message);
  return { flag: false, error: (err as PrismaClientKnownRequestError).message };
 }
};