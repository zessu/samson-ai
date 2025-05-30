import { Worker, Job } from "bullmq";
import { eq } from "drizzle-orm";

import { db } from "@db/index";
import { user } from "@/auth-schema";
import { workOutEmail, introEmail, exampleWorkoutEmail } from "@lib/index";
import { sendIntroEmail } from "@lib/sendIntroEmail";
import { sendWorkoutEmail } from "@lib/sendWorkoutEmail";
import { sendExampleWorkoutEmail } from "@/lib/sendExampleWorkoutEmail";
import { connection } from "@/lib/connection";

export const mailWorker = () => {
  const mailWorker = new Worker(
    "sendMail",
    async (job: Job<workOutEmail | introEmail | exampleWorkoutEmail>) => {
      const jobData = job.data;

      switch (jobData.emailType) {
        case "workout":
          const userid = jobData.userId;
          const res = await db
            .select({ email: user.email })
            .from(user)
            .where(eq(user.id, userid));

          if (res.length === 0)
            throw new Error("Could not find a user with that id");

          console.log(`sending email to ${res[0].email}`);
          await sendWorkoutEmail(jobData);
          break;
        case "intro":
          await sendIntroEmail(jobData);
          break;
        case "exampleWorkout":
          await sendExampleWorkoutEmail(jobData);
          break;
        default:
          throw new Error("Provided email type does not exist");
      }

      return { status: "success" };
    },
    {
      connection,
      concurrency: 1,
    }
  );

  mailWorker.on("completed", (job) => {
    console.log(`Job ${job.id} completed`);
  });

  mailWorker.on("failed", (job, err) => {
    console.error(`Job ${job?.id} failed with error:`, err.message);
  });

  return mailWorker;
};
