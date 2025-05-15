import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Diğer modüller tarafından kullanılacak
})
export class PrismaModule {}