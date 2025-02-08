import * as XLSX from "xlsx";

export async function generateExcel(user: { id: number; nom: string; email: string; role: string; etablissement: string; service: string }) {
  // Création d'un tableau d'objets JSON (doit être un tableau)
  const data = [
    {
      "ID": user.id,
      "Nom": user.nom,
      "Email": user.email,
      "Rôle": user.role,
      "Établissement": user.etablissement,
      "Service": user.service
    }
  ];

  // Génération de la feuille de calcul à partir des données JSON
  const ws = XLSX.utils.json_to_sheet(data);
  
  // Création du fichier Excel
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Utilisateur");

  // Génération du fichier Excel sous forme de Blob
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  // Création du fichier téléchargeable
  const fileName = `user_${user.id}.xlsx`;
  return new File([new Uint8Array(excelBuffer)], fileName, { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
}
