"use client";

import { Github } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useCountStore } from "@/stores/countStore";
import { Switch } from "./ui/switch";
import { useThemeStore } from "@/stores/themeStore";
import { Label } from "./ui/label";

const Navbar = () => {
  const { count } = useCountStore();
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="flex-none flex items-center justify-between p-5 border-b">
      <Link href={"/"}>
        <h1>NextStarter {count}</h1>
      </Link>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-gray-200 border border-gray-200 rounded-full px-2 py-1">
          <Label>{theme}</Label>
          <Switch onClick={setTheme} />
        </div>

        <Link href={"/counter"}>Counter</Link>
        <Link href={"/profile"}>Profile</Link>
        <Link href="/products">Products</Link>

        <Link href="/features">Features</Link>

        <Link href="github.com">Get Started</Link>

        <Button variant="outline">
          <Github /> GitHub
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
