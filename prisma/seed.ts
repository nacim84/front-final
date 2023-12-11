import { PrismaClient, Prisma } from '@prisma/client';
import { keccak256 } from 'viem';
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const dateBirth = new Date(1984, 1, 28).toISOString();
// const startDate = new Date(2023, 11, 28).toISOString();
// const endDate = new Date(2023, 11, 29).toISOString();
const urlAvatar = faker.image.avatarGitHub();
const NEXT_PUBLIC_OWNER_ADDRESS = process.env.NEXT_PUBLIC_OWNER_ADDRESS || "";
// const NEXT_PUBLIC_ADMIN_ADDRESS = process.env.NEXT_PUBLIC_ADMIN_ADDRESS || "";
// const NEXT_PUBLIC_USER_ADDRESS = process.env.NEXT_PUBLIC_USER_ADDRESS || "";

const userData = [
 {
  addressHash: keccak256(NEXT_PUBLIC_OWNER_ADDRESS as `0x${string}`),
  firstName: 'Nacim',
  lastName: 'RABIA',
  email: 'rabia.nacim@yahoo.com',
  dateBirth: dateBirth,
  role: 'ADMIN',
  image: urlAvatar
 },
] satisfies Prisma.UserCreateInput[]

async function main() {
 console.log(`Start seeding ...`)
 for (const u of userData) {
  const user = await prisma.user.create({
   data: u,
  })
  console.log(`Created user with id: ${user.id}`)
 }
 console.log(`Seeding finished.`)
}

main()
 .then(async () => {
  await prisma.$disconnect()
 })
 .catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
 })