"use client";

export default function StudentPage() {
  const createStudent = () => {
    fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Dara", age: 20 }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="flex-1 flex justify-center items-center">
      <button onClick={createStudent} className="px-3 py-2 rounded-lg border">
        Create Student
      </button>
    </div>
  );
}
