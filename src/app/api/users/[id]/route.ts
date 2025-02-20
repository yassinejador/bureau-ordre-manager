import { NextResponse } from "next/server";
import { fetchUsersByIdWithRole } from "../../../../../lib/queries/users";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/")[3]; 

    if (id && !isNaN(Number(id))) {
      const userId = parseInt(id, 10);
      const user = await fetchUsersByIdWithRole(userId);

      if (!user || user.length === 0) {
        return NextResponse.json(
          { error: "Utilisateur non trouvé" },
          { status: 404 },
        );
      }

      return NextResponse.json({ user });
    }

    return NextResponse.json(
      { error: "ID invalide ou manquant" },
      { status: 400 },
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Échec de la récupération de l'utilisateur" },
      { status: 500 },
    );
  }
}
