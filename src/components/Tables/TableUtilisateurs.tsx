"use client";

import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  unité: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Simulation de données
    const mockUsers: User[] = [
      { id: 1, name: "Mr Omar", email: "Mr-Omar@example.com", role: "Admin", unité: "Administration" },
      { id: 2, name: "Mme Jihan", email: "Mme-Jihan", role: "Doyen", unité: "Direction" },
      { id: 3, name: "Mr ahmed", email: "Mr-ahmed@example.com", role: "Responsable", unité: "Departement Math" },
    ];
    setUsers(mockUsers);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="container mx-auto">
        <div className="bg-blue-500 text-white p-4 rounded-t-lg">
          <h1 className="text-xl font-bold m-0">Liste des Utilisateurs</h1>
        </div>

        <div className="bg-white shadow-md rounded-b-lg">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Nom</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Rôle</th>
                <th className="border border-gray-300 px-4 py-2">unité</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.unité}</td>
                  <td className="border border-gray-300 px-4 py-2 flex justify-around">
                    <button className="text-blue-500 hover:text-blue-700">
                      <FaEdit />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrashAlt />
                    </button>
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

export default UserList;

