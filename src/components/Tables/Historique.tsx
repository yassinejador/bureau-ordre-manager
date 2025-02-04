"use client";
import { LOG } from "@/types/historique";
import React, { useState, useEffect } from "react";

const LogsHistory: React.FC = () => {
  const [logs, setLogs] = useState<LOG[]>([]);

  useEffect(() => {
    // Logs initiaux
    const initialLogs: LOG[] = [
      { id: 1, user: "Mr.A", description: "Création d'un utilisateur", dateAction: "2024-02-01 10:00:00", userId: 1 },
      { id: 2, user: "Mr.B", description: "Modification d'un rôle", dateAction: "2024-02-01 11:30:00", userId: 2 },
      { id: 3, user: "Miss.A", description: "Suppression d'un document", dateAction: "2024-02-01 14:45:00", userId: 3 },
    ];
    setLogs(initialLogs);
  }, []);

  const handleUserAction = (newAction: LOG) => {
    // Ajouter une nouvelle action à l'historique
    setLogs((prevLogs) => [...prevLogs, newAction]);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">Historique des Actions</h4>

      <div className="flex flex-col">
        {/* Table Header */}
        <div className="grid grid-cols-4 sm:grid-cols-4 rounded-sm bg-gray-200 dark:bg-meta-4">
          <div className="p-3 text-center font-medium uppercase text-black dark:text-white">ID</div>
          <div className="p-3 text-center font-medium uppercase text-black dark:text-white">Utilisateur</div>
          <div className="p-3 text-center font-medium uppercase text-black dark:text-white">Description</div>
          <div className="p-3 text-center font-medium uppercase text-black dark:text-white">Date</div>
        </div>

        {/* Table Rows */}
        {logs.map((log) => (
          <div
            key={log.id}
            className={`grid grid-cols-4 sm:grid-cols-4 items-center border-b border-stroke dark:border-strokedark last:border-b-0`}
          >
            <div className="p-3 text-center text-black dark:text-white">{log.id}</div>
            <div className="p-3 text-center text-black dark:text-white">{log.user}</div>
            <div className="p-3 text-center text-black dark:text-white">{log.description}</div>
            <div className="p-3 text-center text-black dark:text-white">{log.dateAction}</div>
          </div>
        ))}
      </div>

      {/* Simulation d'une action utilisateur */}
      <div className="mt-4">
        <button
          onClick={() =>
            handleUserAction({
              id: logs.length + 1, // Créer un nouvel ID 
              user: "Mr.C",
              description: "Ajout d'un nouveau document",
              dateAction: new Date().toISOString(),
              userId: 4,
            })
          }
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Ajouter une action
        </button>
      </div>
    </div>
  );
};

export default LogsHistory;
