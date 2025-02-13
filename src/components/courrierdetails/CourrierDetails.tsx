"use client";

import { COURRIER } from "@/types/courrier";
import React from "react";

type CourrierDetailsProps = {
  courrier: COURRIER | null;
};

export default function CourrierDetails({ courrier }: CourrierDetailsProps) {

  // Si le courrier est null ou undefined, afficher un message d'erreur
  if (!courrier) {
    return <p className="text-red-500">Aucune donnée disponible pour ce courrier.</p>;
  }
  console.log("Courrier reçu :", courrier);

  const fichiers = Array.isArray(courrier.fichiers) ? courrier.fichiers : [];
  
  // Afficher les détails du courrier
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Informations du Courrier</h2>
      <div className="space-y-4">
        <div>
          <span className="font-medium">ID : </span>
          <span>{courrier.id}</span>
        </div>
        <div>
          <span className="font-medium">Expéditeur : </span>
          <span>{courrier.expediteur}</span>
        </div>
        <div>
          <span className="font-medium">Destination : </span>
          <span>{courrier.destination}</span>
        </div>
        <div>
          <span className="font-medium">Objet : </span>
          <span>{courrier.objet}</span>
        </div>
        <div>
          <span className="font-medium">Traité par : </span>
          <span>{courrier.traite_par}</span>
        </div>
        <div>
          <span className="font-medium">État : </span>
          <span>{courrier.statut}</span>
        </div>
        <div>
          <span className="font-medium">Date de création : </span>
          <span>{new Date(courrier.date_creation).toLocaleDateString()}</span>
        </div>
        <div>
          <span className="font-medium">Date de suppression : </span>
          <span>
            {courrier.date_suppression
              ? new Date(courrier.date_suppression).toLocaleDateString()
              : "Non supprimé"}
          </span>
        </div>

          {/* Affichage des fichiers joints */}
        <div>

          
  <span className="font-medium">Fichiers joints : </span>
  

  { fichiers.length > 0 ? ( 
    <table className="w-full">
      
      <tbody>
                {fichiers.map((file, index) => (
                  <React.Fragment key={index}>
                    <tr className="border-b border-gray-300 dark:border-gray-700">
                      <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">
                        Fichier {index + 1} :
                      </td>
                      <td className="px-4 py-3">
                        {file.fichier ? (
                          <a
                            href={`/api/telechargerfichierdetails?file=${encodeURIComponent(
                              file.fichier
                            )}`}
                            download
                            className="text-blue-500 hover:underline"
                          >
                            {file.fichier}
                          </a>
                        ) : (
                          <span className="text-gray-500">Aucun fichier</span>
                        )}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300 dark:border-gray-700">
                      <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">
                        Type de Courrier :
                      </td>
                      <td className="px-4 py-3 text-gray-900 dark:text-white">
                        {file.type_courrier}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300 dark:border-gray-700">
                      <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">
                        Type de Support :
                      </td>
                      <td className="px-4 py-3 text-gray-900 dark:text-white">
                        {file.type_support}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          ) : (
            <span className="text-gray-500">Aucun fichier joint</span>
          )}
        </div>
      </div>
    </div>
  );
}