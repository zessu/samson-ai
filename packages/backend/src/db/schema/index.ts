import {
  pgTable,
  smallint,
  timestamp,
  pgEnum,
  text,
  time,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { user } from '../../../auth-schema';

import { workoutSettings, workoutSchedule } from './tables';

const weekdays = pgEnum('weekdays', [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const);

export const workoutSettingsInsertSchema = createInsertSchema(workoutSettings);
export const workoutSettingsUpdateSchema = createUpdateSchema(workoutSettings);
export const workoutScheduleInsertSchema = createInsertSchema(workoutSchedule);

export * from './tables';
export * from './relation';
export * from '../../../auth-schema';
