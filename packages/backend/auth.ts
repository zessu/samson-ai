import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./src/db/index";
import { verification, user, account, session } from "./auth-schema";
import { workoutSchedules } from "./src/db/schema/index";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
      workoutSchedules,
    },
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  trustedOrigins: [`${process.env.LOCALDOMAIN}`],
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
    defaultCookieAttributes: {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      partitioned: true,
    },
  },
});
