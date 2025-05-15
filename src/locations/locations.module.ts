import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AreasModule } from '../areas/areas.module';

@Module({
  imports: [PrismaModule, AreasModule],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}