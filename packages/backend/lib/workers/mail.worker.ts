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

      console.log(`sending email to ${res[0].email}`);

      const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        // to: res[0].email, //TODO: change this once you validate your domain
        to: Bun.env.TEST_DOMAIN as string,
        subject: "Hello World",
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <link
      rel="preload"
      as="image"
      href="https://react.email/static/instagram-logo.png " /></head
  ><!--$-->
  <table
    align="center"
    border="0"
    cellpadding="0"
    cellspacing="0"
    role="presentation"
    style="width:100%;max-width:600px;margin:0 auto;background-color:white;background-image:url(&#x27;/static/my-image.png&#x27;);background-size:cover;background-position:center;height:424px">
    <tbody>
      <tr>
        <td align="center" style="padding:40px;text-align:center">
          <h4
            style="margin:8px 0 0 0;font-weight:700;color:rgb(236, 166, 39)"></h4>
          <p
            style="font-size:16px;line-height:24px;margin:0;font-weight:600;color:rgb(45, 24, 83);margin-top:0;margin-bottom:0;margin-left:0;margin-right:0">
            Hi there👋 Hope you are excited for today. Here is today&#x27;s
            workout
          </p>
          <h1
            style="margin:8px 0 0 0;font-weight:700;font-size:28px;color:rgb(45, 24, 83)">
            This is your moment. Own it. Crush it.
          </h1>
          <p
            style="font-size:16px;line-height:24px;margin:16px 0 0 0;color:rgb(45, 24, 83);margin-top:16px;margin-right:0;margin-bottom:0;margin-left:0">
            ${jobData.workout}<br />
            calories:${jobData.calories}<br />
            caution:${jobData.caution}
          </p>
          <a
            href="https://react.email "
            style="line-height:100%;text-decoration:none;display:inline-block;max-width:100%;mso-padding-alt:0px;margin-top:24px;border-radius:8px;border-width:1px;border-style:solid;border-color:rgb(229,231,235);background-color:#000;padding:12px 40px 12px 40px;font-weight:600;color:#fff"
            target="_blank"
            ><span
              ><!--[if mso]><i style="mso-font-width:500%;mso-text-raise:18" hidden>&#8202;&#8202;&#8202;&#8202;</i><![endif]--></span
            ><span
              style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px"
              >Go To App</span
            ><span
              ><!--[if mso]><i style="mso-font-width:500%" hidden>&#8202;&#8202;&#8202;&#8202;&#8203;</i><![endif]--></span
            ></a
          >
        </td>
      </tr>
    </tbody>
  </table>
  <table
    align="center"
    width="100%"
    border="0"
    cellpadding="0"
    cellspacing="0"
    role="presentation"
    style="max-width:600px;margin:0 auto;padding:40px 20px;background-color:rgb(45, 24, 83);color:#fff">
    <tbody>
      <tr>
        <td>
          <table
            align="center"
            width="100%"
            border="0"
            cellpadding="0"
            cellspacing="0"
            role="presentation">
            <tbody style="width:100%">
              <tr style="width:100%">
                <td colspan="4" data-id="__react-email-column">
                  <p
                    style="font-size:18px;line-height:24px;margin:0;font-weight:bold;margin-top:0;margin-bottom:0;margin-left:0;margin-right:0">
                    SAMSON
                  </p>
                  <p
                    style="font-size:16px;line-height:24px;margin-top:4px;font-weight:bold;margin-bottom:16px">
                    Your personal AI fitness trainer
                  </p>
                  <table
                    align="center"
                    width="100%"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation">
                    <tbody style="width:100%">
                      <tr style="width:100%">
                        <td
                          data-id="__react-email-column"
                          style="display:inline-block;vertical-align:middle">
                          <a
                            href="#"
                            style="color:#067df7;text-decoration-line:none"
                            target="_blank"
                            ><img
                              alt="Instagram"
                              height="36"
                              src="https://react.email/static/instagram-logo.png "
                              style="display:block;outline:none;border:none;text-decoration:none"
                              width="36"
                          /></a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table
                    align="center"
                    width="100%"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation">
                    <tbody style="width:100%">
                      <tr style="width:100%">
                        <p
                          style="font-size:14px;line-height:24px;margin:16px 0 4px 0;font-weight:600;margin-top:16px;margin-right:0;margin-bottom:4px;margin-left:0">
                          Made For You With ♥️
                        </p>
                        <p
                          style="font-size:14px;line-height:24px;margin:0;font-weight:600;margin-top:0;margin-bottom:0;margin-left:0;margin-right:0">
                          Contact Email: plant-shirt-chemo@duck.com
                        </p>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <!--1--><!--/$-->
</html>`,
      });

      console.log(error);
      if (error) throw new Error("Could not send email to user");

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
