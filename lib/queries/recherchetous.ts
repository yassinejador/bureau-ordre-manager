import pool from '../db';

export async function getCourriers(filters: { 
  type: string; 
  date_creation?: string; 
  objet?: string;
  etablissement?: string;
}) {
  let query = `
    SELECT 
      c.id, 
      e1.intitule AS expediteur, 
      c.type, 
      e2.intitule AS destination, 
      CASE WHEN c.type = 'Départ' THEN CONCAT(u.nom, ' ', u.prenom) ELSE NULL END AS traite_par,
      c.objet, 
      et.etat AS statut, 
      c.date_creation 
    FROM courriers c
    JOIN etablissements e1 ON c.expediteur = e1.id
    JOIN etablissements e2 ON c.destination = e2.id
    LEFT JOIN users u ON c.traite_par = u.id
    JOIN etats et ON c.etat_id = et.id
    WHERE c.type = ?
  `;
  
  let values: any[] = [filters.type];

  if (filters.date_creation) {
    query += ` AND c.date_creation = ?`;
    values.push(filters.date_creation);
  }

  if (filters.objet) {
    query += ` AND c.objet LIKE ?`;
    values.push(`%${filters.objet}%`);
  }

  if (filters.etablissement) {
    if (filters.type === "Arrivé") {
      query += ` AND e1.intitule LIKE ?`; // For "Arrivé", match with expediteur
    } else if (filters.type === "Départ") {
      query += ` AND e2.intitule LIKE ?`; // For "Départ", match with destination
    }
    values.push(`%${filters.etablissement}%`);
  }

  try {
    const [rows] = await pool.execute(query, values);
    return rows;
  } catch (error) {
    console.error("Database query failed:", error);
    throw new Error("Failed to retrieve courriers");
  }
}
