"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type User = {
  _id: string;
  name: string;
  age: number;
  gender: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [saving, setSaving] = useState(false);

  // GET all users and put them in state.
  async function loadUsers() {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setUsers(data);
      setError("");
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  // POST a new user, then reload the list.
  async function createUser(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age: Number(age), gender }),
      });
      if (!response.ok) throw new Error((await response.json()).message);
      setName("");
      setAge("");
      setGender("");
      await loadUsers();
    } catch (err) {
      setError(String(err));
    } finally {
      setSaving(false);
    }
  }

  const input =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-900";

  return (
    <div className="flex-1 bg-gray-50 px-4 py-10 dark:bg-gray-950">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <p className="mt-1 text-sm text-gray-500">
            {users.length} {users.length === 1 ? "user" : "users"} · click a
            card to view, edit or delete
          </p>
        </div>

        {/* Create form */}
        <form
          onSubmit={createUser}
          className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-end dark:border-gray-800 dark:bg-gray-900/50"
        >
          <input
            className={input}
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className={`${input} sm:w-28`}
            placeholder="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
          <input
            className={`${input} sm:w-36`}
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={saving}
            className="shrink-0 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 active:scale-95 disabled:opacity-50"
          >
            {saving ? "Adding…" : "+ Add user"}
          </button>
        </form>

        {error && (
          <p className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-500/10 dark:text-rose-400">
            {error}
          </p>
        )}

        {/* Card list */}
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-28 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800"
              />
            ))}
          </div>
        ) : users.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-gray-300 py-12 text-center text-sm text-gray-500 dark:border-gray-700">
            No users yet. Add the first one above.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <Link
                key={user._id}
                href={`/users/${user._id}`}
                className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-indigo-500/50"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-lg font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                  {user.name?.charAt(0).toUpperCase() || "?"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">
                    {user.name || "Unnamed"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {user.age ?? "–"} years · {user.gender || "–"}
                  </p>
                </div>
                <span className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-indigo-500">
                  →
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
