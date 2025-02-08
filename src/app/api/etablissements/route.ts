import { NextResponse } from 'next/server';
import { addEtablissement, fetchEtablissements } from '../../../../lib/queries/etablissements';

export async function GET() {
  try {
    const etablissements = await fetchEtablissements();
    return NextResponse.json({ etablissements });
  } catch (error) {
    console.error('Error fetching etablissements:', error);
    return NextResponse.json({ error: 'Failed to fetch etablissements' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { intitule, adresse, ville, fax, telephone } = await req.json();

    if (!intitule || !adresse ||!ville || !fax || !telephone) {
      return NextResponse.json({ error: "Tout ls champs sont  requis." }, { status: 400 });
    }

    await addEtablissement(intitule, adresse, ville, fax, telephone);

    return NextResponse.json({ message: "Etablissement ajouté" }, { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Erreur de base de données" }, { status: 500 });
  }
}