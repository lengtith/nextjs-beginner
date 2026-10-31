import { connectToMongoDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return Response.json({ message: "School not found" }, { status: 404 });
    }

    const db = await connectToMongoDB();
    const school = await db
      ?.collection("school")
      .findOne({ _id: new ObjectId(id) });

    if (!school?._id) {
      return Response.json({ message: "School not found" }, { status: 404 });
    }

    return Response.json(school);
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return Response.json({ message: "School not found" }, { status: 404 });
    }
    const db = await connectToMongoDB();
    const form = await request.json();
    delete form._id;

    const result = await db
      ?.collection("school")
      .updateOne({ _id: new ObjectId(id) }, { $set: form });

    if (result?.matchedCount === 0) {
      return Response.json({ message: "School not found" }, { status: 404 });
    }

    return Response.json({ message: "School updated" });
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return Response.json({ message: "School not found" }, { status: 404 });
    }
    const db = await connectToMongoDB();
    const result = await db
      ?.collection("school")
      .deleteOne({ _id: new ObjectId(id) });

    if (result?.deletedCount === 0) {
      return Response.json({ message: "School not found" }, { status: 404 });
    }

    return Response.json({ message: "School deleted" });
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
