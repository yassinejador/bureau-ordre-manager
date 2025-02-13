"use client";

import { COURRIER } from "@/types/courrier";
import React from "react";
import dateformat from "../../../helpers/dateformat";

type CourrierDetailsProps = {
  courrier: COURRIER | null;
};

export default function CourrierDetails({ courrier }: CourrierDetailsProps) {
  if (!courrier) {
    return <p className="text-red-500 text-center">Aucune donnée disponible pour ce courrier.</p>;
  }

  console.log("Courrier reçu :", courrier);
  const fichiers = Array.isArray(courrier.fichiers) ? courrier.fichiers : [];

  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-black dark:text-white text-center">
        Informations du Courrier
      </h2>
      <table className="min-w-full bg-white dark:bg-gray-800 border rounded-lg shadow-md">
        <tbody>
          <tr className="border-b dark:border-gray-700">
            <td className="px-4 py-3 font-medium text-black dark:text-white">ID :</td>
            <td className="px-4 py-3 text-black dark:text-white">{courrier.id}</td>
          </tr>
          <tr className="border-b dark:border-gray-700">
            <td className="px-4 py-3 font-medium text-black dark:text-white">Expéditeur :</td>
            <td className="px-4 py-3 text-black dark:text-white">{courrier.expediteur}</td>
          </tr>
          <tr className="border-b dark:border-gray-700">
            <td className="px-4 py-3 font-medium text-black dark:text-white">Destination :</td>
            <td className="px-4 py-3 text-black dark:text-white">{courrier.destination}</td>
          </tr>
          <tr className="border-b dark:border-gray-700">
            <td className="px-4 py-3 font-medium text-black dark:text-white">Objet :</td>
            <td className="px-4 py-3 text-black dark:text-white">{courrier.objet}</td>
          </tr>
          <tr className="border-b dark:border-gray-700">
            <td className="px-4 py-3 font-medium text-black dark:text-white">Traité par :</td>
            <td className="px-4 py-3 text-black dark:text-white">{courrier.traite_par}</td>
          </tr>
          <tr className="border-b dark:border-gray-700">
            <td className="px-4 py-3 font-medium text-black dark:text-white">État :</td>
            <td className="px-4 py-3 text-black dark:text-white">
              <p className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${courrier.statut === "Cloture" ? "bg-success text-success" : courrier.statut === "Traite" ? "bg-warning text-warning" : "bg-danger text-danger"}`}>{courrier.statut}</p>
            </td>
          </tr>
          <tr className="border-b dark:border-gray-700">
            <td className="px-4 py-3 font-medium text-black dark:text-white">Date de création :</td>
            <td className="px-4 py-3 text-black dark:text-white">{dateformat(new Date(courrier.date_creation))}</td>
          </tr>
        </tbody>
      </table>
      
      <h2 className="text-xl font-bold mb-4 mt-4 text-black dark:text-white text-center">Fichiers joints :</h2>
      {fichiers.length > 0 ? (
        <table className="min-w-full bg-white dark:bg-gray-800 border rounded-lg shadow-md">
          <tbody>
            {fichiers.map((file, index) => (
              <React.Fragment key={index}>
                <tr className="border-b dark:border-gray-700">
                  <td className="px-4 py-3 font-medium text-black dark:text-white">Fichier {index + 1} :</td>
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
                <tr className="border-b dark:border-gray-700">
                  <td className="px-4 py-3 font-medium text-black dark:text-white">Type de Courrier :</td>
                  <td className="px-4 py-3 text-black dark:text-white">{file.type_courrier}</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <td className="px-4 py-3 font-medium text-black dark:text-white">Type de Support :</td>
                  <td className="px-4 py-3 text-black dark:text-white">{file.type_support}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">Aucun fichier joint</p>
      )}
    </div>
  );
}
