import pool from '../db';

// les requêtes des services
export const fetchServices = async () => {
  const [services] = await pool.query('SELECT * FROM services ORDER BY  id DESC, date_creation DESC');
  return services;
};

export const fetchServicesById = async (id: number) => {
  const [services] = await pool.query('SELECT * FROM services where id=?', id);
  return services;
};

export const addService= async (nomService: string) => {
  const [service] = await pool.query("INSERT INTO services(id, nom, date_creation) value(?,?,NOW())", [null, nomService]);
  return service;
}
