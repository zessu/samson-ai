import { join } from 'path';
import { type ServerWebSocket } from 'bun';
import { Hono } from 'hono';
import { createBunWebSocket, serveStatic } from 'hono/bun';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { cors } from 'hono/cors';
import { eq, asc } from 'drizzle-orm';
import { nanoid } from 'nanoid';

import { mastra } from 'samson-agent';

import { onBoardingSchema } from 'shared';
import { auth } from '@/auth';
import { user as User } from '@/auth-schema';
import { db } from '@db/index';
import { workoutSettings, workoutSettingsInsertSchema } from '@db/schema/index';
import { initQueues } from '@/lib/index';
import type { routineType } from '@/lib/index';

const searchSchema = z.object({
  query: z.string(),
});

type webSocketData = { userid: string };
export const clients = new Map<string, ServerWebSocket<webSocketData>>();

const { upgradeWebSocket, websocket } =
  createBunWebSocket<ServerWebSocket<webSocketData>>();

const app = new Hono();

const { routineQueue: createRoutineQueue } = initQueues();

app.use(
  '*',
  cors({ origin: import.meta.env.LOCALDOMAIN as string, credentials: true })
);

app.post(
  '/api/createProfile',
  zValidator('json', onBoardingSchema),
  async (c) => {
    const validated = c.req.valid('json');
    const user = await auth.api.getSession({
      headers: c.req.raw.headers,
    });
    if (!user)
      return c.text('You are not authorised to perform that action', 401);

    const userid = user.user.id;
    const userResult = await db
      .update(User)
      .set({
        gender: validated.gender,
        age: validated.age,
        weight: validated.weight,
        fitnessLevel: validated.fitnessLevel,
        goals: validated.goals.join(','),
        equipment: validated.equipment.join(','),
        notifications: 'sms',
      })
      .where(eq(User.id, userid))
      .returning({ userid: User.id });

    if (!userResult || userResult.length === 0) {
      return c.json(
        { error: 'We could not make the user request, please try again later' },
        404
      );
    }

    const userWorkoutSettings = {
      id: nanoid(),
      weekdays: validated.weekdays,
      workoutTime: validated.time,
      workoutDuration: validated.duration,
      userId: userResult[0].userid,
      userTimezoneOffset: validated.offset,
    };

    workoutSettingsInsertSchema.parse(userWorkoutSettings);

    const workoutResult = await db
      .insert(workoutSettings)
      .values(userWorkoutSettings)
      .returning({ id: workoutSettings.id });

    if (!workoutResult || workoutResult.length === 0) {
      return c.json(
        {
          error:
            'We could not create a workout schedule for you. Please try again in a bit',
        },
        404
      );
    }

    const jobId = nanoid();

    await createRoutineQueue.add(`create-routine:${jobId}`, {
      ...validated,
      id: userid,
    });

    return c.json('generated your workout routine');
  }
);

app.post('/ai-chat', zValidator('json', searchSchema), async (c) => {
  const validated = c.req.valid('json');
  const samson = mastra.getAgent('Samson');

  const response = await samson.generate([
    {
      role: 'user',
      content: validated.query,
    },
  ]);

  console.log(response.object);
  console.log(response.toolResults);
});

app.on(['POST', 'GET'], '/api/auth/**', (c) => auth.handler(c.req.raw));

app.post('/generate', async (c) => {
  const user = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!user) return c.text('Please log in to continue', 401);

  const userId = user.user.id;

  const us = await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.id, userId),
  });

  if (!us) {
    return c.json(
      {
        error: 'Could not find user to generate workout for',
      },
      500
    );
  }

  const ws = await db.query.workoutSettings.findFirst({
    where: eq(workoutSettings.userId, userId),
  });

  if (!ws) {
    return c.json(
      {
        error:
          'Could not load user profile settings before generating a new workout',
      },
      500
    );
  }

  const { gender, age, weight, fitnessLevel, goals, equipment } = us;
  const { weekdays, workoutTime, workoutDuration, userTimezoneOffset } = ws;

  if (
    !gender ||
    !age ||
    !weight ||
    !fitnessLevel ||
    !goals ||
    !equipment ||
    !weekdays ||
    !workoutTime ||
    !workoutDuration ||
    !userTimezoneOffset
  ) {
    return c.json({ error: 'Profile not complete' }, 500);
  }

  const input: routineType = {
    gender,
    age,
    weight,
    fitnessLevel,
    goals: goals.split(','),
    equipment: equipment.split(','),
    weekdays,
    time: workoutTime,
    duration: workoutDuration,
    offset: userTimezoneOffset,
    id: userId,
  };

  const jobId = nanoid();

  await createRoutineQueue.add(`create-routine:${jobId}`, {
    ...input,
  });

  return c.json('generated your workout routine');
});

app.get(
  '/ws',
  upgradeWebSocket((c) => {
    const url = new URL(c.req.url);
    const userid = url.searchParams.get('userId');
    if (!userid) return {};
    return {
      onOpen: (_, ws) => {
        console.log('new connection opened');
        const wss = ws.raw as ServerWebSocket<webSocketData>;
        clients.set(userid, wss);
      },
      onMessage(event, ws) {
        console.log(`Message from client: ${event.data}`);
        ws.send('Hello from server!');
      },
      onClose: (_, ws) => {
        ws.raw?.close();
        clients.delete(userid);
        console.log('Connection closed');
      },
      onError: () => console.log('Websocket Error'),
    };
  })
);

const distDir = join(import.meta.dir, '../../frontend/dist');

app.use('/*', serveStatic({ root: distDir }));
app.use(
  '/*',
  serveStatic({
    root: distDir,
    path: 'index.html',
  })
);

Bun.serve({
  fetch: app.fetch,
  port: 3000,
  websocket,
  idleTimeout: 120,
});

console.log('✅✅✅ Started Backend Server');
