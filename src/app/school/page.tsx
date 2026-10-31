"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

type School = { _id: string; name: string; gender: string; age: number };

export default function SchoolPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [listLoading, setListLoading] = useState(true);

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function fetchSchool() {
    try {
      const response = await fetch("/api/school");
      if (!response.ok) throw new Error("Failed to load schools");
      setSchools(await response.json());
    } catch (error) {
      setIsError(true);
      setMessage(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setListLoading(false);
    }
  }

  useEffect(() => {
    fetchSchool();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // stop the page from reloading
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/school", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, gender, age: Number(age) }),
      });

      if (!res.ok) {
        const data = await res.json();
        setIsError(true);
        setMessage(data.message ?? "Something went wrong");
        return;
      }

      setIsError(false);
      setMessage("Created!");
      setName("");
      setGender("");
      setAge("");
      fetchSchool(); // refresh the list with the new school
    } catch {
      setIsError(true);
      setMessage("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex-1 w-full max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Create School</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 border p-6 rounded-xl"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Sok Chea"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="gender">Gender</Label>
          {/* Same styles as shadcn Input so the fields match */}
          <select
            id="gender"
            value={gender}
            className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-base md:text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] dark:bg-input/30"
            required
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            min={0}
            placeholder="10"
            value={age}
            required
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </Button>

        {message && (
          <p
            className={`text-sm ${isError ? "text-red-600" : "text-green-600"}`}
          >
            {message}
          </p>
        )}
      </form>

      {/* List Schools */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Schools</h2>
        {listLoading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : schools.length === 0 ? (
          <p className="text-sm text-muted-foreground">No schools found</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {schools.map((school) => (
              <li
                key={school._id}
                className="flex justify-between border rounded-lg px-4 py-3 cursor-pointer active:scale-95 duration-300 ease-in hover:shadow-lg"
                onClick={() => redirect(`/school/${school._id}`)}
              >
                <span className="font-medium">{school.name}</span>
                <span className="text-sm text-muted-foreground capitalize">
                  {school.gender} · {school.age}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
