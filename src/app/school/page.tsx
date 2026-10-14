"use client";

export default function SchoolPage() {
  function CreateUser() {
    fetch("/api/school", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  }

  return <div onClick={CreateUser}>Create</div>;
}
