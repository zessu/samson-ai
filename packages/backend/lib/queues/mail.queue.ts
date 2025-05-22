import { Queue } from "bullmq";
import { workOutEmail, introEmail, exampleWorkoutEmail } from "@lib/index";
import { connection } from "@/lib/connection";

export const mailQueue = () => {
  return new Queue<workOutEmail | introEmail | exampleWorkoutEmail>(
    "sendMail",
    {
      connection,
    }
  );
};
