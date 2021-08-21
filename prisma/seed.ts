import { PrismaClient } from '@prisma/client';

export async function seed() {
  const prisma = new PrismaClient();
  await prisma.user.create({
    data: { email: 'hoge@example.com', password: 'hogehoge' },
  });
  await prisma.$disconnect();
}
