"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { COURRIER } from "@/types/courrier";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import dateformat from "../../../../../helpers/dateformat";

const TableFiches = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id ? parseInt(params.id as string, 10) : null;

  const [courrier, setCourrier] = useState<COURRIER | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Récupérer les données depuis l'API
  useEffect(() => {
    if (!id) {
      setError("ID du courrier invalide.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/courriersAvecFichiers/${id}`);
        const data = await response.json();
    
        if (response.ok) {
          const fichiersArray = data.courrier.fichiers.trim().split(/\s*,\s*/); // Convertir en tableau
          const typesCourrierArray = data.courrier.types_courrier.split(/\s*,\s*/);
          const typesSupportArray = data.courrier.type_support.split(/\s*,\s*/);
    
          const fichiersStructurés = fichiersArray.map((fichier: any, index: string | number) => ({
            fichier,
            type_courrier: typesCourrierArray[index] || "Inconnu",
            type_support: typesSupportArray[index] || "Inconnu",
          }));
    
          setCourrier({
            ...data.courrier,
            fichiers: fichiersStructurés, // Remplace la chaîne par un tableau structuré
          });
        } else {
          setError(data.error || "Une erreur est survenue.");
        }
      } catch (err) {
        console.error("Erreur lors du chargement des données :", err);
        setError("Impossible de charger les données.");
      } finally {
        setLoading(false);
      }
    };
    

    fetchData();
  }, [id]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName=" Détails courriers Arrivés" />
      <div className="p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Détails du courrier #{id}
        </h2>

        {/* Affichage du chargement ou des erreurs */}
        {loading && <p className="text-blue-500">Chargement des données...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Affichage des données */}
        {courrier && (
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <tbody>
              <tr className="border-b border-gray-300 dark:border-gray-700">
                <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Date de création :</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white">{dateformat(new Date(courrier.date_creation))}</td>
              </tr>
              <tr className="border-b border-gray-300 dark:border-gray-700">
                <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Expéditeur :</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white">{courrier.expediteur}</td>
              </tr>
              <tr className="border-b border-gray-300 dark:border-gray-700">
                <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Objet :</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white">{courrier.objet}</td>
              </tr>
              <tr className="border-b border-gray-300 dark:border-gray-700">
                <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Statut :</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white">
                <p className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${courrier.statut === "Cloture" ? "bg-success text-success" : courrier.statut === "Traite" ? "bg-warning text-warning" : "bg-danger text-danger"}`}>
                {courrier.statut}</p></td>
              </tr>

              {/* Gestion des fichiers */}
              {courrier.fichiers.length > 0 ? (
  courrier.fichiers.map((file, index) => (
    <React.Fragment key={index}>
      <tr className="border-b border-gray-300 dark:border-gray-700">
        <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Fichier {index + 1} :</td>
        <td className="px-4 py-3">
          {file.fichier ? (
            <a
              href={`/api/telechargerfichierdetails?file=${encodeURIComponent(file.fichier)}`}
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
        <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Type de Courrier :</td>
        <td className="px-4 py-3 text-gray-900 dark:text-white">{file.type_courrier}</td>
      </tr>
      <tr className="border-b border-gray-300 dark:border-gray-700">
        <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Type de Support :</td>
        <td className="px-4 py-3 text-gray-900 dark:text-white">{file.type_support}</td>
      </tr>
    </React.Fragment>
  ))
) : (
  <tr>
    <td colSpan={2} className="px-4 py-3 text-gray-500 text-center">
      Aucun fichier disponible.
    </td>
  </tr>
  
)
}

            </tbody>
          </table>
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
