"use client";

export default function SchoolPage() {
  function CreateSchool() {
    fetch("/api/school", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  }

  return <div onClick={CreateSchool}>Create</div>;
}
