import { NextResponse } from "next/server";
import { getUserCount } from "../../../../lib/queries/users";
import { getEtablissementCount } from "../../../../lib/queries/etablissements";

export async function GET() {
  try {
    const totalUsers = await getUserCount();
    const totalEtablissements = await getEtablissementCount();
    return NextResponse.json({ totalUsers, totalEtablissements });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
