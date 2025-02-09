import * as XLSX from "xlsx";

export async function generateExcel(etablissement: { id: number;
  intitule: string;
  adresse: string;
  ville: string;
  fax: number;
  telephone: number }) {
  // Création d'un tableau d'objets JSON (doit être un tableau)
  const data = [
    {
      "ID": etablissement.id,
      "Intitule": etablissement.intitule,
      "Adresse": etablissement.adresse,
      "Ville": etablissement.ville,
      "Fax": etablissement.fax,
      "Telephone": etablissement.telephone
    }
  ];

  // Génération de la feuille de calcul à partir des données JSON
  const ws = XLSX.utils.json_to_sheet(data);
  
  // Création du fichier Excel
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Etablissement");

  // Génération du fichier Excel sous forme de Blob
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  // Création du fichier téléchargeable
  const fileName = `etablissement_${etablissement.id}.xlsx`;
  return new File([new Uint8Array(excelBuffer)], fileName, { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
}
