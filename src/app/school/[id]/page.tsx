"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type School = {
  _id: string;
  name?: string;
  age?: number;
  gender?: string;
};

export default function SchoolDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [school, setSchool] = useState<School | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  // GET one school by id and fill the form with its values.
  useEffect(() => {
    async function loadSchool() {
      try {
        const response = await fetch(`/api/school/${id}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setSchool(data);
        setName(data.name ?? "");
        setAge(data.age != null ? String(data.age) : "");
        setGender(data.gender ?? "");
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      }
    }
    loadSchool();
  }, [id]);

  // PATCH only the fields shown in the form.
  async function updateSchool(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    setError("");
    try {
      const form = { name, age: Number(age), gender };
      const response = await fetch(`/api/school/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      if (school) setSchool({ ...school, ...form });
      setMessage(data.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  // DELETE this school, then go back to the list.
  async function deleteSchool() {
    if (!confirm("Delete this school?")) return;
    setBusy(true);
    setMessage("");
    setError("");
    try {
      const response = await fetch(`/api/school/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      router.push("/school");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setBusy(false);
    }
  }

  return (
    <div className="flex-1 bg-gray-50 px-4 py-10 dark:bg-gray-950">
      <div className="mx-auto flex w-full max-w-xl flex-col gap-6">
        <Link
          href="/school"
          className="w-fit text-sm text-gray-500 transition hover:text-indigo-600"
        >
          ← Back to school
        </Link>

        {error && (
          <p className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-500/10 dark:text-rose-400">
            {error}
          </p>
        )}

        {!school && !error && (
          <div className="h-80 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
        )}

        {school && (
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
            {/* Profile header */}
            <div className="flex items-center gap-4 border-b border-gray-200 p-6 dark:border-gray-800">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-2xl font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                {school.name?.charAt(0).toUpperCase() || "?"}
              </div>
              <div className="min-w-0">
                <h1 className="truncate text-xl font-bold">
                  {school.name || "Unnamed"}
                </h1>
                <p className="text-sm text-gray-500">
                  {school.age ?? "–"} years · {school.gender || "–"}
                </p>
                <p className="mt-1 truncate font-mono text-xs text-gray-400">
                  {school._id}
                </p>
              </div>
            </div>

            {/* Edit form */}
            <form onSubmit={updateSchool} className="flex flex-col gap-4 p-6">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
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
              </div>

              {message && (
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  ✓ {message}
                </p>
              )}

              <div className="mt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={deleteSchool}
                  disabled={busy}
                  className="rounded-lg border border-rose-200 px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50 active:scale-95 disabled:opacity-50 dark:border-rose-500/30 dark:hover:bg-rose-500/10"
                >
                  Delete
                </button>
                <button
                  type="submit"
                  disabled={busy}
                  className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 active:scale-95 disabled:opacity-50"
                >
                  {busy ? "Saving…" : "Save changes"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
