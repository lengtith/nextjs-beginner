import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CountStoreProp {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
  handleReset: () => number;
}

export const useCountStore = create<CountStoreProp>()(
  persist(
    (set, get) => ({
      // States
      count: 10,

      // Actions
      onIncrement: () => set((state) => ({ count: state.count + 1 })),
      onDecrement: () => set((state) => ({ count: state.count - 1 })),
      handleReset: () => {
        return 0;
      },
      onReset: () => set(() => ({ count: get().handleReset() })),
    }),
    { name: "store" },
  ),
);
