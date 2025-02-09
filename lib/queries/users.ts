import pool from '../db';


export const fetchUsers = async () => {
  const [users] = await pool.query(`
  SELECT 
  users.id, 
  CONCAT(users.prenom, ' ', users.nom) AS nom, 
  users.email, 
  roles.role AS role,
  services.nom AS service, 
  etablissements.intitule AS etablissement
FROM users
LEFT JOIN roles ON users.role_id = roles.id
LEFT JOIN services ON users.service_id = services.id
LEFT JOIN etablissements ON users.etablissement_id = etablissements.id
WHERE users.archived = FALSE;

  `);
  return users;
};

export const fetchUsersById = async (id: number) => {
  const [users] = await pool.query('SELECT * FROM users where id=?', [id]);
  return users;
};

export const addUser = async (prenom: string, nom: string, email: string, password: string, idEtablissement: number, idService: number, idRole: number) => {
  const [users] = await pool.query(
    "INSERT INTO users (prenom, nom, email, password, id_etablissement, id_service, id_role, date_creation) VALUES (?,?, ?, ?, ?, ?, ?, NOW())",
    [prenom, nom, email, password, idEtablissement, idService, idRole]
  );
  return users;
};



