import { Test, TestingModule } from '@nestjs/testing';
import { PipelineService } from './pipeline.service';
import { PrismaService } from 'src/database/prisma.service';
import { prismaMock } from 'src/database/client-mock/jest-prisma-singleton';

describe('PipelineService', () => {
  let service: PipelineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PipelineService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<PipelineService>(PipelineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
