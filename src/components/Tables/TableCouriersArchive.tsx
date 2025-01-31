"use client";
import React, { useState, useEffect } from "react";

interface FileAttachment {
  name: string;
  url: string;
}

interface Courier {
  id: number;
  sender: string;
  recipient: string;
  date: string;
  status: string;
  attachments: FileAttachment[];
}

const ArchivedCouriers: React.FC = () => {
  const [couriers, setCouriers] = useState<Courier[]>([]);

  useEffect(() => {
    // Simulation de données en attendant le backend
    const mockData: Courier[] = [
      { 
        id: 1, 
        sender: "Mr.A", 
        recipient: "Mr.B", 
        date: "2024-01-31", 
        status: "Archivé",
        attachments: [
          { name: "Document1.pdf", url: "#" },
          { name: "Image1.jpg", url: "#" }
        ]
      },
      { 
        id: 2, 
        sender: "Miss.A", 
        recipient: "Mr.E", 
        date: "2024-02-01", 
        status: "Archivé",
        attachments: [
          { name: "Report.docx", url: "#" }
        ]
      },
    ];
    setCouriers(mockData);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="container mx-auto">
        <div className="bg-blue-500 text-white p-4 rounded-t-lg">
          <h1 className="text-xl font-bold m-0">Liste des Courriers Archivés</h1>
        </div>
    
        <div className="bg-white shadow-md rounded-b-lg">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Expéditeur</th>
                <th className="border border-gray-300 px-4 py-2">Destinataire</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Statut</th>
                <th className="border border-gray-300 px-4 py-2">Fichiers Joints</th>
              </tr>
            </thead>
            <tbody>
              {couriers.map((courier) => (
                <tr key={courier.id}>
                  <td className="border border-gray-300 px-4 py-2">{courier.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{courier.sender}</td>
                  <td className="border border-gray-300 px-4 py-2">{courier.recipient}</td>
                  <td className="border border-gray-300 px-4 py-2">{courier.date}</td>
                  <td className="border border-gray-300 px-4 py-2">{courier.status}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {courier.attachments.length > 0 ? (
                      <ul>
                        {courier.attachments.map((file, index) => (
                          <li key={index}>
                            <a href={file.url} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                              {file.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>Aucun fichier</span>
                    )}
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

export default ArchivedCouriers;
