import { NextResponse } from "next/server";
import { fetchLogs, addLog } from "../../../../lib/queries/logs";



export async function GET(req: Request) {
  try {
    const logs = await fetchLogs();
    return NextResponse.json({ logs });
  } catch (error) {
    console.error('Error fetching logs:', error);
    return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 });
  }
}

// Méthode POST pour ajouter un log
export async function POST(req: Request) {
  try {
    const { userId, description } = await req.json();

    if (!userId || !description ) {
      return NextResponse.json({ error: "les champs  sont requis." }, { status: 400 });
    }

    // Appeler la fonction ajouterLog
    const logResult = await addLog(userId, description);

    return NextResponse.json(logResult, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de l'ajout du log:", error);
    return NextResponse.json({ error: "Échec de l'ajout du log" }, { status: 500 });
  }
}