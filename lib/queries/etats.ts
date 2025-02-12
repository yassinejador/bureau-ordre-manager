import pool from "../db";

export const fetchEtats = async () => {
  const [etats] = await pool.query(`
    SELECT * FROM etats ORDER BY  id ASC `);
  return etats;
};
