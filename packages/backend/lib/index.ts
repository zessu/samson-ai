import { z } from "zod";
import { onBoardingSchema } from "shared";

import { connectRoutineQueue } from "@lib/queues/createroutine.queue";
import { createRoutineWorker } from "@lib/workers/createroutine.worker";
import { workoutMailQueue } from "@/lib/queues/workoutpoller.queue";
import { workoutMailWorker } from "@/lib/workers/workoutpoller.worker";

export const routineInput = onBoardingSchema.omit({ notifications: true });
export type routineType = z.infer<typeof routineInput> & { id: string };

export const initQueues = () => {
  const routineQueue = connectRoutineQueue();
  createRoutineWorker();
  workoutMailQueue();
  workoutMailWorker();
  return {
    routineQueue,
  };
};
