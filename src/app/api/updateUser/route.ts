import { NextResponse } from 'next/server';
import { updateUser } from '../../../../lib/handlers/updateUser';

export async function POST(req: Request) {
  try {
    const { id, nom, prenom, email } = await req.json();

    console.log("Données reçues dans l'API :", { id, nom, prenom, email });

    if (!id || !nom || !email) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 });
    }

    await updateUser(id, nom, prenom, email);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
