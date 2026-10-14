import { connectToMongoDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const db = await connectToMongoDB();
    const students = await db.collection("students").find().toArray();
    return Response.json(students);
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = await connectToMongoDB();
    const form = await request.json();
    const result = await db.collection("students").insertOne(form);

    return Response.json({
      ...result,
    });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
