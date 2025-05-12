import {
  pgTable,
  smallint,
  timestamp,
  pgEnum,
  text,
  time,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
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

export const workoutSchedule = pgTable("workoutSchedules", {
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

export const workoutScheduleInsertSchema = createInsertSchema(workoutSchedule);
