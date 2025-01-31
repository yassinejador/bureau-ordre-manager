"use client";
import React, { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";

interface Log {
  id: number;
  user: string;
  description: string;
  dateAction: string;
}

const LogsHistory: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    
    const mockLogs: Log[] = [
      { id: 1, user: "Mr.A", description: "Création d'un utilisateur", dateAction: "2024-02-01 10:00:00" },
      { id: 2, user: "Mr.B", description: "Modification d'un rôle", dateAction: "2024-02-01 11:30:00" },
      { id: 3, user: "Miss.A", description: "Suppression d'un document", dateAction: "2024-02-01 14:45:00" },
    ];
    setLogs(mockLogs);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="container mx-auto">
        <div className="bg-blue-500 text-white p-4 rounded-t-lg">
          <h1 className="text-xl font-bold m-0">Historique des Actions</h1>
        </div>

        <div className="bg-white shadow-md rounded-b-lg">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Utilisateur</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="border border-gray-300 px-4 py-2">{log.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{log.user}</td>
                  <td className="border border-gray-300 px-4 py-2">{log.description}</td>
                  <td className="border border-gray-300 px-4 py-2 flex items-center">
                    <FaClock className="text-blue-500 mr-2" />
                    {log.dateAction}
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

export default LogsHistory;
