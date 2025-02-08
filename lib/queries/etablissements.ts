import pool from '../db';

export const fetchEtablissements = async () => {
  const [etablissements] = await pool.query(`
  SELECT * FROM etablissements ORDER BY  id ASC `);
  return etablissements;
};

export const fetchEtablissementsById = async (id: number) => {
  const [etablissements] = await pool.query('SELECT * FROM etablissements where id=?', [id]);
  return etablissements;
};

export const addEtablissement = async (intitule: string, adresse: string, ville: string, fax: number, telephone: number) => {
  const [users] = await pool.query(
    "INSERT INTO users (intitule, adresse, ville, fax, telephone) VALUES (?,?, ?, ?, ?,  NOW())",
    [intitule, adresse, ville, fax, telephone]
  );
  return users;
};