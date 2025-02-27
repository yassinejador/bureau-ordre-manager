import { NextResponse } from 'next/server';
import { fetchCourriersArchives } from '../../../../lib/queries/courrierArchive';



export async function GET() {
  try {
    const courriers = await fetchCourriersArchives();
    return NextResponse.json({ courriers });
  } catch (error) {
    console.error("Erreur API courriers archivés :", error);
    return NextResponse.json({ error: "Impossible de récupérer les courriers" }, { status: 500 });
  }
}
