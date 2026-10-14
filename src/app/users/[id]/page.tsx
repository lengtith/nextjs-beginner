"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
  _id: string;
  name: string;
  age: number;
  gender: string;
};

export default function UserDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  // GET one user by id and fill the form with its values.
  useEffect(() => {
    async function loadUser() {
      try {
        const response = await fetch(`/api/users/${params.id}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setUser(data);
        setName(data.name ?? "");
        setAge(data.age != null ? String(data.age) : "");
        setGender(data.gender ?? "");
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      }
    }
    loadUser();
  }, [params.id]);

  // PATCH only the fields shown in the form.
  async function updateUser(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const form = { name, age: Number(age), gender };
      const response = await fetch(`/api/users/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setUser({ ...user!, ...form });
      setMessage(data.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  // DELETE the user, then go back to the list.
  async function deleteUser() {
    if (!confirm(`Delete ${user?.name}? This cannot be undone.`)) return;
    setBusy(true);
    try {
      const response = await fetch(`/api/users/${params.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error((await response.json()).message);
      router.push("/users");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setBusy(false);
    }
  }

  const label = "text-sm font-medium text-gray-700 dark:text-gray-300";
  const input =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-900";

  return (
    <div className="flex-1 bg-gray-50 px-4 py-10 dark:bg-gray-950">
      <div className="mx-auto flex w-full max-w-xl flex-col gap-6">
        <Link
          href="/users"
          className="w-fit text-sm text-gray-500 transition hover:text-indigo-600"
        >
          ← Back to users
        </Link>

        {error && (
          <p className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-500/10 dark:text-rose-400">
            {error}
          </p>
        )}

        {!user && !error && (
          <div className="h-80 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
        )}

        {user && (
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
            {/* Profile header */}
            <div className="flex items-center gap-4 border-b border-gray-200 p-6 dark:border-gray-800">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-2xl font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                {user.name?.charAt(0).toUpperCase() || "?"}
              </div>
              <div className="min-w-0">
                <h1 className="truncate text-xl font-bold">
                  {user.name || "Unnamed"}
                </h1>
                <p className="text-sm text-gray-500">
                  {user.age ?? "–"} years · {user.gender || "–"}
                </p>
                <p className="mt-1 truncate font-mono text-xs text-gray-400">
                  {user._id}
                </p>
              </div>
            </div>

            {/* Edit form */}
            <form onSubmit={updateUser} className="flex flex-col gap-4 p-6">
              <div className="flex flex-col gap-1.5">
                <label className={label} htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  className={input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className={label} htmlFor="age">
                    Age
                  </label>
                  <input
                    id="age"
                    className={input}
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={label} htmlFor="gender">
                    Gender
                  </label>
                  <input
                    id="gender"
                    className={input}
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  />
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
                  onClick={deleteUser}
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
