import { NextRequest, NextResponse } from "next/server";
import { createUser } from "../../../../../lib/utilisaturs/nouveau";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nom, prenom, roleId, etablissementId, serviceId } = body;

    const newUser = await createUser(nom, prenom, roleId, etablissementId, serviceId);

    return NextResponse.json({ message: "Utilisateur créé avec succès", email: newUser.email, rawPassword: newUser.rawPassword }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
