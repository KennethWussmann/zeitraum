import { config } from 'dotenv';
config();
import { ApplicationContext } from '../src/applicationContext';
import {
  addDays,
  addHours,
  addMinutes,
  isAfter,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds,
  subDays,
} from 'date-fns';
import seedrandom from 'seedrandom';

const applicationContext = new ApplicationContext();
const prisma = applicationContext.prismaClient;
const rng = seedrandom('zeitraum');

const activities = [
  {
    tags: ['work', 'development', 'frontend'],
    notes: [
      'Working on the seed',
      'Implementing new feature',
      'Bug fixing',
      'Code review',
      'Writing unit tests',
      'Setting up CI/CD',
      'Optimizing performance',
      'Refactoring code',
      'Writing documentation',
      'Merging pull requests',
      'Designing a new component',
      'Working on accessibility',
      'Adding analytics',
      'Working with APIs',
      'Developing a new module',
      'Creating a new library',
      'Working on localization',
      'Improving security',
      'Updating dependencies',
      'Deploying to production',
    ],
  },
  {
    tags: ['work', 'development', 'backend'],
    notes: [
      'Building RESTful API',
      'Implementing authentication',
      'Designing database schema',
      'Integrating 3rd party services',
      'Improving caching',
      'Optimizing queries',
      'Adding microservices',
      'Creating background jobs',
      'Implementing real-time features',
      'Monitoring server performance',
      'Testing scalability',
      'Developing a new API endpoint',
      'Debugging server errors',
      'Securing sensitive data',
      'Updating server dependencies',
      'Deploying to a cloud provider',
      'Configuring server infrastructure',
      'Implementing serverless functions',
      'Building GraphQL API',
      'Writing API documentation',
    ],
  },
  {
    tags: ['work', 'design', 'ux'],
    notes: [
      'Designing new interface',
      'Creating wireframes',
      'Developing a design system',
      'Improving user experience',
      'Working on user flows',
      'Designing icons and illustrations',
      'Creating a style guide',
      'Designing for mobile devices',
      'Designing for different screen sizes',
      'Improving website accessibility',
      'Designing landing pages',
      'Creating marketing materials',
      'Collaborating with developers',
      'Conducting user testing',
      'Implementing user feedback',
      'Developing user personas',
      'Designing logos and branding',
      'Designing email templates',
      'Designing print materials',
      'Creating animations',
    ],
  },
  {
    tags: ['work', 'marketing', 'social-media'],
    notes: [
      'Scheduling social media posts',
      'Creating engaging content',
      'Monitoring social media activity',
      'Responding to comments and messages',
      'Developing social media campaigns',
      'Analyzing social media performance',
      'Collaborating with influencers',
      'Creating social media graphics',
      'Planning social media giveaways',
      'Managing paid advertising',
      'Conducting hashtag research',
      'Updating social media profiles',
      'Participating in online communities',
      'Writing blog articles',
      'Creating videos and podcasts',
      'Developing content strategies',
      'Improving online presence',
      'Managing multiple social platforms',
      'Promoting events and webinars',
      'Staying up-to-date with trends',
    ],
  },
  {
    tags: ['life', 'hobbies', 'reading'],
    notes: [
      'Reading a novel',
      'Reading a self-help book',
      'Reading a biography',
      'Reading a business book',
      'Reading a history book',
      'Reading a science fiction book',
      'Reading a fantasy book',
      'Reading a mystery book',
      'Reading a graphic novel',
      'Reading a poetry book',
    ],
  },
  {
    tags: ['life', 'hobbies', 'music'],
    notes: [
      'Playing the guitar 🎸',
      'Playing the piano 🎹',
      'Playing the drums 🥁',
      'Singing 🎤',
      'Listening to music 🎧',
      'Attending a concert 🎶',
      'Writing songs 🎼',
      'Learning a new instrument',
      'Recording music',
      'Joining a band',
      'Collaborating with other musicians',
      'Exploring new music genres',
      'Creating a playlist',
      'Watching music videos',
      'Reading about music history',
      'Attending a music festival',
      'Producing electronic music',
      'Taking music lessons',
      'Teaching music to others',
      'Discovering new artists',
    ],
  },
  {
    tags: ['life', 'hobbies', 'sports'],
    notes: [
      'Running in the park 🏃',
      'Yoga session 🧘',
      'Biking 🚴',
      'Swimming 🏊',
      'Lifting weights 🏋️',
      'Climbing 🧗',
      'Pilates class',
      'Dancing 💃',
      'Martial arts training',
      'Playing basketball 🏀',
      'Playing soccer ⚽',
      'Golfing 🏌️',
      'Tennis match 🎾',
      'Rowing 🚣',
      'Boxing 🥊',
      'Group fitness class',
      'Stretching',
      'Playing volleyball 🏐',
      'Hiking in nature 🥾',
      'Crossfit workout',
    ],
  },
];

const getRandomActivity = () => activities[Math.floor(rng() * activities.length)];

const getRandomDuration = () => 1 + Math.floor(rng() * 3 * 60);

const getRandomNote = (activity: any) => activity.notes[Math.floor(rng() * activity.notes.length)];

const seed = async () => {
  const rootUser = await applicationContext.userService.getRoot();

  if (!rootUser) {
    throw new Error('Root user not found');
  }

  const days = 14;
  const now = new Date();
  let currentTime = subDays(now, 27);

  for (let day = 0; day < days; day++) {
    let dailyMinutes = 0;
    // 24 hours in minutes
    while (dailyMinutes < 1440) {
      const activity = getRandomActivity();
      const duration = getRandomDuration();
      const start = currentTime;
      const end = addMinutes(currentTime, duration);

      await applicationContext.timeSpanService.create(rootUser.id, {
        start,
        end,
        tags: activity.tags,
        note: getRandomNote(activity),
      });

      currentTime = end;
      dailyMinutes += duration;
    }
    currentTime = setHours(setMinutes(setSeconds(setMilliseconds(addDays(currentTime, 1), 0), 0), 0), 0);
  }
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
