import { Queue } from "bullmq";
import { connection } from "@/lib/connection";

export const workoutMailQueue = () => {
  return new Queue("workoutMailQueue", {
    connection,
  }).upsertJobScheduler("send-workout-emails", { pattern: "0 0 * * * *" });
};
