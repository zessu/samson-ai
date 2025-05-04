import { smallint, pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core";

const gender = pgEnum("gender", ["Male", "Female"]);
const fitnessLevel = pgEnum("fitnessLevel", [
  "beginner",
  "intermediate",
  "advanced",
]);

/*
export const usersTable = pgTable("users", {
  id: text("id").primaryKey(),
  email: varchar("email").notNull().unique(),
  gender: gender(),
  weight: smallint().notNull(),
  age: smallint().notNull(),
  fitnessLevel: fitnessLevel(),
  goals: text(),
  equipment: text(),
});
*/

export const workoutSchedulesTable = pgTable("workoutSchedules", {
  id: text("id").primaryKey(),
  // user_id: text()
  //   .notNull()
  //   .references(() => usersTable.id),
});
