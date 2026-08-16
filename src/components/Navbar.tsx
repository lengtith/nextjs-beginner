import { Github } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-5 border-b">
      <h1>NextStarter</h1>

      <div className="flex items-center gap-4">
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
