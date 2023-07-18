import { Test, TestingModule } from '@nestjs/testing';
import { WorkspaceService } from './workspace.service';
import { PrismaService } from 'src/database/prisma.service';
import { prismaMock } from 'src/database/client-mock/jest-prisma-singleton';
import { PipelineService } from 'src/core/pipeline/services/pipeline.service';
import { PipelineStageService } from 'src/core/pipeline/services/pipeline-stage.service';

describe('WorkspaceService', () => {
  let service: WorkspaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkspaceService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        {
          provide: PipelineService,
          useValue: {},
        },
        {
          provide: PipelineStageService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<WorkspaceService>(WorkspaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
