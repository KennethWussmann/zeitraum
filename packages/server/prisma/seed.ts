import { config } from 'dotenv';
config();
import { ApplicationContext } from '../src/applicationContext';

const applicationContext = new ApplicationContext();
const prisma = applicationContext.prismaClient;

const seed = async () => {
  const rootUser = await applicationContext.userService.getRoot();

  if (!rootUser) {
    throw new Error('Root user not found');
  }

  await applicationContext.timeSpanService.create(rootUser.id, {
    start: new Date('2023-01-01T01:00:00.000Z'),
    end: new Date('2023-01-01T02:00:00.000Z'),
    tags: ['work', 'development', 'zeitraum'],
    note: 'Working on the seed',
  });
  await applicationContext.timeSpanService.create(rootUser.id, {
    start: new Date('2023-01-01T02:00:00.000Z'),
    end: new Date('2023-01-01T03:00:00.000Z'),
    tags: ['personal', 'cooking'],
    note: 'Spaghetti 😋',
  });
  await applicationContext.timeSpanService.create(rootUser.id, {
    start: new Date('2023-01-01T03:00:00.000Z'),
    end: new Date('2023-01-01T04:00:00.000Z'),
    tags: ['work', 'zeitraum', 'project-management'],
    note: 'Planning next features',
  });
  await applicationContext.timeSpanService.create(rootUser.id, {
    start: new Date('2023-01-01T04:00:00.000Z'),
    tags: ['work', 'zeitraum', 'development'],
    note: 'Working ...',
  });
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
