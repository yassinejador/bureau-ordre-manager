import jsPDF from "jspdf";

export async function generatePDF(etablissement: { id: number;
  intitule: string;
  adresse: string;
  ville: string;
  fax: number;
  telephone: number }) {
  const doc = new jsPDF();
  doc.text("Informations de l'etablissement", 10, 10);
  doc.text(`Nom: ${etablissement.intitule}`, 10, 20);
  doc.text(`Adresse: ${etablissement.adresse}`, 10, 30);
  doc.text(`Ville: ${etablissement.ville}`, 10, 40);
  doc.text(`Fax: ${etablissement.fax}`, 10, 50);
  doc.text(`Telephone: ${etablissement.telephone}`, 10, 60);

  const fileName = `etablissement_${etablissement.id}.pdf`;
  const pdfBlob = doc.output("blob");
  return new File([pdfBlob], fileName, { type: "application/pdf" });
}
