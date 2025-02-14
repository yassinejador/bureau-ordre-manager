import { getAuthenticatedUser } from '../auth';
import pool from '../db';
import { addLog } from '../queries/logs';

// Archiver un utilisateur
export const archiveUser = async (id: number) => {
  try {

    const [result] = await pool.query('UPDATE users SET archived = TRUE WHERE id = ?', [id]);
    
    
    return result;
  } 
  catch (error) {
    console.error('Error archiving user:', error);
    throw error;
  }
};

