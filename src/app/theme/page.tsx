"use client";
import { useThemeStore } from "@/stores/themeStore";

export default function ThemePage() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div
      className={`flex-1 flex justify-center items-center ${theme == "light" ? "bg-white" : "bg-black"}`}
    >
      <button
        className="bg-blue-500 rounded-lg px-4 py-2 text-white"
        onClick={toggleTheme}
      >
        {theme}
      </button>
    </div>
  );
}
