import { getAuthenticatedUser } from '../auth';
import pool from '../db';
import { addLog } from '../queries/logs';

// Archiver un utilisateur
export const archiveUser = async (id: number) => {
  try {

    const authenticatedUser = await getAuthenticatedUser();
    if (!authenticatedUser) {
      throw new Error("Utilisateur non authentifié");
    }

    console.log(" ID utilisateur connecté :", authenticatedUser.id);
    

    const [result] = await pool.query('UPDATE users SET archived = TRUE WHERE id = ?', [id]);
    
    await addLog ( authenticatedUser.id, `suprission d'utilisateur avec id : ${id}`);

    
    return result;
  } 
  catch (error) {
    console.error('Error archiving user:', error);
    throw error;
  }
};

// Réactiver un utilisateur
export const reactivateUser = async (id: number) => {
  try {
    const [result] = await pool.query('UPDATE users SET archived = FALSE WHERE id = ?', [id]);
    return result;
  } catch (error) {
    console.error('Error reactivating user:', error);
    throw error;
  }
};

// Récupérer les utilisateurs actifs
export const getActiveUsers = async () => {
  try {
    const [users] = await pool.query('SELECT * FROM users WHERE archived = FALSE');
    return users;
  } catch (error) {
    console.error('Error fetching active users:', error);
    throw error;
  }
};