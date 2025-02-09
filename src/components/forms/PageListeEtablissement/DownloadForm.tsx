"use client";

import { useState } from "react";
import { generatePDF } from "@/components/utils/PageEtablissement/generatePDF";
import { generateExcel } from "@/components/utils/PageEtablissement/generateExcel";
import { downloadFile } from "@/components/utils/downloadUtils";

type DownloadFormProps = {
  etablissement: { id: number;
  intitule: string;
  adresse: string;
  ville: string;
  fax: number;
  telephone: number; };
  onClose: () => void;
};

export default function DownloadForm(props: DownloadFormProps) {
  const { etablissement, onClose } = props;
  const [loading, setLoading] = useState(false);

  const handleDownload = async (format: "pdf" | "excel") => {
    setLoading(true);
    try {
      const file = format === "pdf" ? await generatePDF(etablissement) : await generateExcel(etablissement);
      downloadFile(file);
    } catch (error) {
      console.error("Erreur lors du téléchargement :", error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Télécharger les informations</h2>
        <div className="flex space-x-4">
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => handleDownload("pdf")}
            disabled={loading}
          >
            {loading ? "Téléchargement..." : "PDF"}
          </button>
          <button
            className="bg-green-500 text-white px-3 py-1 rounded"
            onClick={() => handleDownload("excel")}
            disabled={loading}
          >
            {loading ? "Téléchargement..." : "Excel"}
          </button>
        </div>
        <button className="mt-4 text-gray-500" onClick={onClose}>Annuler</button>
      </div>
    </div>
  );
}
