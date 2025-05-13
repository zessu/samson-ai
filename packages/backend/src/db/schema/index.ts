import {
  pgTable,
  smallint,
  timestamp,
  pgEnum,
  text,
  time,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { user } from "../../../auth-schema";

const weekdays = pgEnum("weekdays", [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const);

export const workoutSettings = pgTable("workoutSettings", {
  id: text("id").primaryKey(),
  weekdays: weekdays().array(),
  workoutTime: time("workout_time"),
  workoutDuration: smallint("workout_duration"),
  offset: smallint("offset"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const workoutScheduleInsertSchema = createInsertSchema(workoutSettings);
export const workoutScheduleUpdateSchema = createUpdateSchema(workoutSettings);
