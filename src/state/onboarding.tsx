import { create } from 'zustand'

const Gender = {
  Male: "Male",
  Female: "Female"
} as const;

type onBoardingState = {
  gender: "Male" | "Female"
}


export const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}))
