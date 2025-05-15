import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AreasService } from '../areas/areas.service';
import { CreateLocationDto } from './dto/create-location.dto';
import * as turf from '@turf/turf';

@Injectable()
export class LocationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly areasService: AreasService,
  ) {}

  async create(createLocationDto: CreateLocationDto) {
    const { userId, latitude, longitude } = createLocationDto;

    // Konumu kaydediyoruz
    const location = await this.prisma.location.create({
      data: { userId, latitude, longitude },
    });

    // Tüm alanları alıyoruz
    const areas = await this.areasService.findAll();

    // Turf.js ile konumun alan içinde olup olmadığını kontrol ediyoruz
    const point = turf.point([longitude, latitude]);
    for (const area of areas) {
      // Type assertion: area.polygon'un bir GeoJSON Polygon olduğunu belirtiyoruz
      const polygon = turf.polygon((area.polygon as { coordinates: number[][][] }).coordinates);
      if (turf.booleanPointInPolygon(point, polygon)) {
        await this.prisma.log.create({
          data: {
            userId,
            areaId: area.id,
            entryTime: new Date(),
          },
        });
      }
    }

    return location;
  }
}