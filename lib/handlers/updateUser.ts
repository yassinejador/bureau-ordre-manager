import { getAuthenticatedUser } from '../auth';
import pool from '../db';
import { addLog } from '../queries/logs';

export const updateUser = async (
  id: number,
  nom: string,
  prenom: string,
  email: string
) => {
  try {

    const authenticatedUser = await getAuthenticatedUser();
    if (!authenticatedUser) {
      throw new Error("Utilisateur non authentifié");
    }

    console.log("🔍 ID utilisateur connecté :", authenticatedUser.id);
    
    console.log("Mise à jour dans la base de données :", { id, nom, prenom, email });

    const [result] = await pool.query(
      `UPDATE users 
       SET nom = ?, prenom = ?, email = ?
       WHERE id = ?`,
      [nom, prenom, email, id]
    );

    await addLog ( authenticatedUser.id, `modifier utilisateur ${nom} ${prenom}`);

    return result;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur", error);
    throw error;
  }
};
