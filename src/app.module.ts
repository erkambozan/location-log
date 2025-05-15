import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { AreasModule } from './areas/areas.module';
import { LocationsModule } from './locations/locations.module';
import { LogsModule } from './logs/logs.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({
      isGlobal: true, // CacheModule'ü global yap
      ttl: 3600, // Önbellek süresi (saniye cinsinden, 1 saat)
      max: 100, // Maksimum önbellek öğesi sayısı
    }),
    AreasModule,
    LocationsModule,
    LogsModule,
    PrismaModule,
  ],
})
export class AppModule {}