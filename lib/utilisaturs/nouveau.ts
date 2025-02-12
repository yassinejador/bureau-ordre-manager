import bcrypt from "bcryptjs";
import pool from "./../db";
import { addLog } from "../queries/logs";
import { ResultSetHeader } from "mysql2";
import { getAuthenticatedUser } from "../auth";
import { NextApiRequest } from "next";

export async function createUser(
  nom: string,
  prenom: string,
  roleId: number,
  etablissementId: number,
  serviceId: number,
  req: NextApiRequest
) {

  if (!nom || !prenom || !roleId || !etablissementId || !serviceId) {
    throw new Error("Tous les champs sont obligatoires");
  }

  try {
    // 🔥 Récupérer l'utilisateur connecté
    const authenticatedUser = await getAuthenticatedUser();
    if (!authenticatedUser) {
      throw new Error("Utilisateur non authentifié");
    }

    console.log("🔍 ID utilisateur connecté :", authenticatedUser.id);
    
    const nomLower = nom.toLowerCase();
    const prenomLower = prenom.toLowerCase();
    let baseEmail = `${nomLower}.${prenomLower}@fs.ucd.ac.ma`;
    let email = baseEmail;
    let count = 1;

    const [existingUsers] = await pool.query(
      "SELECT email FROM users WHERE email LIKE ?",
      [`${nomLower}.${prenomLower}%`],
    );
    const emails = (existingUsers as any[]).map((user) =>
      user.email.toLowerCase(),
    );

    while (emails.includes(email)) {
      email = `${nomLower}.${prenomLower}${count}@fs.ucd.ac.ma`;
      count++;
    }

    const rawPassword = `${nom}@${prenom}`;
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    
     await pool.query(
      "INSERT INTO users (nom, prenom, email, password, role_id, etablissement_id, service_id, date_creation) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())",
      [nom, prenom, email, hashedPassword, roleId, etablissementId, serviceId],
    );
   

    await addLog ( authenticatedUser.id, `ajouter utilisateur ${nom} ${prenom}`);

    return { email, rawPassword };
  } catch (error: any) {
    console.error(
      "Erreur lors de la création de l'utilisateur :",
      error.message,
    );
    throw new Error("Erreur interne du serveur");
  }
}
