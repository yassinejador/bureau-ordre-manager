import pool from '../db';

export const fetchRoles = async () => {
    const [roles] = await pool.query('SELECT * FROM roles');
    return roles;
};

export const fetchRolesById = async (id: number) => {
    const [roles] = await pool.query('SELECT * FROM roles where id=?', id);
    return roles;
};

export const addRole = async (role: number) => {
    const [roleAdded] = await pool.query("INSERT INTO roles(id, role, date_creation) value(?,?,NOW())", [null, role]);
    return roleAdded;
};
