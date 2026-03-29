import { Code2, Layers, Zap } from "lucide-react";
import React from "react";

interface DataProp {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureSection = ({ data }: { data: DataProp[] }) => {
  return (
    <section id="features" className="px-6 py-16 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">
        Why this starter?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-border bg-card p-6 flex flex-col gap-3"
          >
            <div className="text-primary">{item.icon}</div>
            <h3 className="font-semibold text-base">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
