import React from "react";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Github } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="flex flex-col items-center justify-center p-20">
      <Button variant={"outline"} className="rounded-full mb-5">
        <Zap />
        Next.js 16 + shadcn/ui
      </Button>

      <div className="text-center">
        <h1 className="text-5xl font-bold">
          Build beautiful app{" "}
          <span className="text-blue-500">
            faster <br /> than ever
          </span>
        </h1>
        <p className="w-96 m-auto mt-4 text-xl text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed error
          laboriosam mollitia rerum delectus, eveniet amet officiis
          necessitatibus repudiandae
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Button size={"lg"} className="mt-1">
          Started
          <ArrowRight />
        </Button>
        <Button size={"lg"} className="mt-1" variant={"outline"}>
          View on Github
          <Github />
        </Button>
      </div>
    </section>
  );
};
export default HeroSection;
