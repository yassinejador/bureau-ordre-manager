import { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '../db';

export const fetchPermissions = async () => {
    const [permissions] = await pool.query('SELECT * FROM permissions ORDER By id DESC;');
    return permissions;
};

export const fetchPermissionsByRole = async (role_id: number) => {
    const [roles] = await pool.query('SELECT pd.id, p.nom, role_id, pd.hasPermission FROM permissiondetails pd INNER JOIN permissions p on p.id = pd.permission_id where role_id = ?;', role_id);
    return roles;
};

export const modifierPermissionDetails = async (idPermissionDetails: number, hasPermission: boolean) => {
    const [permissionAdded] = await pool.query("update permissiondetails set hasPermission = ? where id = ?;", [hasPermission, idPermissionDetails]);
    return permissionAdded;
};

export const addPermission = async (nomPermission: number) => {
    const [permissionAdded]: [ResultSetHeader, any] = await pool.query("INSERT INTO permissions(id, nom, date_creation) values(?,?, now());", [null, nomPermission]);
    const [roleIds]: [RowDataPacket[], any] = await pool.query("SELECT id FROM roles");
    for (let i = 0; i < roleIds.length; i++) {
        await pool.query(
            "INSERT INTO permissionDetails (role_id, permission_id, hasPermission) VALUES(?,?,?)",
            [roleIds[i].id, permissionAdded.insertId, roleIds[i].id == 1 ? 1 : 0] // Par défaut, aucun rôle ne dispose de nouvelle permission, à l'exception de la direction.
        );

    }
    return permissionAdded;
};

