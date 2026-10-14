import { connectToMongoDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

type Params = { params: Promise<{ id: string }> };

function invalidId() {
  return Response.json({ message: "Invalid id" }, { status: 400 });
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    if (!ObjectId.isValid(id)) return invalidId();

    const db = await connectToMongoDB();
    const student = await db
      .collection("students")
      .findOne({ _id: new ObjectId(id) });

    if (!student) {
      return Response.json({ message: "Student not found" }, { status: 404 });
    }

    return Response.json(student);
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}

// PUT: replace the whole student. Fields not sent are removed.
export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    if (!ObjectId.isValid(id)) return invalidId();

    const db = await connectToMongoDB();
    const form = await request.json();
    delete form._id; // MongoDB doesn't allow changing _id

    const result = await db
      .collection("students")
      .replaceOne({ _id: new ObjectId(id) }, form);

    if (result.matchedCount === 0) {
      return Response.json({ message: "Student not found" }, { status: 404 });
    }

    return Response.json({ message: "Student replaced" });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}

// PATCH: update only the fields sent. Other fields stay the same.
export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    if (!ObjectId.isValid(id)) return invalidId();

    const db = await connectToMongoDB();
    const form = await request.json();
    delete form._id;

    const result = await db
      .collection("students")
      .updateOne({ _id: new ObjectId(id) }, { $set: form });

    if (result.matchedCount === 0) {
      return Response.json({ message: "Student not found" }, { status: 404 });
    }

    return Response.json({ message: "Student updated" });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    if (!ObjectId.isValid(id)) return invalidId();

    const db = await connectToMongoDB();
    const result = await db
      .collection("students")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return Response.json({ message: "Student not found" }, { status: 404 });
    }

    return Response.json({ message: "Student deleted" });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
