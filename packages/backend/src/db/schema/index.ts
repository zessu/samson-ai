import {
  pgTable,
  smallint,
  timestamp,
  pgEnum,
  text,
} from "drizzle-orm/pg-core";
import { user } from "../../../auth-schema";

const weekdays = pgEnum("weekdays", [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]);

export const workoutSchedules = pgTable("workoutSchedules", {
  weekdays: weekdays(),
  workoutTime: timestamp("workout_time", { withTimezone: true }),
  workoutDuration: smallint("workout_duration"),
  offset: smallint("offset"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});
