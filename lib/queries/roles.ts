import { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '../db';

export const fetchRoles = async () => {
    const [roles] = await pool.query('SELECT * FROM roles order by id DESC');
    return roles;
};

export const fetchRolesById = async (id: number) => {
    const [roles] = await pool.query('SELECT * FROM roles where id=?', id);
    return roles;
};

export const addRole = async (role: number) => {
    const [roleAdded]: [ResultSetHeader, any] = await pool.query("INSERT INTO roles(id, role, date_creation) value(?,?,NOW())", [null, role]);
    const [permissionsIds]: [RowDataPacket[], any] = await pool.query("SELECT id FROM permissions");
    for (let i = 0; i < permissionsIds.length; i++) {
        await pool.query(
            "INSERT INTO permissionDetails (role_id, permission_id, hasPermission) VALUES(?,?,?)",
            [roleAdded.insertId, permissionsIds[i].id, 0]
        );
        
    }
    return roleAdded;
};
