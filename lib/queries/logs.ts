import pool from '../db';

export const fetchLogs = async () => {
const [logs]: any = await pool.query(`
SELECT logs.*, users.nom 
FROM logs 
LEFT JOIN users ON logs.user_id = users.id 
ORDER BY logs.date_action DESC

`);
return logs;
};

export const addLog = async (userId: number, description: string) => {
  const [result]: any = await pool.query(
    "INSERT INTO logs (user_id, description) VALUES (?, ?)",
    [userId, description]
  );

  if (result.affectedRows > 0) {
    return { success: true, message: "Log ajouté" };
  } else {
    throw new Error("Échec de l'ajout du log");
  }
};