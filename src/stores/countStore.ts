import { create } from "zustand";

interface CountStoreProp {
  count: number;
  name: string;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
}

export const useCountStore = create<CountStoreProp>((set) => ({
  // States
  count: 10,
  name: "seksaa",

  // Actions
  onIncrement: () => set((state) => ({ count: state.count + 1 })),
  onDecrement: () => set((state) => ({ count: state.count - 1 })),
  onReset: () => set((state) => ({ count: state.count * 0 })),
}));
