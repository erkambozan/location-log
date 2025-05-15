import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';

describe('AreasController (e2e)', () => {
  let app: INestApplication | undefined;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();

    // Veritabanını temizle
    await prisma.area.deleteMany({});
  }, 15000); // 15 saniye zaman aşımı

  it('/areas (POST)', async () => {
    if (!app) throw new Error('Application not initialized');
    return request(app.getHttpServer())
      .post('/areas')
      .send({
        name: 'Test Alanı',
        polygon: {
          type: 'Polygon',
          coordinates: [[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]],
        },
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('Test Alanı');
      });
  }, 15000); // 15 saniye zaman aşımı

  it('/areas (GET)', async () => {
    if (!app) throw new Error('Application not initialized');
    return request(app.getHttpServer())
      .get('/areas')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  }, 15000); // 15 saniye zaman aşımı

  afterAll(async () => {
    // Test verilerini temizle
    await prisma.area.deleteMany({});
    await prisma.$disconnect();
    if (app) await app.close();
  }, 15000); // 15 saniye zaman aşımı
});