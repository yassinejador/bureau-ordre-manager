import { NextRequest, NextResponse } from "next/server";
import path from "path";

import { readFile, stat } from "fs/promises";

export async function GET(req: NextRequest) {
  const file = req.nextUrl.searchParams.get("file"); // 🔥 Plus simple !


  if (!file) {
    return NextResponse.json({ error: "Paramètre 'file' manquant" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "uploads", file);

  try {
    await stat(filePath); // Vérifie si le fichier existe
    const fileBuffer = await readFile(filePath); // Lit le fichier 
    const ext = path.extname(file).toLowerCase();

    // Définition du type MIME correct
    let contentType = "application/octet-stream";
    let contentDisposition = `attachment; filename="${file}"`; // Par défaut, téléchargement

    switch (ext) {
      case ".pdf":
        contentType = "application/pdf";
        contentDisposition = `inline; filename="${file}"`; // Affichage direct
        break;
      case ".jpg":
      case ".jpeg":
        contentType = "image/jpeg";
        contentDisposition = `inline; filename="${file}"`; // Affichage direct
        break;
      case ".png":
        contentType = "image/png";
        contentDisposition = `inline; filename="${file}"`; // Affichage direct
        break;
     
      case ".docx":
        contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        contentDisposition = `inline; filename="${file}"`; // Affichage direct pour les documents compatibles
        break;
    }

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": contentDisposition,
      },
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Fichier non trouvé" }, { status: 404 });
  }
}
