import { NextResponse } from 'next/server';
import { fetchCourriersAvecFichiersById } from '../../../../../lib/queries/arrivées'; // Adapter le chemin

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
      const { id } = params;

      if (!id || isNaN(Number(id))) {
          return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
      }

      // Récupérer le courrier avec ses fichiers
      const courrier = await fetchCourriersAvecFichiersById(Number(id));

      if (!courrier || courrier.length === 0) {
          return NextResponse.json({ error: 'Courrier introuvable' }, { status: 404 });
      }

      return NextResponse.json({ courrier });
  } catch (error) {
      console.error('Erreur lors de la récupération du courrier:', error);
      return NextResponse.json({ error: 'Échec de la récupération du courrier' }, { status: 500 });
  }
}