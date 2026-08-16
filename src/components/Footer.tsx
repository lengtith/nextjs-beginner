import { Github, Twitter } from "lucide-react";
import React from "react";

export const Footer = () => {
  return (
    <footer className="border-t border-border px-6 py-6 flex items-center justify-between text-sm text-muted-foreground">
      <span>© 2026 NextStarter</span>
      <div className="flex items-center gap-4">
        <a href="#" className="hover:text-foreground transition-colors">
          <Twitter className="size-4" />
        </a>
        <a href="#" className="hover:text-foreground transition-colors">
          <Github className="size-4" />
        </a>
      </div>
    </footer>
  );
};
