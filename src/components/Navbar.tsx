import { Github } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-5 border-b">
      <h1>NextStarter</h1>

      <div className="flex items-center gap-4">
        <a href="#">Features</a>
        <a href="#">Get Started</a>
        <Button variant="outline">
          <Github /> GitHub
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
