"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function StudentDetail() {
  const params = useParams<{ id: string }>();
  const [student, setStudent] = useState<{ studentId: string } | null>(null);

  useEffect(() => {
    fetch("/api/students/" + params.id)
      .then((res) => res.json())
      .then((data) => setStudent(data));
  }, [params.id]);

  const putStudent = () => {
    fetch("/api/students/" + params.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Sokha", age: 20 }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const patchStudent = () => {
    fetch("/api/students/" + params.id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Sok" }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const deleteStudent = () => {
    fetch("/api/students/" + params.id, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  if (!student) return <div>Loading...</div>;

  return (
    <div>
      <div>Student ID: {student.studentId}</div>
      <button onClick={putStudent}>Put Student</button>
      <button onClick={patchStudent}>Patch Student</button>
      <button onClick={deleteStudent}>Delete Student</button>
    </div>
  );
}
