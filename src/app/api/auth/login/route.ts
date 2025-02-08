import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { authenticateUser } from "../../../../../lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe requis" },
        { status: 400 },
      );
    }

    const auth = await authenticateUser(email, password);
    if (!auth) {
      return NextResponse.json(
        { error: "Identifiants invalides" },
        { status: 401 },
      );
    }

    // Stocker le token dans un cookie HttpOnly sécurisé
    cookies().set("auth_token", auth.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400, // 24 heures
    });

    // 🚀 Ajouter le token dans la réponse JSON
    return NextResponse.json({
      id: auth.id,
      email: auth.email,
      token: auth.token, // Ajouter le token ici
    });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
