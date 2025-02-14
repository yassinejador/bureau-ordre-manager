import { getAuthenticatedUser } from '../auth';
import pool from '../db';
import { addLog } from '../queries/logs';

export const updateEtablissement = async (
  id: number,
  intitule: string,
  adresse: string,
  ville: string,
  fax: number,
  telephone:number   
) => {
  try {

    const authenticatedUser = await getAuthenticatedUser();
    if (!authenticatedUser) {
      throw new Error("Utilisateur non authentifié");
    }

    console.log(" ID utilisateur connecté :", authenticatedUser.id);
    

    console.log("Mise à jour dans la base de données :", { id, intitule, adresse, ville,fax,telephone });

    const [result] = await pool.query(
      `UPDATE etablissements 
       SET intitule = ?, adresse = ?, ville = ?, fax=?, telephone=?
       WHERE id = ?`,
      [intitule, adresse, ville,fax,telephone, id]
    );

    await addLog ( authenticatedUser.id, `modifier du Table Etablissement intitulé ${intitule}`);


    return result;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de etablissement", error);
    throw error;
  }
};
