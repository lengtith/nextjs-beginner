# 🍃 Next.js API + MongoDB (Students CRUD)

## 🎯 Objective

Build a simple student system that saves data to **MongoDB Atlas**:

- Create student
- Display student list
- Edit student
- Delete student

---

# 🧠 How It Works

```
Browser (page.tsx)  ──fetch──▶  Next.js API (route.ts)  ──driver──▶  MongoDB Atlas
        ▲                                │
        └──────────── JSON ──────────────┘
```

- **Page** → what the user sees, calls the API with `fetch`
- **API route** → runs on the server, talks to MongoDB
- **MongoDB** → stores the data

> ⚠️ The page never talks to MongoDB directly. Your password stays on the server.

---

# 📚 MongoDB Words

| MongoDB    | Like in Excel | Example                          |
| ---------- | ------------- | -------------------------------- |
| Cluster    | Computer      | `Cluster0`                       |
| Database   | File          | `seksaa`                         |
| Collection | Sheet         | `students`                       |
| Document   | Row           | `{ name: "Dara", age: 20 }`      |
| `_id`      | Row number    | `ObjectId("665f1c...")` (auto)   |

💡 You don't need to create the database or collection. MongoDB creates them **automatically** the first time you insert data.

💡 `admin` and `local` are system databases — don't use them. `test` is the default database when you don't choose a name.

---

# 🎯 Implementation Workflow (Step List)

1. Setup MongoDB Atlas
2. Install `mongodb` package
3. Add `.env`
4. Create database connection
5. Create API: list + create
6. Create API: get one + update + delete
7. Create students page
8. Create student detail page

---

# 🪜 Step-by-Step Implementation

## ✅ Step 1: Setup MongoDB Atlas

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) and create a free **M0** cluster
2. **Security → Database Access** → Add a database user (username + password)
3. **Security → Network Access** → Add IP Address → **Allow Access from Anywhere** (`0.0.0.0/0`)
4. **Clusters → Connect → Drivers** → copy the connection string

```
mongodb+srv://<db_username>:<db_password>@cluster0.xxxxx.mongodb.net/?appName=Cluster0
```

### 💡 Explanation

- **Database user** ≠ your Atlas login account
- **Network Access** → which computers are allowed to connect. If your IP is not here, the connection fails.

---

## ✅ Step 2: Install MongoDB Driver

```bash
npm install mongodb
```

### 💡 Explanation

The `mongodb` package lets Node.js (our API) talk to MongoDB.

---

## ✅ Step 3: Add `.env`

Create `.env` in the project root:

```env
MONGODB_USERNAME=your_db_user
MONGODB_PASSWORD=your_db_password
MONGODB_DB=seksaa
```

### 💡 Explanation

- `.env` keeps secrets **out of your code**
- `.env` is in `.gitignore` → it is never pushed to GitHub
- `MONGODB_DB` → the database name to use (without it, data goes to `test`)
- ⚠️ Restart `npm run dev` after changing `.env`

---

## ✅ Step 4: Create Database Connection

📁 `src/lib/mongodb.ts`

```ts
import { MongoClient } from "mongodb";

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const uri = `mongodb+srv://${username}:${password}@cluster0.jvpltmg.mongodb.net/?appName=Cluster0`;

// Save the client on globalThis so Next.js hot reload doesn't create a new connection on every save.
const globalForMongo = globalThis as unknown as { client?: MongoClient };
const client = globalForMongo.client ?? new MongoClient(uri);
globalForMongo.client = client;

export async function getDb() {
  await client.connect(); // safe to call many times
  return client.db(process.env.MONGODB_DB); // database name from .env
}
```

### 💡 Explanation

- `process.env.X` → read a value from `.env`
- `MongoClient` → the connection to the cluster
- `globalThis` → keeps **one** connection. Without it, every time you save a file in dev, Next.js creates a new connection.
- `getDb()` → connect (if not connected yet) and return the database. Every API calls this.

---

## ✅ Step 5: API — List + Create

📁 `src/app/api/students/route.ts`

```ts
import { getDb } from "@/lib/mongodb";

// GET /api/students → list all students
export async function GET() {
  try {
    const db = await getDb();
    const students = await db.collection("students").find().toArray();

    return Response.json(students);
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}

// POST /api/students → create a student
export async function POST(request: Request) {
  try {
    const { name, age } = await request.json();

    if (!name || !age) {
      return Response.json(
        { message: "name and age are required" },
        { status: 400 },
      );
    }

    const db = await getDb();
    const result = await db
      .collection("students")
      .insertOne({ name, age: Number(age) });

    return Response.json(
      { _id: result.insertedId, name, age: Number(age) },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
```

### 💡 Explanation

- File path = URL → `app/api/students/route.ts` = `/api/students`
- Function name = HTTP method → `GET`, `POST`
- `request.json()` → read the body sent from the page
- `find().toArray()` → get all documents as an array
- `insertOne()` → save one document, returns the new `insertedId`
- `try / catch` → if MongoDB fails, return an error instead of crashing

---

## ✅ Step 6: API — Get One + Update + Delete

📁 `src/app/api/students/[id]/route.ts`

```ts
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

type Params = { params: Promise<{ id: string }> };

// GET /api/students/:id → get one student
export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return Response.json({ message: "Invalid id" }, { status: 400 });
    }

    const db = await getDb();
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

// PUT /api/students/:id → update a student
export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const { name, age } = await request.json();

    if (!ObjectId.isValid(id)) {
      return Response.json({ message: "Invalid id" }, { status: 400 });
    }

    const db = await getDb();
    const result = await db
      .collection("students")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { name, age: Number(age) } },
      );

    if (result.matchedCount === 0) {
      return Response.json({ message: "Student not found" }, { status: 404 });
    }

    return Response.json({ message: "Student updated" });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}

// DELETE /api/students/:id → delete a student
export async function DELETE(request: Request, { params }: Params) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return Response.json({ message: "Invalid id" }, { status: 400 });
    }

    const db = await getDb();
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
```

### 💡 Explanation

- `[id]` folder → dynamic URL. `/api/students/665f1c...` gives `id = "665f1c..."`
- `await params` → in Next.js 15+, `params` is a Promise
- `new ObjectId(id)` → MongoDB `_id` is an **ObjectId**, not a string. We must convert it.
- `ObjectId.isValid(id)` → check first, otherwise `new ObjectId("abc")` throws an error
- `$set` → only change these fields, keep the others
- `matchedCount` / `deletedCount` → `0` means no student had that id

---

## ✅ Step 7: Students Page (List + Create + Delete)

📁 `src/app/students/page.tsx`

```tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Student {
  _id: string;
  name: string;
  age: number;
}

export default function StudentPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  // 1. Load students when the page opens
  useEffect(() => {
    fetch("/api/students")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  // 2. Create a student, then add it to the list
  const createStudent = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age }),
    });
    const newStudent = await res.json();

    setStudents([...students, newStudent]);
    setName("");
    setAge("");
  };

  // 3. Delete a student, then remove it from the list
  const deleteStudent = async (id: string) => {
    await fetch(`/api/students/${id}`, { method: "DELETE" });
    setStudents(students.filter((student) => student._id !== id));
  };

  return (
    // ... form + list (see the file for the full JSX)
  );
}
```

### 💡 Explanation

- `"use client"` → this page uses state and events, so it runs in the browser
- `useEffect(..., [])` → run once when the page opens
- `fetch(url, { method, headers, body })` → call our API
- `JSON.stringify()` → turn a JS object into text to send
- `res.json()` → turn the response text back into a JS object
- After create/delete we update `students` state, so the list changes without reloading

---

## ✅ Step 8: Student Detail Page (Edit + Delete)

📁 `src/app/students/[id]/page.tsx`

```tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function StudentDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  // 1. Load this student
  useEffect(() => {
    fetch(`/api/students/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setAge(String(data.age));
      });
  }, [id]);

  // 2. Update this student
  const updateStudent = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`/api/students/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age }),
    });

    router.push("/students");
  };

  // 3. Delete this student
  const deleteStudent = async () => {
    await fetch(`/api/students/${id}`, { method: "DELETE" });
    router.push("/students");
  };

  // ... form JSX
}
```

### 💡 Explanation

- `useParams()` → read `id` from the URL `/students/[id]`
- Load the student → fill the form
- `router.push("/students")` → go back to the list after save/delete

---

# 📋 API Summary

| Method | URL                 | Body              | Does what       |
| ------ | ------------------- | ----------------- | --------------- |
| GET    | `/api/students`     | –                 | List students   |
| POST   | `/api/students`     | `{ name, age }`   | Create student  |
| GET    | `/api/students/:id` | –                 | Get one student |
| PUT    | `/api/students/:id` | `{ name, age }`   | Update student  |
| DELETE | `/api/students/:id` | –                 | Delete student  |

# 🚦 Status Codes

| Code | Meaning      | When                          |
| ---- | ------------ | ----------------------------- |
| 200  | OK           | Success                       |
| 201  | Created      | POST success                  |
| 400  | Bad Request  | Missing data or invalid id    |
| 404  | Not Found    | No student with that id       |
| 500  | Server Error | MongoDB failed / code crashed |

---

# 🧪 Test the API (without the page)

Open the browser: [http://localhost:3000/api/students](http://localhost:3000/api/students)

Or use the terminal:

```bash
# Create
curl -X POST http://localhost:3000/api/students -H "Content-Type: application/json" -d "{\"name\":\"Dara\",\"age\":20}"

# List
curl http://localhost:3000/api/students
```

💡 You can also use **Postman** or the **Thunder Client** VS Code extension.

Then check **Atlas → Browse Collections → seksaa → students** to see your data. 🎉

---

# 🛠️ Troubleshooting

| Error                                           | Cause                           | Fix                                                                        |
| ----------------------------------------------- | ------------------------------- | -------------------------------------------------------------------------- |
| `tlsv1 alert internal error` / `ServerSelection` | Your IP is not allowed          | Atlas → Network Access → add your IP (or `0.0.0.0/0`), wait until Active   |
| `bad auth : authentication failed`              | Wrong username/password         | Check `.env` uses the **Database Access** user, restart `npm run dev`      |
| Data saved in `test` database                   | `MONGODB_DB` not set            | Add `MONGODB_DB=seksaa` to `.env`, restart                                 |
| `undefined` in connection                       | `.env` not loaded               | `.env` must be in project root; restart `npm run dev`                      |
| Password has `@ : / ? #`                        | Breaks the URL                  | Use `encodeURIComponent(password)` or change to a letters/numbers password |
| Cluster connection timeout                      | Free cluster paused             | Atlas → Clusters → **Resume**                                              |

---

# 🏋️ Practice

1. Add an `email` field to students
2. Show `"Loading..."` while fetching
3. Show the error `message` from the API when create fails
4. Sort the list by name: `find().sort({ name: 1 })`
5. Create a new collection `courses` with the same CRUD
