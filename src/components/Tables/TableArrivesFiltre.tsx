"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { COURRIER } from "@/types/courrier"; 
import dateformat from "../../../helpers/dateformat";
import { useRouter } from "next/navigation";

const ArrivePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [courriers, setCourriers] = useState<COURRIER[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourriers = async () => {
      setLoading(true);
      setError(null);
      try {
        // Construit la chaîne de paramètres de recherche à partir de `searchParams`
        const query = new URLSearchParams(searchParams as any).toString();
        const response = await fetch(`/api/recherchedepartsarrives?${query}`);
        
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des courriers");
        }
        
        const data = await response.json();
        setCourriers(data.data || []);
      } catch (error: any) {
        setError(error.message || "Erreur lors de la récupération des courriers.");
        setCourriers([]);
      }
      setLoading(false);
    };

    fetchCourriers();
  }, [searchParams]); // Dépendance à `searchParams` pour refaire l'appel API si nécessaire

  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      

      {loading ? (
        <p className="text-gray-500 dark:text-gray-300 text-center">Chargement des courriers...</p>
      ) : error ? (
        <p className="text-red-500 dark:text-red-300 text-center">{error}</p>
      ) : courriers.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300 text-center">Aucun courrier trouvé.</p>
      ) : (
        <table className="min-w-full bg-white dark:bg-gray-800 border rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-left">
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                N° Courrier
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Date
              </th>
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
                Expéditeur
              </th>
              <th className="min-w-[180px] px-4 py-4 font-medium text-black dark:text-white">
                Objet
              </th>
              <th className="min-w-[160px] px-4 py-4 font-medium text-black dark:text-white">
                Statut
              </th>
            </tr>
          </thead>
          <tbody>
            {courriers.map((courrier) => (
              <tr key={courrier.id} className="border-b dark:border-gray-700">
                <td className="px-4 py-3 text-black dark:text-white">{courrier.id}</td>
                <td className="px-4 py-3 text-black dark:text-white">{dateformat(new Date(courrier.date_creation))}</td>
                <td className="px-4 py-3 text-black dark:text-white">{courrier.expediteur}</td>
                <td className="px-4 py-3 text-black dark:text-white">{courrier.objet}</td>
                <td className="px-4 py-3 text-black dark:text-white">
                    <p className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${courrier.statut === "Cloture" ? "bg-success text-success" : courrier.statut === "Traite" ? "bg-warning text-warning" : "bg-danger text-danger"}`}>
                {courrier.statut}</p></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div> {/* Bouton de retour */}
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Retour
        </button></div>
    </div>
  );
};

export default ArrivePage;
