import { FICHE } from "@/types/fiche";
import pool from "../db";


export const fetchFichierJoints = async () => {
  const [fichiersJoints] = await pool.query(`
  SELECT 
  f.id AS id, 
  f.type_courrier, 
  f.type_support, 
  f.fichier, 
  f.courrier_id,
  c.objet AS courrier_objet,
  c.date_creation AS courrier_date_creation
FROM fichiers f
LEFT JOIN courriers c ON f.courrier_id = c.id
ORDER BY f.id ASC;

  `);

  return fichiersJoints as FICHE[];
};
