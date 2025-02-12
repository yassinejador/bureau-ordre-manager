import { NextResponse } from 'next/server';
import { deleteCourrier, fetchCourriersAvecFichiersById,  } from '../../../../../lib/queries/arrivées'; // Adapter le chemin

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params; // Accéder à l'ID via params

        if (!id || isNaN(Number(id))) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        // Récupérer le courrier par ID
        const courrier = await fetchCourriersAvecFichiersById(Number(id));

        if (!courrier) {
            return NextResponse.json({ error: 'Courrier not found' }, { status: 404 });
        }

        return NextResponse.json({ courrier });
    } catch (error) {
        console.error('Error fetching courrier by ID:', error);
        return NextResponse.json({ error: 'Failed to fetch courrier by ID' }, { status: 500 });
    }
}
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params; // Récupérer l'ID

        if (!id || isNaN(Number(id))) {
            return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
        }

        // Supprimer le courrier avec l'ID donné
        const result = await deleteCourrier(Number(id));

        if (result.affectedRows === 0) {
            return NextResponse.json({ error: 'Courrier introuvable' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Courrier supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression du courrier:', error);
        return NextResponse.json({ error: 'Échec de la suppression du courrier' }, { status: 500 });
    }
}


