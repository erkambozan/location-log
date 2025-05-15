import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';

describe('LocationsController (e2e)', () => {
  let app: INestApplication | undefined;
  let prisma: PrismaService;
  let userId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();

    // Veritabanını temizle (güvenli sırayla)
    await prisma.location.deleteMany({});
    await prisma.user.deleteMany({});

    // Test kullanıcısını oluşturmadan önce kontrol et ve gerekirse sil
    const existingUser = await prisma.user.findFirst({
      where: { name: 'Test Kullanıcısı' },
    });
    if (existingUser) {
      await prisma.user.delete({
        where: { id: existingUser.id },
      });
    }

    // Test kullanıcısı oluştur
    const user = await prisma.user.create({
      data: { name: 'Test Kullanıcısı' },
    });
    userId = user.id;
  }, 15000); // 15 saniye zaman aşımı

  it('/locations (POST)', async () => {
    if (!app) throw new Error('Application not initialized');
    return request(app.getHttpServer())
      .post('/locations')
      .send({
        userId, // Oluşturulan kullanıcının ID'sini kullan
        latitude: 0.5,
        longitude: 0.5,
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.latitude).toBe(0.5);
        expect(res.body.longitude).toBe(0.5);
      });
  }, 15000); // 15 saniye zaman aşımı

  afterAll(async () => {
    // Test verilerini temizle
    await prisma.location.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.$disconnect();
    if (app) await app.close();
  }, 15000); // 15 saniye zaman aşımı
});