"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { COURRIER } from "@/types/courrier"; 
import dateformat from "../../../helpers/dateformat";
import { useRouter } from "next/navigation";
import ListFichiers from "@/app/actions/afficherfichierarrives/page";
import DeleteCourrier from "@/app/actions/supprimercourrierarrives/page";
import DowloadFichiers from "@/app/actions/telechargerfichierarrives/page";
import Alert from "../Alerts/Alert";
import Link from "next/link";


const ArrivePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [courriers, setCourriers] = useState<COURRIER[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [showDownloadAlert, setShowDownloadAlert] = useState(false);
    const [downloadMessage, setDownloadMessage] = useState("");
  
    const handleDelete = (id: number) => {
      setCourriers(courriers.filter((courrier) => courrier.id !== id));
      setMessage(`Le courrier ${id} a été supprimé avec succès !`);
      setTimeout(() => setMessage(""), 7000);
    };
  
    
  
    const handleNoFilesAlert = (id: number) => {
      setAlertMessage(`Aucun fichier trouvé pour le courrier ${id}.`);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    };
  
    const handleDownloadEchec = (id: number) => {
      setDownloadMessage(`Téléchargement échoué pour le courrier ${id} !`);
      setShowDownloadAlert(true);
      setTimeout(() => setShowDownloadAlert(false), 5000);
    };

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
      
 {message && <Alert message={message} type="success" />}
      {showAlert && <Alert message={alertMessage} type="danger" />}
      {showDownloadAlert && <Alert message={downloadMessage} type="danger" />}
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
              <th className="px-4 py-4 font-medium text-black dark:text-white">Actions</th>
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
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <ListFichiers courrier={courrier}  onNoFiles={handleNoFilesAlert} />
                      <DeleteCourrier courrier={courrier} onDelete={handleDelete} />
                      <DowloadFichiers courrier={courrier} onNoFiles={handleDownloadEchec}  />

                      <Link href={`/courriers/arrives/${courrier.id}`} className="hover:text-primary p-2 rounded-md">
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
                  </td>
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
