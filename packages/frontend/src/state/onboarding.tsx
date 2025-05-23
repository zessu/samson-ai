import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { onBoardingState } from "shared";

export const useStore = create<onBoardingState>()(
  devtools(
    persist(
      (set) => ({
        gender: "male",
        age: 0,
        weight: 0,
        fitnessLevel: "beginner",
        goals: [],
        equipment: [],
        weekdays: [],
        time: "",
        offset: 0,
        duration: 0,
        notifications: {
          email: true,
          sms: false,
          app: false,
        },
        setGender: (gender: "male" | "female") => {
          set({ gender });
        },
        setFitnessLevel: (
          fitnessLevel: "beginner" | "intermediate" | "advanced"
        ) => {
          set({ fitnessLevel });
        },
      }),
      { name: "onboardingState" }
    )
  )
);
