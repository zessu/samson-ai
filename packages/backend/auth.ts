import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./src/db/index";
import { verification, user, account, session } from "./auth-schema";
import { workoutSchedule } from "./src/db/schema/index";

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
      workoutSchedule,
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
});
