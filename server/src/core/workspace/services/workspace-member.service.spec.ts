import { Test, TestingModule } from '@nestjs/testing';
import { WorkspaceMemberService } from './workspace-member.service';
import { PrismaService } from 'src/database/prisma.service';
import { prismaMock } from 'src/database/client-mock/jest-prisma-singleton';

describe('WorkspaceMemberService', () => {
  let service: WorkspaceMemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkspaceMemberService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<WorkspaceMemberService>(WorkspaceMemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
