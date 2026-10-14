import { connectToMongoDB } from "@/lib/mongodb";

export async function GET() {
  await connectToMongoDB();
  return Response.json({
    message: "Hello from api.",
  });
}

export async function POST() {
  const db = await connectToMongoDB();
  const form = { name: "Sok Chea", age: 10, gender: "Male" };
  const result = await db?.collection("school").insertOne(form);

  return Response.json({
    message: "Create successful",
    data: result?.insertedId,
  });
}
