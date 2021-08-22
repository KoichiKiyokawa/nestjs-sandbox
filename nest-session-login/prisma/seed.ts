import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcryptjs';

export async function seed() {
  const prisma = new PrismaClient();
  await prisma.user.create({
    data: { email: 'hoge@example.com', password: hashSync('hogehoge') },
  });
  await prisma.$disconnect();
}
