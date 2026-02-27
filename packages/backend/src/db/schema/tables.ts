import {
  pgTable,
  smallint,
  timestamp,
  pgEnum,
  text,
  time,
} from 'drizzle-orm/pg-core';
import { user } from '../../../auth-schema';

const weekdays = pgEnum('weekdays', [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const);

export const workoutSettings = pgTable('workoutSettings', {
  id: text('id').primaryKey(),
  weekdays: weekdays().array(),
  workoutTime: time('workout_time'),
  workoutDuration: smallint('workout_duration'),
  userTimezoneOffset: smallint('offset'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' })
    .unique(),
});

export const workoutSchedule = pgTable('workout_schedule', {
  id: text('id').primaryKey(),
  week: text('week').notNull(),
  day: text('day').notNull(),
  workout: text('workout').notNull(),
  calories: smallint('calories').notNull(),
  caution: text('caution').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});
