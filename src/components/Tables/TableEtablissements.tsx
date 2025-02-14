"use client";

import React, {useState} from "react";
import { FaPlus } from "react-icons/fa"; 
import Link from "next/link";
import { ETABLISSEMENT } from "@/types/etablissement";
import  DownloadForm  from "@/components/forms/PageListeEtablissement/DownloadForm"; 
import EtablissementForm from "../forms/PageListeEtablissement/EtablissementForm";


type TableEtablissementsProps = {
  etablissements: ETABLISSEMENT[];
  setEtablissements?: (etablissements: ETABLISSEMENT[] | ((prevEtablissements: ETABLISSEMENT[]) => ETABLISSEMENT[])) => void; // Définir setUsers comme prop
};

const TableEtablissement = ({etablissements,setEtablissements} : TableEtablissementsProps ) => {
  const [selectedEtablissement, setSelectedEtablissement] = useState<ETABLISSEMENT | null>(null);

  const [editingEtablissement, setEditingEtablissement] = useState<ETABLISSEMENT | null>(null);

  const handleEdit = (etablissement: ETABLISSEMENT) => {
    console.log("🔍 Utilisateur sélectionné pour modification:", etablissement);
    setEditingEtablissement(etablissement);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
  <div className="container mx-auto">
    {/* Header */}
    <div className="bg-white text-black p-4 rounded-t-lg flex items-center justify-between  rounded-sm border border-stroke bg-white px-5 pb-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <h1  className=" mt-4 mb-6 text-xl font-semibold text-black dark:text-white">Liste des Établissements</h1>
      <Link href="/forms/form-ajouter-etablissements">
        <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-gray-200 transition duration-200 flex items-center justify-center w-12 h-12">
          <FaPlus size={25} />
          
        </button>
      </Link>
    </div>
       {/* Table */}
       <div className="flex flex-col">
  {/* Table Header */}
  <div className="grid grid-cols-7 sm:grid-cols-7 rounded-sm bg-gray-200 dark:bg-meta-4">
    <div className="p-3 text-center font-medium  text-black dark:text-white">N° Etablissement</div>
    <div className="p-3 text-center font-medium  text-black dark:text-white">Intitule</div>
    <div className="p-3 text-center font-medium  text-black dark:text-white">Ville</div>
    <div className="p-3 text-center font-medium  text-black dark:text-white">Contact</div>
    <div className="p-3 text-center font-medium  text-black dark:text-white">Fax</div>
    <div className="p-3 text-center font-medium  text-black dark:text-white">Adresse</div>
    <div className="p-3 text-center font-medium  text-black dark:text-white">Actions</div>
  </div>

  {/* Table Rows */}
  {etablissements.map((etablissement) => (
    <div
      key={etablissement.id}
      className="grid grid-cols-7 sm:grid-cols-7 bg-white items-center border-b border-stroke dark:border-strokedark last:border-b-0"
    >
      <div className="p-3 text-center text-black dark:text-white">{etablissement.id}</div>
      <div className="p-3 text-center text-black dark:text-white">{etablissement.intitule}</div>
      <div className="p-3 text-center text-black dark:text-white">{etablissement.ville}</div>
      <div className="p-3 text-center text-black dark:text-white">{etablissement.telephone}</div>
      <div className="p-3 text-center text-black dark:text-white">{etablissement.fax}</div>
      <div className="p-3 text-center text-black dark:text-white">{etablissement.adresse}</div>
      <div className="p-3 text-center text-black dark:text-white">
      <button onClick={() => setEditingEtablissement(etablissement)} className="hover:text-primary">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                       >
                    <path
                        d="M13.75 7.3025L10.6975 4.25L11.7575 3.19C12.02 2.9275 12.38 2.7775 12.7575 2.7775C13.135 2.7775 13.495 2.9275 13.7575 3.19L14.81 4.2425C15.0725 4.505 15.2225 4.865 15.2225 5.2425C15.2225 5.62 15.0725 5.98 14.81 6.2425L13.75 7.3025ZM2.5 15.5V12.4475C2.5 12.26 2.56 12.0775 2.6725 11.93L9.3725 5.23L12.425 8.2825L5.725 14.9825C5.5775 15.13 5.395 15.19 5.2075 15.19H2.155C2.07 15.19 2 15.26 2 15.345V15.5H2.5Z"
                        fill="" 
                        stroke="#808080" 
                        strokeWidth="0.5" 
                       />
                       </svg>
              </button>
                    <button onClick={() => setSelectedEtablissement(etablissement)}  className="hover:text-primary">
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
                  </div>
                  
              ))}
            
            {editingEtablissement && (
  <EtablissementForm
  etablissement={editingEtablissement} 
    onClose={() => setEditingEtablissement(null)} 
    onUpdate={(updatedEtablissement) => {
      if (setEtablissements)
      setEtablissements((prevEtablissements) =>
        prevEtablissements.map((etablissement) =>
          etablissement.id === updatedEtablissement.id ? updatedEtablissement : etablissement
        )
      );
      setEditingEtablissement(null); // Fermer le modal après mise à jour
    }} 
  />
)}
            {selectedEtablissement && (
        <DownloadForm etablissement={selectedEtablissement} onClose={() => setSelectedEtablissement(null)} />
      )}      
         </div>
      </div>
 </div>
  );
};
export default TableEtablissement;
