"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function ProductsPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="text-center space-y-5">
      <Navbar />
      <Button onClick={() => setIsOpen((prev) => !prev)}>Create Product</Button>

      <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
