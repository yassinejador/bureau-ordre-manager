import { NextResponse } from 'next/server';
import { updateEtablissement } from '../../../../lib/handlers/updateEtablissement';

export async function POST(req: Request) {
  try {
    const { id, intitule, adresse, ville, fax, telephone } = await req.json();

    console.log("Données reçues dans l'API :", { id, intitule, adresse, ville, fax, telephone});

    if (!id || !intitule || !adresse || !ville || !fax ||!telephone) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 });
    }

    await updateEtablissement(id, intitule, adresse, ville, fax, telephone);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
