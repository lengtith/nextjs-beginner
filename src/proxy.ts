import { NextRequest, NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";

// Compare hashes so the check takes the same time no matter
// how many characters of the key are correct.
function isValidApiKey(key: string | null) {
  const expected = process.env.API_KEY;
  if (!key || !expected) return false;

  const a = createHash("sha256").update(key).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export function proxy(request: NextRequest) {
  // 1. Trusted servers send the secret key in a header.
  if (isValidApiKey(request.headers.get("x-api-key"))) {
    return NextResponse.next();
  }

  // 2. Our own pages: the browser marks fetches from the same site.
  if (request.headers.get("sec-fetch-site") === "same-origin") {
    return NextResponse.next();
  }

  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}

// Only run on API routes, not on pages.
export const config = {
  matcher: "/api/:path*",
};
