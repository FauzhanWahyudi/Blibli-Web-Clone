// path: /api
//location: /src/app/api/route.ts

import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ message: "Welcome to API" }, { status: 200 });
}
