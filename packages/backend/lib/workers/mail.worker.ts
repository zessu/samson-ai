import { Worker, Job } from "bullmq";
import IORedis from "ioredis";
import { eq } from "drizzle-orm";

import { db } from "@db/index";
import { user } from "@/auth-schema";
import { workOutEmail, introEmail } from "@lib/index";
import { sendIntroEmail } from "@/lib/sendIntroEmail";
import { sendWorkoutEmail } from "@lib/sendWorkoutEmail";

const connection = new IORedis(`${Bun.env.REDIS_HOST}:${Bun.env.REDIS_PORT}`, {
  maxRetriesPerRequest: null,
});

export const mailWorker = () => {
  const mailWorker = new Worker(
    "sendMail",
    async (job: Job<workOutEmail | introEmail>) => {
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
        default:
          throw new Error("Provided email type does not exist");
      }

      return { status: "success" };
    },
    {
      connection,
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
