import React from "react";
import { FaEye, FaTrashAlt, FaDownload, FaPlus } from "react-icons/fa"; 
import Link from "next/link";

const TableEtablissement = () => {
  const etablissements = [
    {
      id: 1,
      nom: "FS-UCD",
      ville: "El Jadida",
      contact: "0523354674",
      fax: "0523354675",
      adresse: "Route Ben Maâchou, 24000, El Jadida, Maroc",
    },
    {
      id: 1,
      nom: "FS-UCD",
      ville: "El Jadida",
      contact: "0523354674",
      fax: "0523354675",
      adresse: "Route Ben Maâchou, 24000, El Jadida, Maroc",
    },
    {
      id: 1,
      nom: "FS-UCD",
      ville: "El Jadida",
      contact: "0523354674",
      fax: "0523354675",
      adresse: "Route Ben Maâchou, 24000, El Jadida, Maroc",
    },
    
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-4">
  <div className="container mx-auto">
    <div className="bg-blue-500 text-white p-4 rounded-t-lg flex items-center justify-between">
      <h1 className="text-xl font-bold m-0">Liste des Établissements</h1>
      <Link href="/forms/form-ajouter-etablissements">
        <button className="bg-white text-blue-500 p-2 rounded-full hover:bg-gray-200 transition duration-200 flex items-center justify-center w-10 h-10">
          <FaPlus size={20} />
        </button>
      </Link>
    </div>
  
        <div className="bg-white shadow-md rounded-b-lg">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Nom</th>
                <th className="border border-gray-300 px-4 py-2">Ville</th>
                <th className="border border-gray-300 px-4 py-2">Contact</th>
                <th className="border border-gray-300 px-4 py-2">Fax</th>
                <th className="border border-gray-300 px-4 py-2">Adresse</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {etablissements.map((etablissement) => (
                <tr key={etablissement.id}>
                  <td className="border border-gray-300 px-4 py-2">{etablissement.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{etablissement.nom}</td>
                  <td className="border border-gray-300 px-4 py-2">{etablissement.ville}</td>
                  <td className="border border-gray-300 px-4 py-2">{etablissement.contact}</td>
                  <td className="border border-gray-300 px-4 py-2">{etablissement.fax}</td>
                  <td className="border border-gray-300 px-4 py-2">{etablissement.adresse}</td>
                  <td className="border border-gray-300 px-4 py-2 flex justify-around">
                    <button className="text-blue-500 hover:text-blue-700">
                      <FaEye />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrashAlt />
                    </button>
                    <button className="text-green-500 hover:text-green-700">
                      <FaDownload />
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

export default TableEtablissement;
