import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: "dark",
  setTheme: () =>
    set((state) => ({ theme: state.theme == "dark" ? "light" : "dark" })),
}));
