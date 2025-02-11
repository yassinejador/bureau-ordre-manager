import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { addCourriers } from "../../../../lib/queries/courriers-arrives";

export const dynamic = 'force-dynamic';
export const preferredRegion = ['auto', 'global'];

interface CourrierData {
  expediteur: string;
  destination: string;
  traite_par: string;
  objet: string;
  etat_id: string;
  date_creation: string;
  type_courrier: string;
  type_support: string;
}

export async function POST(req: NextRequest) {
  try {
    const uploadDir = path.join(process.cwd(), "uploads");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const formData = await req.formData();
    const fichiers = formData.getAll('fichier') as File[];
    
    const courrierData: CourrierData = {
      expediteur: formData.get('expediteur') as string,
      destination: formData.get('destination') as string,
      traite_par: formData.get('traite_par') as string,
      objet: formData.get('objet') as string,
      etat_id: formData.get('etat_id') as string,
      date_creation: formData.get('date_creation') as string,
      type_courrier: formData.get('type_courrier') as string,
      type_support: formData.get('type_support') as string,
    };

    const fichierNames = await Promise.all(
      fichiers.map(async (fichier, index) => {
        const bytes = await fichier.arrayBuffer();
        const buffer = Buffer.from(bytes);
    
        // Générer un nom de fichier unique
        const sanitizedObjet = courrierData.objet
          .replace(/[^a-z0-9]/gi, '_')
          .toLowerCase()
          .substring(0, 20); // Limiter la longueur
    
        const extension = path.extname(fichier.name);
        const fileName = `${sanitizedObjet}-${Date.now()}-${index}${extension}`;
        
        // Chemin complet pour le stockage
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);
    
        // Retourner uniquement le nom du fichier pour la BDD
        return fileName;
      })
    );


    await addCourriers(
      courrierData.expediteur,
      courrierData.destination,
      courrierData.traite_par,
      courrierData.objet,
      courrierData.etat_id,
      courrierData.date_creation,
      courrierData.type_courrier,
      courrierData.type_support,
      fichierNames
    );

    // 6. Retourner la réponse
    return NextResponse.json(
      { message: "Courrier et fichiers ajoutés avec succès" },
      { status: 201 }
    );

  } catch (error) {
    console.error("Erreur lors du traitement:", error);
    return NextResponse.json(
      { error: "Erreur lors du traitement de la requête" },
      { status: 500 }
    );
  }
}