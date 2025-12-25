import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { eq } from "drizzle-orm";

import { db } from "./src/db/index";
import { verification, user, account, session } from "./auth-schema";
import { workoutSettings } from "./src/db/schema/index";
import { sendIntroEmail } from "@/lib/sendIntroEmail";
import { sendExampleWorkoutEmail } from "@/lib/sendExampleWorkoutEmail";

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
      if (ctx.path.startsWith("/callback")) {
        const newSession = ctx.context.newSession;
        if (newSession) {
          const email = newSession.user.email;
          const res = await db
            .select({ firstTimeLogginIn: user.firstTimeLogin })
            .from(user)
            .where(eq(user.email, email));
          if (!res || res.length === 0) return;
          if (!res[0].firstTimeLogginIn) return;
          // send them intro email if first time login in
          await sendIntroEmail({ email, emailType: "intro" });
          await sendExampleWorkoutEmail({ email, emailType: "exampleWorkout" });
          await db
            .update(user)
            .set({ firstTimeLogin: false })
            .where(eq(user.email, email));
        }
      }
    }),
  },
});
