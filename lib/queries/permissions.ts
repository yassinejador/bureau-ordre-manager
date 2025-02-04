import pool from '../db';

export const fetchPermissions = async () => {
    const [permissions] = await pool.query('SELECT * FROM permissions;');
    return permissions;
};

export const fetchPermissionsByRole = async (role_id:number) => {
    const [roles] = await pool.query('SELECT pd.id, p.nom, role_id, pd.hasPermission FROM permissiondetails pd INNER JOIN permissions p on p.id = pd.permission_id where role_id = ?;',role_id);
    return roles;
};

export const modifierPermissionDetails = async (idPermissionDetails: number, hasPermission: boolean) => {
    const [permissionAdded] = await pool.query("update permissiondetails set hasPermission = ? where id = ?;", [hasPermission, idPermissionDetails]);
    return permissionAdded;
};

export const addPermission = async (nomPermission: number) => {
    const [permissionAdded] = await pool.query("INSERT INTO permissions(id, nom) values(?,?);", [null, nomPermission]);
    return permissionAdded;
};
