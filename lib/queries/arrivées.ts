import pool from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2'; // Importer le type ResultSetHeader


export const fetchCourriers = async () => {
    const [courriers] = await pool.query(`
        SELECT 
            c.id, 
            c.date_creation, 
            exp.intitule AS expediteur, 
            dest.intitule AS destination, 
            c.objet, 
            et.etat AS statut
        FROM courriers c
        JOIN etablissements dest ON c.destination = dest.id
        JOIN etablissements exp ON c.expediteur = exp.id
        JOIN etats et ON c.etat_id = et.id
        WHERE dest.intitule = 'FS' AND c.date_suppression IS NULL
    `);
    return courriers;
};








export const deleteCourrier = async (id: number): Promise<ResultSetHeader> => {
    // Effectuer la requête pour marquer le courrier comme supprimé (en mettant la date_suppression)
    const [result] = await pool.query<ResultSetHeader>(`
        UPDATE courriers
        SET date_suppression = NOW()
        WHERE id = ? AND destination = (SELECT id FROM etablissements WHERE intitule = 'FS'  LIMIT 1) AND date_suppression IS NULL
    `, [id]);

    // Retourner le résultat de la requête
    return result; // Type de retour : ResultSetHeader
};


export const fetchCourriersAvecFichiersById = async (id: number) => {
    const [rows] = await pool.query<RowDataPacket[]>(`
        SELECT 
            c.id, 
            c.date_creation, 
            exp.intitule AS expediteur, 
            dest.intitule AS destination, 
            c.objet, 
            et.etat AS statut,
            GROUP_CONCAT(COALESCE(f.fichier, '') SEPARATOR ',') AS fichiers,
            GROUP_CONCAT(COALESCE(f.type_courrier, '') SEPARATOR ',') AS types_courrier,
           GROUP_CONCAT(COALESCE(f.type_support, '') SEPARATOR ',') AS type_support  
        FROM 
            courriers c
        JOIN 
            etablissements exp ON c.expediteur = exp.id
        JOIN 
            etablissements dest ON c.destination = dest.id
        JOIN 
            etats et ON c.etat_id = et.id
        LEFT JOIN 
            fichiers f ON c.id = f.courrier_id
        WHERE 
            c.id = ? 
            AND dest.intitule = 'FS' 
            AND c.date_suppression IS NULL
        GROUP BY 
            c.id;
    `, [id]);

    return rows.length > 0 ? rows[0] : null; // Vérifie si le tableau contient des données
};
