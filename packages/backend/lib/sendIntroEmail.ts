import { Resend } from "resend";
import { introEmail } from "@lib/index";

export const sendIntroEmail = async (jobData: introEmail) => {
  const resend = new Resend(Bun.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    // to: res[0].email, //TODO: change this once you validate your domain
    to: Bun.env.TEST_DOMAIN as string,
    subject: "Hello World",
    html: ``,
  });
};
