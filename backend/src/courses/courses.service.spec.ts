
import {
  describe,
  it,
  expect,
  beforeEach,
  vi,
} from 'vitest';

import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { CoursesService } from './courses.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('CoursesService', () => {
  let service: CoursesService;

  const prismaMock = {
    course: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          CoursesService,
          {
            provide: PrismaService,
            useValue: prismaMock,
          },
        ],
      }).compile();

    service = module.get<CoursesService>(
      CoursesService,
    );
  });

  it('deve listar os cursos', async () => {
    const courses = [
      {
        id: 1,
        title: 'React para Iniciantes',
        category: {
          id: 1,
          name: 'Desenvolvimento Frontend',
        },
        lessons: [],
      },
    ];

    prismaMock.course.findMany.mockResolvedValue(
      courses,
    );

    const result = await service.findAll();

    expect(result).toEqual(courses);
    expect(prismaMock.course.findMany)
      .toHaveBeenCalledOnce();
  });

  it('deve encontrar um curso pelo ID', async () => {
    const course = {
      id: 1,
      title: 'React para Iniciantes',
      category: { id: 1 },
      lessons: [],
    };

    prismaMock.course.findUnique.mockResolvedValue(
      course,
    );

    const result = await service.findOne(1);

    expect(result).toEqual(course);
    expect(prismaMock.course.findUnique)
      .toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 1 },
        }),
      );
  });

  it('deve retornar 404 para curso inexistente', async () => {
    prismaMock.course.findUnique.mockResolvedValue(
      null,
    );

    await expect(
      service.findOne(999),
    ).rejects.toThrow(NotFoundException);
  });
});
