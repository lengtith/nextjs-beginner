import { create } from "zustand";

interface ThemeStoreProp {
  theme: string;
  setTheme: () => void;
}

export const useThemeStore = create<ThemeStoreProp>()((set) => ({
  theme: "dark",
  setTheme: () =>
    set((state) => ({ theme: state.theme == "dark" ? "light" : "dark" })),
}));
