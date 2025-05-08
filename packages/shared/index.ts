import { z } from "zod";

export const onBoardingSchema = z.object({
  gender: z.enum(["Male", "Female"]),
  age: z.number(),
  weight: z.number(),
  fitnessLevel: z.enum(["beginner", "intermediate", "advanced"]),
  goals: z.array(z.string()),
  equipment: z.array(z.string()),
  weekdays: z.array(
    z.enum([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ])
  ),
  time: z.string(),
  offset: z.string(),
  duration: z.number(),
  notifications: z.object({
    email: z.boolean(),
    sms: z.boolean(),
    app: z.boolean(),
  }),
});

export type onBoardingState = z.infer<typeof onBoardingSchema>;
