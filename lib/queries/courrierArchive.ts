import pool from "../db";
import { COURRIER } from "@/types/courrier";

export const fetchCourriersArchives = async () => {
  const [courriersArchive] = await pool.query(`
  SELECT 
      c.id,
      exp.intitule AS expediteur, 
      dest.intitule AS destination, 
      COALESCE(GROUP_CONCAT(f.fichier SEPARATOR ', '), '') AS fichiers,  
      CONCAT(u.nom, ' ', u.prenom) AS traite_par,
      c.objet AS objet,
      e.etat AS statut,
      c.date_creation,
      c.date_suppression
    FROM courriers c
    JOIN etablissements exp ON c.expediteur = exp.id
    JOIN etablissements dest ON c.destination = dest.id
    LEFT JOIN fichiers f ON c.id = f.courrier_id  -- LEFT JOIN pour inclure les courriers sans fichier
    JOIN users u ON c.traite_par = u.id
    JOIN etats e ON c.etat_id = e.id
    GROUP BY c.id, exp.intitule, dest.intitule, u.nom, u.prenom, c.objet, e.etat, c.date_creation, c.date_suppression;
 
  `);

  return courriersArchive as COURRIER[];
};
