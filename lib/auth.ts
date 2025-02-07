import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import pool from "./db";
import { cookies } from "next/headers";

interface User {
  id: number;
  email: string;
  password: string;
  role: string;
}

interface AuthResponse {
  id: number;
  email: string;
  token: string;
}

interface JwtPayload {
  id: number;
  email: string;
}

export const generateToken = (user: User): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not defined");

  return jwt.sign({ id: user.id, email: user.email }, secret, {
    expiresIn: "24h",
  });
};

export const verifyToken = (token: string): JwtPayload => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not defined");

  return jwt.verify(token, secret) as JwtPayload;
};

export const verifyPassword = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const hashPassword = async (plainPassword: string): Promise<string> => {
  return await bcrypt.hash(plainPassword, 10);
};

export const authenticateUser = async (
  email: string,
  password: string,
): Promise<AuthResponse | null> => {
  const [users] = await pool.execute<User[]>(
    "SELECT * FROM users WHERE email = ?",
    [email],
  );

  if (users.length === 0) return null;

  const user = users[0];
  const isPasswordValid = await verifyPassword(password, user.password);

  if (!isPasswordValid) return null;

  return {
    id: user.id,
    email: user.email,
    token: generateToken(user),
  };
};

export const getAuthenticatedUser = async () => {
  try {
    const token = cookies().get("auth_token")?.value;
    if (!token) return null;

    const decoded = verifyToken(token);

    const [users] = await pool.execute(
      `SELECT users.id, users.email, users.nom, users.prenom, roles.role 
       FROM users 
       JOIN roles ON users.role_id = roles.id 
       WHERE users.id = ?`,
      [decoded.id],
    );

    if (users.length === 0) return null;
    return users[0];
  } catch (error) {
    console.error("Erreur récupération utilisateur :", error);
    return null;
  }
};
