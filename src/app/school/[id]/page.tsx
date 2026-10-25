"use client";

import { useParams } from "next/navigation";

export default function SchoolDetail() {
  const { id } = useParams();

  return <div>{id}</div>;
}
