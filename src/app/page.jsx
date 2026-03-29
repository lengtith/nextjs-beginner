import React from "react";

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import { FeatureSection } from "../components/FeatureSection";
import { Footer } from "../components/Footer";
import { Code2, Layers, Zap } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <Zap className="size-6" />,
      title: "Lightning Fast",
      description:
        "Built with Next.js 16 and React 19 for the best performance out of the box.",
    },
    {
      icon: <Layers className="size-6" />,
      title: "Component Driven",
      description:
        "Composable UI with shadcn/ui components and Tailwind CSS v4.",
    },
    {
      icon: <Code2 className="size-6" />,
      title: "Developer Experience",
      description:
        "TypeScript, ESLint, and a clean project structure to keep you productive.",
    },
  ];

  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeatureSection data={features} />
      <Footer />
    </div>
  );
}
