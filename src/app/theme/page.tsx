"use client";
import { useThemeStore } from "@/stores/themeStore";

export default function ThemePage() {
  const { theme, setTheme } = useThemeStore();

  return (
    <div
      className={`flex-1 flex items-center justify-center  ${theme == "dark" ? "bg-black" : "bg-white"}`}
    >
      <button
        className="bg-amber-500 text-white px-3 py-2 rounded-md"
        onClick={setTheme}
      >
        {theme}
      </button>
    </div>
  );
}
