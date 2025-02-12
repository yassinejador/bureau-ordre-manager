import jsPDF from "jspdf";

export async function generatePDF(user: { id: number; nom: string; email: string; role: string; etablissement: string; service: string }) {
  const doc = new jsPDF();
  doc.text("Informations de l'utilisateur", 10, 10);
  doc.text(`Nom: ${user.nom}`, 10, 20);
  doc.text(`Email: ${user.email}`, 10, 30);
  doc.text(`Rôle: ${user.role}`, 10, 40);
  doc.text(`Établissement: ${user.etablissement}`, 10, 50);
  doc.text(`Service: ${user.service}`, 10, 60);

  const fileName = `user_${user.id}.pdf`;
  const pdfBlob = doc.output("blob");
  return new File([pdfBlob], fileName, { type: "application/pdf" });
}
