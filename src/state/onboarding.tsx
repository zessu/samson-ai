import { create } from "zustand";
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
  duration: z.number(),
  notifications: z.enum(["Email"]),
});

export type onBoardingState = z.infer<typeof onBoardingSchema>;

export const useStore = create<onBoardingState>((set) => ({
  gender: "Male",
  age: 0,
  weight: 0,
  fitnessLevel: "beginner",
  goals: [],
  equipment: [],
  weekdays: [],
  time: "",
  duration: 0,
  notifications: "Email",
}));
