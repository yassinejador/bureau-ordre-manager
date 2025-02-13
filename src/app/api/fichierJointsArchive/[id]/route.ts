import { NextResponse } from "next/server";
import { fetchFichierJoints } from "../../../../../lib/queries/fichierJoints";

export async function GET() {
  try {
    const fichiersJoints = await fetchFichierJoints();
    return NextResponse.json({ fichiersJoints });
  } catch (error) {
    console.error("Erreur lors de la récupération des fichiers :", error);
    return NextResponse.json({ error: "Impossible de récupérer les fichiers" }, { status: 500 });
  }
}
