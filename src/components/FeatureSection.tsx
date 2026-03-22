import { Code2, Layers, Zap } from "lucide-react";
import React from "react";

export const FeatureSection = () => {
  return (
    <section id="features" className="px-6 py-16 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">
        Why this starter?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-3">
          <div className="text-primary">
            <Zap className="size-6" />
          </div>
          <h3 className="font-semibold text-base">Lightning Fast</h3>
          <p className="text-sm text-muted-foreground">
            Built with Next.js 16 and React 19 for the best performance out of
            the box.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-3">
          <div className="text-primary">
            <Layers className="size-6" />
          </div>
          <h3 className="font-semibold text-base">Component Driven</h3>
          <p className="text-sm text-muted-foreground">
            Composable UI with shadcn/ui components and Tailwind CSS v4.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-3">
          <div className="text-primary">
            <Code2 className="size-6" />
          </div>
          <h3 className="font-semibold text-base">Developer Experience</h3>
          <p className="text-sm text-muted-foreground">
            TypeScript, ESLint, and a clean project structure to keep you
            productive.
          </p>
        </div>
      </div>
    </section>
  );
};
