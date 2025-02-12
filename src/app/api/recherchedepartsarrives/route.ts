import { NextRequest, NextResponse } from "next/server";
import { getCourriers } from "../../../../lib/queries/recherchetous"; // Assure-toi que le chemin est correct

export async function GET(req: NextRequest) {
  try {
    // Récupération des paramètres de la requête
    const { searchParams } = new URL(req.url);
    
    const type = searchParams.get("type");
    const date_creation = searchParams.get("date_creation") || undefined;
    const objet = searchParams.get("objet") || undefined;
    const etablissement = searchParams.get("etablissement") || undefined;

    // Vérification du paramètre obligatoire "type"
    if (!type) {
      return NextResponse.json({ error: "Le paramètre 'type' est requis" }, { status: 400 });
    }

    // Appel à la fonction getCourriers avec les filtres fournis
    const courriers = await getCourriers({ type, date_creation, objet, etablissement });

    return NextResponse.json({ data: courriers }, { status: 200 });
  } catch (error) {
    console.error("Erreur API /api/courriers :", error);
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}
