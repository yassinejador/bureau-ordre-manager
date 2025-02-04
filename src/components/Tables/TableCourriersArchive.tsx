"use client";
import { FICHE } from "@/types/fiche";
import { COURRIER } from "@/types/courrier";
import React, { useState, useEffect } from "react";
import Link from "next/link";



const TableCourriersArchive: React.FC = () => {

  
    const courriers: COURRIER[] = [
      {
        courrier_id: 1,
        date_creation: "15 dev 2025",
        expediteur: "ENCG",
        traite_par: "Ahmed",
        objet: "hh",
        etat_id: "Départ",
        destination: "Ensa",
        date_suppression: "",
        actions: "",
        fichier:[ 
      { id: 1, type_courrier: "PDF", type_support: "Document", fichier: "Document1.pdf", courrier_id: 1 },
      { id: 2, type_courrier: "Image", type_support: "Image", fichier: "Image1.jpg", courrier_id: 1 }
   ],
      },
      {
          courrier_id: 2,
          date_creation: "Jan 13 2023",
          expediteur: "ENCG",
          objet: "bdjd",
          etat_id: " Arrivé",
          destination: "Ensa",
          date_suppression: "",
          actions: "",
          traite_par: "",
          fichier: [{ id: 1, type_courrier: "PDF", type_support: "Document", fichier: "Document1.pdf", courrier_id: 1 },
          { id: 2, type_courrier: "Image", type_support: "Image", fichier: "Image1.jpg", courrier_id: 1 }
       ],
      },
    ];


  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">Liste des Courriers Archivés</h4>

        
      <div className="flex flex-col">
        {/* Table Header */}
    
        <div className="grid grid-cols-7 sm:grid-cols-7 rounded-sm bg-gray-200 dark:bg-meta-4">
          
                <div className="p-3 text-center font-medium uppercase text-black dark:text-white">ID</div>
                <div className="p-3 text-center font-medium uppercase text-black dark:text-white">Expéditeur</div>
                <div className="p-3 text-center font-medium uppercase text-black dark:text-white">Destinataire</div>
                <div className="p-3 text-center font-medium uppercase text-black dark:text-white">Date d'archivage</div>
                <div className="p-3 text-center font-medium uppercase text-black dark:text-white">Statut</div>
                <div className="p-3 text-center font-medium uppercase text-black dark:text-white">Fichiers Joints</div>
                <div className="p-3 text-center font-medium uppercase text-black dark:text-white">Details</div>
              </div>
            {/* Table Rows */}
              {courriers.map((courrier) => (
                <div key={courrier.courrier_id}
                className={`grid grid-cols-7 sm:grid-cols-7 items-center border-b border-stroke dark:border-strokedark last:border-b-0`}
                >
                  <div className="p-3 text-center text-black dark:text-white">{courrier.courrier_id}</div>
                  <div className="p-3 text-center text-black dark:text-white">{courrier.expediteur}</div>
                  <div className="p-3 text-center text-black dark:text-white">{courrier.destination}</div>
                  <div className="p-3 text-center text-black dark:text-white">{courrier.date_creation}</div>
                  <div className="p-3 text-center text-black dark:text-white">{courrier.etat_id}</div>
                  
                  <div className="p-3 text-center text-black dark:text-white">
                    {courrier.fichier.length > 0 ? (
                      <ul>
                        {courrier.fichier.map((file, index) => (
                          <li key={index}>
                            <a href={file.fichier} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                              {file.fichier}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>Aucun fichier</span>
                    )}
                  </div>
                  <div className="p-3 text-black dark:text-white flex items-center justify-center">
                  <Link href="/couriers/detailsCourrier" className="hover:text-primary">
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
                    </Link>
                    </div>
                </div>
              ))}
            
        </div>
      </div>
   
  );
};

export default TableCourriersArchive;
