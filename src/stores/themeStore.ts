import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeProp {
  theme: "light" | "dark";
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
}

export const useThemeStore = create<ThemeProp>()(
  persist(
    (set) => ({
      theme: "light",
      toggleTheme: () =>
        set((state) => ({ theme: state.theme == "light" ? "dark" : "light" })),
      setTheme: (theme) => set({ theme }),
    }),
    { name: "theme" },
  ),
);
