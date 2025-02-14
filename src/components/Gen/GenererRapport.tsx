"use client";
import React, { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { AiOutlineFileText } from "react-icons/ai";

interface GenererRapportProps {
  totalUsers: number;
  totalEtablissements: number;
  courriersDepartCount: number;
  courriersAriveesCount: number;
}

const GenererRapport: React.FC<GenererRapportProps> = ({
  totalUsers,
  totalEtablissements,
  courriersDepartCount,
  courriersAriveesCount,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = (error) => reject(error);
    });
  };

  const handleGenerateReport = async () => {
    try {
      setIsGenerating(true);
      const doc = new jsPDF();

      const [logoUcd, logoFs] = await Promise.all([
        loadImage(`${window.location.origin}/images/logo/logo_ucd.png`),
        loadImage(`${window.location.origin}/images/logo/logo_fs_ucd.jpg`),
      ]);

      const headerHeight = 25;
      const logoScale = 0.06;
      const margin = 5;

      doc.setFillColor(36, 48, 63);
      doc.rect(0, 0, doc.internal.pageSize.getWidth(), headerHeight, "F");

      const ucdWidth = logoUcd.width * 0.06;
      const ucdHeight = logoUcd.height * 0.06;
      doc.addImage(logoUcd, "PNG", 5, 2, ucdWidth, ucdHeight);

      const fsWidth = logoFs.width * 0.11;
      const fsHeight = logoFs.height * 0.11;
      const fsX = doc.internal.pageSize.getWidth() - fsWidth - 5;
      doc.addImage(logoFs, "JPEG", fsX, 2, fsWidth, fsHeight);

      doc.setFontSize(18);
      doc.setTextColor(255, 255, 255);
      doc.text(
        "Rapport des Statistiques",
        doc.internal.pageSize.getWidth() / 2,
        15,
        { align: "center" },
      );

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.text(
        `Date: ${new Date().toLocaleDateString("fr-FR")}`,
        margin * 4,
        35,
      );

      const statsItems = [
        { titre: "Utilisateurs", nombre: totalUsers },
        { titre: "Établissements", nombre: totalEtablissements },
        { titre: "Courriers Entrants", nombre: courriersAriveesCount },
        { titre: "Courriers Sortants", nombre: courriersDepartCount },
      ];

      doc.setFontSize(12);
      let yPosition = 50;
      doc.text("Détails des statistiques :", margin * 4, yPosition);

      yPosition += 10;
      statsItems.forEach((item, index) => {
        doc.setFillColor(index % 2 === 0 ? 245 : 255);
        doc.rect(margin * 4, yPosition, 160, 10, "F");
        doc.text(item.titre, margin * 4 + 5, yPosition + 7);
        doc.text(item.nombre.toString(), margin * 4 + 145, yPosition + 7, {
          align: "right",
        });
        yPosition += 15;
      });

      const captureChart = async (elementId: string) => {
        const element = document.getElementById(elementId);
        if (!element) throw new Error("Élément introuvable");
        const canvas = await html2canvas(element, { scale: 2 });
        return canvas.toDataURL("image/png");
      };

      const chart1Img = await captureChart("chartOne");
      doc.addImage(chart1Img, "PNG", margin * 4, yPosition + 20, 170, 90);

      doc.addPage();
      const chart2Img = await captureChart("chartTwo");
      doc.addImage(chart2Img, "PNG", margin * 4, 20, 170, 130);

      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text(
          `Page ${i}/${totalPages}`,
          doc.internal.pageSize.getWidth() / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: "center" },
        );
      }

      doc.save("rapport-statistiques.pdf");
    } catch (error) {
      console.error("Erreur de génération:", error);
      alert(
        `Erreur: ${error instanceof Error ? error.message : "Problème inconnu"}`,
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-1">
      <button
        onClick={handleGenerateReport}
        disabled={isGenerating}
        className="mb-4 flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
      >
        <AiOutlineFileText className="animate-pulse" size={20} />
        {isGenerating ? (
          <span className="flex items-center gap-2">
            <span className="loading loading-dots loading-sm"></span>
            Génération en cours...
          </span>
        ) : (
          "Générer le Rapport"
        )}
      </button>
    </div>
  );
};

export default GenererRapport;
