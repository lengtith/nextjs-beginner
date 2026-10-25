import { connectToMongoDB } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await connectToMongoDB();
    const schools = await db?.collection("school").find().toArray();
    return Response.json(schools ?? []);
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, gender, age } = body;

    // Never trust the client: check every field on the server
    if (
      typeof name !== "string" ||
      !name.trim() ||
      !["male", "female"].includes(gender) ||
      typeof age !== "number" ||
      !Number.isInteger(age) ||
      age < 0
    ) {
      return Response.json({ message: "Invalid data" }, { status: 400 });
    }

    const db = await connectToMongoDB();
    // Save only the fields we expect, not the whole body
    const form = { name: name.trim(), gender, age };
    const result = await db?.collection("school").insertOne(form);

    return Response.json(
      {
        message: "Create successful",
        data: result?.insertedId,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
