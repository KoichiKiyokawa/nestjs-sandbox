import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly pismaService: PrismaService) {}

  async findByEmail(email: string) {
    return this.pismaService.user.findUnique({ where: { email } });
  }
}
