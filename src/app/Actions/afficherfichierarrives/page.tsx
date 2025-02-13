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
          className="fill-current"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
            fill=""
          />
          <path
            d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
            fill=""
          />
        </svg>
      </button>
    </div>
  );
};

export default ListFichiers;