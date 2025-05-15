import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAreaDto } from './dto/create-area.dto';

@Injectable()
export class AreasService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  private validateGeoJSONPolygon(polygon: any): boolean {
    return (
      polygon &&
      typeof polygon === 'object' &&
      polygon.type === 'Polygon' &&
      Array.isArray(polygon.coordinates) &&
      polygon.coordinates.every((ring: any) => Array.isArray(ring))
    );
  }

  async create(createAreaDto: CreateAreaDto) {
    if (!this.validateGeoJSONPolygon(createAreaDto.polygon)) {
      throw new Error('Unknown GeoJSON Polygon format');
    }
    const area = await this.prisma.area.create({
      data: createAreaDto,
    });
    // Önbelleğe kaydet
    await this.cacheManager.set(`area:${area.id}`, area, 3600 * 1000); // 1 saat (ms cinsinden)
    return area;
  }

  async findAll() {
    return this.prisma.area.findMany();
  }

  async findOne(id: number) {
    // Önbellekten kontrol et
    const cached: any = await this.cacheManager.get(`area:${id}`);
    if (cached) {
      return cached;
    }
    // Veritabanından al ve önbelleğe kaydet
    const area = await this.prisma.area.findUnique({ where: { id } });
    if (area) {
      await this.cacheManager.set(`area:${id}`, area, 3600 * 1000); // 1 saat (ms cinsinden)
    }
    return area;
  }
}