"use client";

import { LOG } from '@/types/historique';
import React, { useEffect, useState } from 'react';

const Historique: React.FC = () => {
  const [logs, setLogs] = useState<LOG[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('/api/logs');
        
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des logs");
        }

        const data = await response.json();
        if (!Array.isArray(data.logs)) {
          throw new Error("Format des logs invalide");
        }

        setLogs(data.logs);
      } catch (err) {
        console.error("Erreur lors de la récupération des logs:", err);
        setError("Impossible de charger l'historique des actions.");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (loading) {
    return <p className="text-gray-500 text-center">Chargement des logs...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

    <div className="overflow-x-auto bg-white">
      
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="min-w-[150px] px-4 py-4 text-center font-medium  text-black dark:text-white">Utilisateur</th>
            <th className="min-w-[150px] px-4 py-4 text-center font-medium  text-black dark:text-white">Description</th>
            <th className="min-w-[150px] px-4 py-4 text-center font-medium  text-black dark:text-white">Date</th>
          </tr>
        </thead>
        <tbody>
          {logs.length > 0 ? (
            logs.map((log) => (
              <tr key={log.id} className="border border-gray-300">
                <td className="text-center text-black border-gray-300 px-4 py-2">{log.nom || "Inconnu"}</td>
                <td className="text-center text-black border-gray-300 px-4 py-2">{log.description}</td>
                <td className="text-center text-black border-gray-300 px-4 py-2">
                  {new Date(log.date_action).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center py-4">Aucune action enregistrée.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Historique;
