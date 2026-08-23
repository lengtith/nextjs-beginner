"use client";

import { useRef, useState } from "react";

type Role = "student" | "teacher";

interface EmptyUserProps {
  name: string;
  email: string;
  age: number;
  role: Role;
}

interface FullUserProps extends EmptyUserProps {
  id: string | number;
}

type UpdateUser = Partial<EmptyUserProps>;

const emptyUser: EmptyUserProps = {
  name: "Ronaldo",
  email: "",
  age: 0,
  role: "student",
};

export default function ProfilePage() {
  const [formValues, setFormValues] = useState<EmptyUserProps>(emptyUser);
  const [users, setUsers] = useState<FullUserProps[]>([]);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const nextId = useRef(1);

  function handleChange(field: string, value: string | number) {
    setFormValues((current) => ({
      ...current,
      [field]: field === "age" ? Number(value) : value,
    }));
  }

  function updateUser(id: number | string, updates: UpdateUser) {
    setUsers((current) =>
      current.map((user) => (user.id === id ? { ...user, ...updates } : user)),
    );
  }

  function handleEdit(user: FullUserProps) {
    const { id, ...rest } = user;

    setEditingId(id);
    setFormValues(rest);
  }

  function handleDelete(id: number | string) {
    setUsers((current) => current.filter((user) => user.id !== id));

    if (editingId === id) {
      handleCancel();
    }
  }

  function handleCancel() {
    setEditingId(null);
    setFormValues(emptyUser);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (editingId !== null) {
      updateUser(editingId, formValues);
    } else {
      setUsers((current) => [
        ...current,
        { id: nextId.current++, ...formValues },
      ]);
    }

    handleCancel();
  }

  const isEditing = editingId !== null;

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-4xl grid gap-6 lg:grid-cols-2">
        <div>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">
              {isEditing ? "Edit User" : "Create User"}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {isEditing
                ? "Update the fields and save your changes."
                : "Complete the form and submit the user."}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-xl border bg-white p-6"
          >
            <div>
              <label className="mb-1.5 block text-sm font-medium">Name</label>

              <input
                value={formValues.name}
                onChange={(event) => handleChange("name", event.target.value)}
                className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ada Lovelace"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">Email</label>

              <input
                type="email"
                value={formValues.email}
                onChange={(event) => handleChange("email", event.target.value)}
                className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ada@example.com"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">Age</label>

              <input
                type="number"
                value={formValues.age || ""}
                onChange={(event) => handleChange("age", event.target.value)}
                className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="20"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">Role</label>

              <select
                value={formValues.role}
                onChange={(event) => handleChange("role", event.target.value)}
                className="w-full rounded-lg border bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                {isEditing ? "Save Changes" : "Create User"}
              </button>

              {isEditing && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full rounded-lg border px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Users</h2>

            <p className="mt-2 text-sm text-slate-500">
              {users.length === 0
                ? "No users created yet."
                : `${users.length} user(s) created.`}
            </p>
          </div>

          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className={`rounded-xl border bg-white p-6 ${
                  editingId === user.id ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900">
                    {user.name || "Unnamed"}
                  </h3>

                  <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium capitalize text-blue-700">
                    {user.role}
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">{user.email}</p>
                <p className="mt-1 text-sm text-slate-500">Age: {user.age}</p>

                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleEdit(user)}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(user.id)}
                    className="text-sm font-medium text-red-600 hover:text-red-700 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
