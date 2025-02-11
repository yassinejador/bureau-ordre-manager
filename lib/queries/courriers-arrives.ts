import pool from "../db";

export const addCourriers = async (
  expediteur: number,
  destination: number,
  traite_par: number,
  objet: string,
  etat_id: number,
  date_creation: string,
  type_courrier: "confidentiel" | "urgent", // Corriger l'orthographe
  type_support: "papier" | "numerique",
  fichiers: string[], // Changer le type pour string[] au lieu d'objets
) => {
  const [result] = (await pool.query(
    "INSERT INTO courriers (expediteur, destination, traite_par, objet, etat_id, date_creation) VALUES (?, ?, ?, ?, ?, ?)",
    [expediteur, destination, traite_par, objet, etat_id, date_creation],
  )) as any;

  // Corriger la boucle d'insertion des fichiers
  for (const cheminFichier of fichiers) {
    await pool.query(
      "INSERT INTO fichiers (type_courrier, type_support, fichier, courrier_id) VALUES (?, ?, ?, ?)",
      [type_courrier, type_support, cheminFichier, result.insertId], // Utiliser directement le chemin
    );
  }

  return result;
};