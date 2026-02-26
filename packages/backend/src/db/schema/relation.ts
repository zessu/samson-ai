import { relations } from 'drizzle-orm';
import { user, session, account } from '../../../auth-schema';
import { workoutSettings, workoutSchedule } from './index';

export const userRelations = relations(user, ({ one, many }) => ({
  workoutSettings: one(workoutSettings, {
    fields: [user.id],
    references: [workoutSettings.userId],
  }),
  workoutSchedule: many(workoutSchedule),
  session: many(session),
  account: many(account),
}));

export const workoutSettingsRelations = relations(
  workoutSettings,
  ({ one }) => ({
    user: one(user, {
      fields: [workoutSettings.userId],
      references: [user.id],
    }),
  })
);

export const workoutScheduleRelations = relations(
  workoutSchedule,
  ({ one }) => ({
    user: one(user, {
      fields: [workoutSchedule.userId],
      references: [user.id],
    }),
  })
);

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));
