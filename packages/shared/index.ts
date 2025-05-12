import { z } from "zod";

export const onBoardingSchema = z.object({
  gender: z.enum(["male", "female"]),
  age: z.number(),
  weight: z.number(),
  fitnessLevel: z.enum(["beginner", "intermediate", "advanced"]),
  goals: z.array(z.string()),
  equipment: z.array(z.string()),
  weekdays: z.array(
    z.enum([
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
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

const x = 12;
export type onBoardingState = z.infer<typeof onBoardingSchema>;
