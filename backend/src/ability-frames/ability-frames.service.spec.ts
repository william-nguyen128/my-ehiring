import { Test, TestingModule } from '@nestjs/testing';
import { AbilityFramesService } from './ability-frames.service';

describe('AbilityFramesService', () => {
  let service: AbilityFramesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AbilityFramesService],
    }).compile();

    service = module.get<AbilityFramesService>(AbilityFramesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
