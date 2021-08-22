import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly pismaService: PrismaService) {}

  async all() {
    return this.pismaService.user.findMany({
      select: { id: true, email: true },
    });
  }
}
