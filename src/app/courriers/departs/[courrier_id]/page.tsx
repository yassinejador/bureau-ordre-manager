"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { COURRIER } from "@/types/courrier";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";



// Données fictives des fiches 📂
const fichesData: COURRIER[] = [
  {
    
    
    courrier_id: 1,
    date_creation: "15dev2025",
    expediteur: "",
    traite_par: "Ahmed",
    objet: "hh",
    etat_id: "En attente",
    destination: "ensa",
    date_suppression: "",
    actions: "",
    fichier:[ {
        id: 0,
        type_courrier: "",
        type_support: "",
        courrier_id: 1,
        fichier: ""
    }]
  },
  {
    courrier_id: 2,
    date_creation: "15dev2025",
    expediteur: "",
    traite_par: "Ahmed",
    objet: "bdjd",
    etat_id: "Traité",
    destination: "encg",
    date_suppression: "",
    actions: "",
    fichier:[{
        id: 0,
        type_courrier: "",
        type_support: "",
        courrier_id:2,
        fichier: ""
    }] 
  },
  {
    courrier_id: 3,
    date_creation: "15dev2025",
    expediteur: "",
    traite_par: "Ahmed",
    objet: "bdjd",
    etat_id: "Clôturé",
    destination: "FSL",
    date_suppression: "",
    actions: "",
    fichier: [{
      id: 0,
      type_courrier: "",
      type_support: "",
      courrier_id: 3,
      fichier: ""
  }]
},
];

const TableFiches = () => {
  const router = useRouter();
  const params = useParams();
  const courrier_id = params.courrier_id ? parseInt(params.courrier_id as string, 10) : null;

  // Vérifier si l'ID est valide
  if (!courrier_id) {
    return <p className="text-red-500">ID du courrier invalide.</p>;
  }

  // Trouver la fiche correspondant à l'ID du courrier
  const fiche = fichesData.find((f) => f.courrier_id === courrier_id);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Départs" />
    <div className="p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Détails du courrier #{courrier_id}
      </h2>

      {fiche ? (
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
          <tbody>
          <tr className="border-b border-gray-300 dark:border-gray-700">
              <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Date d'UCD :</td>
              <td className="px-4 py-3 text-gray-900 dark:text-white">{fiche.date_creation}</td>
            </tr>
            <tr className="border-b border-gray-300 dark:border-gray-700">
              <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Destination  :</td>
              <td className="px-4 py-3 text-gray-900 dark:text-white">{fiche.destination}</td>
            </tr>
            <tr className="border-b border-gray-300 dark:border-gray-700">
              <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Objet :</td>
              <td className="px-4 py-3 text-gray-900 dark:text-white">{fiche.objet}</td>            </tr>
              <tr className="border-b border-gray-300 dark:border-gray-700">
              <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Status :</td>
              <td className="px-4 py-3 text-gray-900 dark:text-white">{fiche.etat_id}</td>
            </tr>
             {/* Mapping sur les fichiers */}
                        {fiche.fichier.map((file, index) => (
                            <React.Fragment key={index}>
                              <tr className="border-b border-gray-300 dark:border-gray-700">
                                <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Type de Courrier :</td>
                                <td className="px-4 py-3 text-gray-900 dark:text-white">{file.type_courrier}</td>
                              </tr>
                              <tr className="border-b border-gray-300 dark:border-gray-700">
                                <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Type de Support :</td>
                                <td className="px-4 py-3 text-gray-900 dark:text-white">{file.type_support}</td>
                              </tr>
                              <tr className="border-b border-gray-300 dark:border-gray-700">
                    <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Fichier   {index+1} :</td>
                    <td className="px-4 py-3">
                      {file.fichier && (
                        <a
                          href={`/uploads/${file.fichier}`}
                          download
                          className="text-blue-500 hover:underline"
                        >
                          Télécharger le fichier
                        </a>
                      )}
                    </td>
                  </tr>
                            </React.Fragment>
                          ))}
            

          </tbody>
        </table>
      ) : (
        <p className="text-red-500">Aucun détails</p>
      )}

      {/* Bouton de retour */}
      <button
        onClick={() => router.back()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Retour
      </button>
    </div>
    </DefaultLayout>
  );
};

export default TableFiches;
