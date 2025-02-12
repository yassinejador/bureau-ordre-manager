import pool from '../db';

export const updateUser = async (
  id: number,
  nom: string,
  prenom: string,
  email: string
) => {
  try {
    console.log("Mise à jour dans la base de données :", { id, nom, prenom, email });

    const [result] = await pool.query(
      `UPDATE users 
       SET nom = ?, prenom = ?, email = ?
       WHERE id = ?`,
      [nom, prenom, email, id]
    );
    return result;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur", error);
    throw error;
  }
};
