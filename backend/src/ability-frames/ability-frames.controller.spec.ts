import { Test, TestingModule } from '@nestjs/testing';
import { AbilityFramesController } from './ability-frames.controller';

describe('AbilityFramesController', () => {
  let controller: AbilityFramesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AbilityFramesController],
    }).compile();

    controller = module.get<AbilityFramesController>(AbilityFramesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
