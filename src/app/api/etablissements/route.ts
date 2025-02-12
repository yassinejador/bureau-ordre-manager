import { NextResponse } from 'next/server';
import { addEtablissement, fetchEtablissements } from '../../../../lib/queries/etablissements';
import { getAuthenticatedUser } from '../../../../lib/auth';
import { addLog } from '../../../../lib/queries/logs';


export async function GET() {
  try {
    const etablissements = await fetchEtablissements();
    return NextResponse.json({ etablissements });
  } catch (error) {
    console.error("Error fetching etablissements:", error);
    return NextResponse.json({ error: "Failed to fetch etablissements" }, { status: 500 });
  }
}

export async function POST(req: Request) {

  try {

    const authenticatedUser = await getAuthenticatedUser();
    if (!authenticatedUser) {
      throw new Error("Utilisateur non authentifié");
    }

    console.log("🔍 ID utilisateur connecté :", authenticatedUser.id);
    
    
    const { intitule, adresse, ville, fax, telephone } = await req.json();

    if (!intitule || !adresse || !ville || !fax || !telephone) {
      return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 });
    }

    const newEtablissement = await addEtablissement(intitule, adresse, ville, fax, telephone);

    await addLog ( authenticatedUser.id, `Ajouter Etablissement nommé ${intitule}`);


    return NextResponse.json(newEtablissement, { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Erreur de base de données" }, { status: 500 });
  }
}
