import { Queue } from "bullmq";
import { routineType } from "@lib/index";

import { connection } from "@/lib/connection";

export const connectRoutineQueue = () => {
  return new Queue<routineType>("generateRoutine", {
    connection,
  });
};
