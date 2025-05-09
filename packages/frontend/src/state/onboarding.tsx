import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { onBoardingState } from "shared";

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
        offset: "",
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
