import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nanoid } from "nanoid";

import { db } from "./src/db/index";
import { verification, user, account, session } from "./auth-schema";
import { workoutSettings } from "./src/db/schema/index";
import { sendIntroEmail } from "@/lib/sendIntroEmail";
import { initMailQueue } from "@/lib/index";

const { mq } = initMailQueue();

const cookieAttr =
  Bun.env.NODE_ENV === "production"
    ? ({
        secure: true,
        httpOnly: true,
        sameSite: "lax",
        partitioned: true,
      } as const)
    : ({
        secure: true,
        httpOnly: false,
        sameSite: "lax",
        partitioned: true,
      } as const);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
      workoutSettings,
    },
  }),
  socialProviders: {
    google: {
      clientId: Bun.env.GOOGLE_CLIENT_ID as string,
      clientSecret: Bun.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  trustedOrigins: [`${Bun.env.LOCALDOMAIN}`],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60,
    },
  },
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
      domain: "localhost",
    },
    defaultCookieAttributes: cookieAttr,
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path.startsWith("/sign-up")) {
        const newSession = ctx.context.newSession;
        if (newSession) {
          const email = newSession.user.email;
          const jobId = nanoid();
          await mq.add(`sendMail:${jobId}`, { emailType: "intro", email });
        }
      }
    }),
  },
});
