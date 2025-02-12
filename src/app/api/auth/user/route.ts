import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "../../../../../lib/auth";

export async function GET() {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  return NextResponse.json(user);
}
