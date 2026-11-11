
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL não configurada');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Iniciando seed do DevFlix...');

  // Categorias
  const frontend = await prisma.category.upsert({
    where: { slug: 'frontend' },
    update: { name: 'Desenvolvimento Frontend' },
    create: {
      name: 'Desenvolvimento Frontend',
      slug: 'frontend',
    },
  });

  const backend = await prisma.category.upsert({
    where: { slug: 'backend' },
    update: { name: 'Desenvolvimento Backend' },
    create: {
      name: 'Desenvolvimento Backend',
      slug: 'backend',
    },
  });

  const database = await prisma.category.upsert({
    where: { slug: 'banco-de-dados' },
    update: { name: 'Banco de Dados' },
    create: {
      name: 'Banco de Dados',
      slug: 'banco-de-dados',
    },
  });

  // Cursos
  const react = await prisma.course.upsert({
    where: { slug: 'react-iniciantes' },
    update: {
      title: 'React para Iniciantes',
      description: 'Fundamentos do React.',
      categoryId: frontend.id,
      published: true,
    },
    create: {
      title: 'React para Iniciantes',
      slug: 'react-iniciantes',
      description: 'Fundamentos do React.',
      categoryId: frontend.id,
      published: true,
    },
  });

  const node = await prisma.course.upsert({
    where: { slug: 'nodejs-iniciantes' },
    update: {
      title: 'Node.js para Iniciantes',
      description: 'Introdução ao Node.js.',
      categoryId: backend.id,
      published: true,
    },
    create: {
      title: 'Node.js para Iniciantes',
      slug: 'nodejs-iniciantes',
      description: 'Introdução ao Node.js.',
      categoryId: backend.id,
      published: true,
    },
  });

  const sql = await prisma.course.upsert({
    where: { slug: 'sql-fundamentos' },
    update: {
      title: 'Fundamentos de SQL',
      description: 'Introdução aos bancos relacionais.',
      categoryId: database.id,
      published: true,
    },
    create: {
      title: 'Fundamentos de SQL',
      slug: 'sql-fundamentos',
      description: 'Introdução aos bancos relacionais.',
      categoryId: database.id,
      published: true,
    },
  });

  // Aulas
  const lessons = [
    {
      courseId: react.id,
      title: 'Introdução ao React',
      description: 'Primeiros conceitos de React.',
      videoId: 'Tn6-PIqc4UM',
      position: 1,
    },
    {
      courseId: react.id,
      title: 'Componentes e JSX',
      description: 'Organizando interfaces em componentes.',
      videoId: 'w7ejDZ8SWv8',
      position: 2,
    },
    {
      courseId: node.id,
      title: 'Introdução ao Node.js',
      description: 'Conhecendo o ambiente Node.js.',
      videoId: 'TlB_eWDSMt4',
      position: 1,
    },
    {
      courseId: sql.id,
      title: 'Introdução aos Bancos de Dados',
      description: 'Conceitos básicos de SQL.',
      videoId: 'HXV3zeQKqGY',
      position: 1,
    },
  ];

  for (const lesson of lessons) {
    const { courseId, position, ...data } = lesson;

    await prisma.lesson.upsert({
      where: {
        courseId_position: {
          courseId,
          position,
        },
      },
      update: data,
      create: {
        ...data,
        courseId,
        position,
      },
    });
  }

  console.log('Seed finalizado com sucesso!');
}

main()
  .catch((error) => {
    console.error('Erro ao executar seed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
