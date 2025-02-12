"use client";
import { useState, useEffect } from "react";
import { COURRIER } from "@/types/courrier";
import JSZip from "jszip"; // Importer JSZip
import { saveAs } from "file-saver"; // Importer saveAs de file-saver

const DowloadFichiers = ({ courrier, onNoFiles }: { courrier: COURRIER,  onNoFiles: (id: number) => void }) => {
  const [files, setFiles] = useState<string[]>([]);

  const loadFiles = async (id: number) => {
    try {
      const response = await fetch(`/api/courriersAvecFichiersdepart/${id}`);
      const data = await response.json();

      if (data && data.courrier && data.courrier.fichiers) {
        const fichiers = data.courrier.fichiers.trim();  // Supprimer les espaces inutiles

        if (fichiers === "" || fichiers === "null" || fichiers === "undefined") {
          // Si le chemin est vide, null ou undefined, aucun fichier n'est disponible
          setFiles([]);
        } else {
          const fileUrls = fichiers.split(",").map((fileName: string) => `/api/uploads?file=${fileName.trim()}`);
          setFiles(fileUrls);
        }
      } else {
        // Aucun fichier trouvé
        setFiles([]);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des fichiers", error);
      setFiles([]);
    }
  };

  useEffect(() => {
    if (courrier.id) {
      loadFiles(courrier.id);
    }
  }, [courrier.id]);

  const handleClick = async () => {
    if (files.length > 0) {
      const zip = new JSZip();
  
      try {
        const downloadPromises = files.map(async (fileUrl) => {
          const response = await fetch(fileUrl);
          if (!response.ok) throw new Error(`Erreur sur ${fileUrl}`);
          const blob = await response.blob();
          const fileName = fileUrl.split("file=")[1];
          if (blob.size > 0) zip.file(fileName, blob);
        });
  
        await Promise.all(downloadPromises); // Attendre tous les téléchargements
  
        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, `courrier_${courrier.id}_fichiers.zip`);
        console.log("Fichier ZIP téléchargé avec succès.");
      } catch (error) {
        console.error("Erreur lors du téléchargement des fichiers", error);
      }
    } else {
      onNoFiles(courrier.id);
    }
  };
  

  return (
    <div>
      <button 
        className="hover:text-primary" 
        onClick={handleClick}
      >
        {/* Icône de téléchargement */}
        <svg
          className="fill-current"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
            fill=""
          />
          <path
            d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
            fill=""
          />
        </svg>
      </button>
    </div>
  );
};

export default DowloadFichiers;