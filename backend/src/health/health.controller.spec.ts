
import { describe, it, expect, vi } from 'vitest';
import { Test } from '@nestjs/testing';

import { HealthController } from './health.controller.js';
import { HealthService } from './health.service.js';

describe('HealthController', () => {
  it('deve retornar o status da API', async () => {
    const response = {
      status: 'ok',
      application: 'DevFlix API',
      database: 'connected',
      timestamp: '2026-11-03T18:00:00.000Z',
    };

    const module = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthService,
          useValue: {
            check: vi.fn().mockResolvedValue(response),
          },
        },
      ],
    }).compile();

    const controller = module.get(HealthController);

    await expect(controller.check()).resolves.toEqual(response);
  });
});
