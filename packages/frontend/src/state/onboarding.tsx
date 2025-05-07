import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
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

export const useStore = create<onBoardingState>()(
  devtools(
    persist(
      (set) => ({
        gender: "Male",
        age: 0,
        weight: 0,
        fitnessLevel: "beginner",
        goals: [],
        equipment: [],
        weekdays: [],
        time: "",
        duration: 0,
        notifications: {
          email: true,
          sms: false,
          app: false,
        },
      }),
      { name: "onboardingState" }
    )
  )
);
