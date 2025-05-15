import { Worker, Job } from "bullmq";
import IORedis from "ioredis";
import { Resend } from "resend";
import { eq } from "drizzle-orm";

import { db } from "@db/index";
import { user } from "@/auth-schema";
import { mailSend } from "@lib/index";

const connection = new IORedis(`${Bun.env.REDIS_HOST}:${Bun.env.REDIS_PORT}`, {
  maxRetriesPerRequest: null,
});

const resend = new Resend(Bun.env.RESEND_API_KEY);

export const mailWorker = () => {
  const mailWorker = new Worker(
    "sendMail",
    async (job: Job<mailSend>) => {
      const jobData = job.data;
      const userid = job.data.userId;
      const res = await db
        .select({ email: user.email })
        .from(user)
        .where(eq(user.id, userid));

      if (res.length === 0)
        throw new Error("Could not find a user with that id");

      resend.emails.send({
        from: "onboarding@resend.dev",
        to: res[0].email,
        subject: "Hello World",
        html: `<p>Here here is your workout <br />workout ${jobData.workout} <br />calories ${jobData.calories} <br />caution ${jobData.caution}</p>`,
      });
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
