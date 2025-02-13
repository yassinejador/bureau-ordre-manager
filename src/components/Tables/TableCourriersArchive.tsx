"use client";
import Link from 'next/link';
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { COURRIER } from "@/types/courrier"; // Importez vos types
import {FICHE } from  "@/types/fiche";

type TableCourrierArchiveProps = {
  courriers: COURRIER[];
  setCourriers?: (courriers: COURRIER[]) => void;
};

const TableCourriersArchive = ({ courriers, setCourriers }: TableCourrierArchiveProps) => {
  const [selectedCourrier, setSelectedCourrier] = useState<COURRIER | null>(null);
  const [editingCourrier, setEditingCourrier] = useState<COURRIER | null>(null);

  const handleEdit = (courrier: COURRIER) => {
    console.log("🔍 Courrier sélectionné pour modification:", courrier);
    setEditingCourrier(courrier);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div className="bg-white text-black p-4 rounded-t-lg flex items-center justify-between rounded-sm border border-stroke bg-white px-5 pb-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">Liste des Courriers Archivés</h4>
      </div>

      <div className="flex flex-col">
        {/* Table Header */}
        <div className="grid grid-cols-7 sm:grid-cols-7 rounded-sm bg-gray-200 dark:bg-meta-4">
          <div className="p-3 text-center font-medium  text-black dark:text-white">N°Courrier</div>
          <div className="p-3 text-center font-medium  text-black dark:text-white">Expediteur</div>
          <div className="p-3 text-center font-medium  text-black dark:text-white">Destination</div>
          <div className="p-3 text-center font-medium  text-black dark:text-white">Date d'archivage</div>
          <div className="p-3 text-center font-medium  text-black dark:text-white">Type</div>
          <div className="p-3 text-center font-medium  text-black dark:text-white">Fichiers Joints</div>
          <div className="p-3 text-center font-medium  text-black dark:text-white">Actions</div>
        </div>

        {/* Table Rows */}
        {courriers.map((courrier) => (
          <div key={courrier.id} className="grid grid-cols-7 sm:grid-cols-7 items-center border-b border-stroke dark:border-strokedark last:border-b-0">
            <div className="p-3 text-center text-black dark:text-white">{courrier.id}</div>
            <div className="p-3 text-center text-black dark:text-white">{courrier.expediteur}</div>
            <div className="p-3 text-center text-black dark:text-white">{courrier.destination}</div>
            <div className="p-3 text-center text-black dark:text-white">{courrier.date_creation}</div>
            <div className="p-3 text-center text-black dark:text-white">
              {courrier.destination === "FS" ? "Arrivé" : "Départ"}
            </div>
            <div className="p-3 text-center text-black dark:text-white">
  {courrier.fichiers && courrier.fichiers.trim().length > 0 ? (
    <div className="flex flex-col items-center">
      {courrier.fichiers.split(",").map((fichier, index) => {
        const fichierTrim = fichier.trim(); // Supprime les espaces autour
        return (
          <a 
            key={index}
            href={`/api/uploads?file=${encodeURIComponent(fichierTrim)}`} // Encode pour éviter les erreurs avec les espaces/spéciaux
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {fichierTrim}
          </a>
        );
      })}
    </div>
  ) : (
    <span>Aucun fichier joint</span>
  )}
</div>

            <div className="p-3 text-center text-black dark:text-white">
            <Link href={`/couriers/${courrier.id}/detailsCourrier`}>
              <button className="hover:text-primary">
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
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableCourriersArchive;