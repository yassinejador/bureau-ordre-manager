
import { NextResponse } from 'next/server';
import pool from '../../../../../lib/db';


export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Récupérer les détails du courrier
    const [courrier] = await pool.query(
      `
      SELECT 
        c.id,
        exp.intitule AS expediteur_nom, 
        dest.intitule AS destination_nom, 
        COALESCE(GROUP_CONCAT(f.fichier SEPARATOR ', '), '') AS fichiers_noms,  
        CONCAT(u.nom, ' ', u.prenom) AS traite_par_nom,
        c.objet AS objet,
        e.etat AS etat_courrier,
        c.date_creation,
        c.date_suppression
      FROM courriers c
      JOIN etablissements exp ON c.expediteur = exp.id
      JOIN etablissements dest ON c.destination = dest.id
      LEFT JOIN fichiers f ON c.id = f.courrier_id  -- LEFT JOIN pour inclure les courriers sans fichier
      JOIN users u ON c.traite_par = u.id
      JOIN etats e ON c.etat_id = e.id
      WHERE c.id = ?
      GROUP BY c.id, exp.intitule, dest.intitule, u.nom, u.prenom, c.objet, e.etat, c.date_creation, c.date_suppression;
      `,
      [id]
    );

    if (!courrier) {
      return NextResponse.json({ error: "Courrier non trouvé" }, { status: 404 });
    }

    return NextResponse.json({ courrier });
  } catch (error) {
    console.error("Erreur API détails courrier :", error);
    return NextResponse.json({ error: "Impossible de récupérer les détails du courrier" }, { status: 500 });
  }
}