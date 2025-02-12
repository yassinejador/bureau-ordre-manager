import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { getFSEtablissementsId } from "../../../../lib/queries/etablissements";
import { addCourriers } from "../../../../lib/queries/courriers";

export const dynamic = "force-dynamic";
export const preferredRegion = ["auto", "global"];

interface CourrierData {
  expediteur: string;
  destination: string;
  traite_par: string;
  objet: string;
  etat_id: string;
  date_creation: string;
  type: string;
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
    const fichiers = formData.getAll("fichier") as File[];

    let destination = formData.get("destination") as string;
    const type = formData.get("type") as string;

    if (type === "Arrivé") {
      const fsId = await getFSEtablissementsId();
      if (fsId) {
        destination = fsId.toString(); 
      }
    }

    const courrierData: CourrierData = {
      expediteur: formData.get("expediteur") as string,
      destination, 
      traite_par: formData.get("traite_par") as string,
      objet: formData.get("objet") as string,
      etat_id: formData.get("etat_id") as string,
      date_creation: formData.get("date_creation") as string,
      type,
      type_courrier: formData.get("type_courrier") as string,
      type_support: formData.get("type_support") as string,
    };

    const fichierNames = await Promise.all(
      fichiers.map(async (fichier, index) => {
        const bytes = await fichier.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const sanitizedObjet = courrierData.objet
          .replace(/[^a-z0-9]/gi, "_")
          .toLowerCase()
          .substring(0, 20); 

        const extension = path.extname(fichier.name);
        const fileName = `${sanitizedObjet}-${Date.now()}-${index}${extension}`;

        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);

        return fileName;
      }),
    );

    await addCourriers(
      courrierData.expediteur,
      courrierData.destination, 
      courrierData.traite_par,
      courrierData.objet,
      courrierData.etat_id,
      courrierData.date_creation,
      courrierData.type,
      courrierData.type_courrier,
      courrierData.type_support,
      fichierNames,
    );

    return NextResponse.json(
      { message: "Courrier et fichiers ajoutés avec succès" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Erreur lors du traitement:", error);
    return NextResponse.json(
      { error: "Erreur lors du traitement de la requête" },
      { status: 500 },
    );
  }
}
