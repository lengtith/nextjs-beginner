"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function ProductsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({ name: "Sokcheat", username: "sok" });

  const handleSubmit = () => {
    console.log(user);
  };

  return (
    <div className="text-center space-y-5">
      <Navbar />
      <Button onClick={() => setIsOpen((prev) => !prev)}>Create Product</Button>

      <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
        <form>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="name-1">Name</Label>
                <Input
                  id="name-1"
                  name="name"
                  defaultValue={user.name}
                  onChange={(e) =>
                    setUser((pre) => ({
                      ...pre,
                      name: e.target.value,
                    }))
                  }
                />
              </Field>
              <Field>
                <Label htmlFor="username-1">Username</Label>
                <Input
                  id="username-1"
                  name="username"
                  defaultValue={user.username}
                  onChange={(e) =>
                    setUser((pre) => ({
                      ...pre,
                      username: e.target.value,
                    }))
                  }
                />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" onClick={handleSubmit}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
