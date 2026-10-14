export async function readJson(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    return {
      error: Response.json(
        { message: "Content-Type must be application/json" },
        { status: 415 },
      ),
    };
  }

  try {
    return { body: await request.json() };
  } catch {
    return {
      error: Response.json({ message: "Invalid JSON body" }, { status: 400 }),
    };
  }
}
