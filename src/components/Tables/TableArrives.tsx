"use client";
import React, { useState } from "react";
import { COURRIER } from "@/types/courrier";
import Link from "next/link";
import dateformat from "../../../helpers/dateformat";
import DeleteCourrier from "@/app/Actions/supprimercourrierarrives/page";
import Alert from "@/components/Alerts/Alert";
import ListFichiers from "@/app/Actions/afficherfichierarrives/page";
import DowloadFichiers from "@/app/Actions/telechargerfichierarrives/page";

const TableArrives = ({ courriersData }: { courriersData: COURRIER[] }) => {
  const [courriers, setCourriers] = useState(courriersData);
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
    setShowAlert(true);
    setAlertMessage(`Aucun fichier trouvé pour le courrier ${id}.`);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handleDownloadEchec = (id: number) => {
    setDownloadMessage(`Téléchargement échoué pour le courrier ${id} !`);
    setShowDownloadAlert(true);
    setTimeout(() => setShowDownloadAlert(false), 5000);
  };

  return (
    <div>
      {message && <Alert message={message} type="success" />}
      {showAlert && <Alert message={alertMessage} type="danger" />}
      {showDownloadAlert && <Alert message={downloadMessage} type="danger" />}

      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">N° Courrier</th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">Date d'UDC</th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Établissement d'origine</th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Objet</th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Statut</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courriers.map((courrier) => (
                <tr key={courrier.id}>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">{courrier.id}</h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{dateformat(new Date(courrier.date_creation))}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{courrier.expediteur}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{courrier.objet}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${courrier.statut === "Cloture" ? "bg-success text-success" : courrier.statut === "Traite" ? "bg-warning text-warning" : "bg-danger text-danger"}`}>
                      {courrier.statut}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <ListFichiers courrier={courrier}  onNoFiles={handleNoFilesAlert} />
                      <DeleteCourrier courrier={courrier} onDelete={handleDelete} />
                      <DowloadFichiers courrier={courrier} onNoFiles={handleDownloadEchec}  />

                      <Link href={`/courriers/arrives/${courrier.id}`} className="hover:text-primary p-2 rounded-md">
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
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableArrives;
