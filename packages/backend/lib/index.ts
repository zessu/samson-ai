import { z } from "zod";
import { onBoardingSchema } from "shared";

export const routineInput = onBoardingSchema.omit({ notifications: true });
export type routineType = z.infer<typeof routineInput> & { id: string };

export { connectRoutineQueue } from "@lib/queues/createroutine.queue";
export { createRoutineWorker } from "@lib/workers/createroutine.worker";
