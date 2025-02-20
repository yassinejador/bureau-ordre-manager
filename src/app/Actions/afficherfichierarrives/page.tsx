"use client";

import { useState, useEffect } from "react";
import { COURRIER } from "@/types/courrier";

const ListFichiers = ({ courrier, onNoFiles }: { courrier: COURRIER, onNoFiles: (id: number) => void }) => {
  const [files, setFiles] = useState<string[]>([]);

  const loadFiles = async (id: number) => {
    try {
      const response = await fetch(`/api/courriersAvecFichiers/${id}`);
      const data = await response.json();

      // Vérification du chemin vide ou des fichiers
      if (data && data.courrier && data.courrier.fichiers) {
        const fichiers = data.courrier.fichiers.trim();  // Retirer les espaces inutiles

        if (fichiers === "") {
          // Chemin vide, aucun fichier associé
          setFiles([]);
        } else {
          const fileUrls = fichiers.split(",").map((fileName: string) =>` /api/uploads?file=${fileName}`);
          setFiles(fileUrls);
        }
      } else {
        // Aucun fichier trouvé
        setFiles([]);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des fichiers", error);
      setFiles([]); // En cas d'erreur, vider les fichiers
    }
  };

  useEffect(() => {
    if (courrier.id) {
      loadFiles(courrier.id);
    }
  }, [courrier.id]);

  const handleClick = () => {
    if (files.length > 0) {
      // Ouvrir les fichiers
      files.forEach((fileUrl) => window.open(fileUrl, "_blank"));
    } else {
      // Si aucun fichier n'est disponible ou si le chemin est vide
      onNoFiles(courrier.id); // Notifier l'absence de fichiers lorsqu'on clique sur le bouton
    }
  };

  return (
    <div>
      {/* Le bouton est toujours présent */}
      <button 
        className="hover:text-primary" 
        onClick={handleClick}
      >
        {/* Icône de fichier */}
        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon-details"
                        >
           <path d="M6 2h9l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                          <path d="M14 2v6h6" />
                          <line x1="9" y1="12" x2="15" y2="12" />
                          <line x1="9" y1="16" x2="15" y2="16" />
        </svg>
      </button>
    </div>
  );
};

export default ListFichiers;