import { z } from "zod";
import { onBoardingSchema } from "shared";

import { connectRoutineQueue } from "@lib/queues/createroutine.queue";
import { createRoutineWorker } from "@lib/workers/createroutine.worker";
import { workoutMailQueue } from "@/lib/queues/workoutpoller.queue";
import { workoutMailWorker } from "@/lib/workers/workoutpoller.worker";
import { mailQueue } from "@lib/queues/mail.queue";
import { mailWorker } from "@lib/workers/mail.worker";

export const routineInput = onBoardingSchema.omit({ notifications: true });
export type routineType = z.infer<typeof routineInput> & { id: string };
export type mailSend = {
  workout: string;
  calories: number;
  userId: string;
  caution: string;
};

export const initQueues = () => {
  const routineQueue = connectRoutineQueue();
  const mq = mailQueue();
  createRoutineWorker();
  workoutMailQueue();
  workoutMailWorker();
  mailWorker();
  return {
    routineQueue,
    mq,
  };
};
