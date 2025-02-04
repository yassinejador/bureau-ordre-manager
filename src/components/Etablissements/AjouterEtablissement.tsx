"use client";

import React, { useState } from "react";
import { ETABLISSEMENT } from "@/types/etablissement"; // Assurez-vous du bon chemin d'import

type AjouterEtablissementProps = {
  addEtablissement: (newEtablissement: ETABLISSEMENT) => void;
};

const AjouterEtablissement: React.FC<AjouterEtablissementProps> = ({ addEtablissement }) => {
  const [newEtablissement, setNewEtablissement] = useState<ETABLISSEMENT>({
    id: 0,
    intitule: "",
    adresse: "",
    ville: "",
    fax: "",
    telephone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEtablissement({
      ...newEtablissement,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEtablissement.intitule && newEtablissement.ville) {
      addEtablissement(newEtablissement);
      setNewEtablissement({
        id: 0,
        intitule: "",
        adresse: "",
        ville: "",
        fax: "",
        telephone: "",
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md mx-auto">
      <h1 className="mb-6 text-xl font-semibold text-black dark:text-white">Formulaire Pour Ajouter un Établissement</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="intitule" className="p-3 text-center font-medium uppercase text-black dark:text-white">Intitulé</label>
          <input
            type="text"
            id="intitule"
            name="intitule"
            value={newEtablissement.intitule}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ville" className="p-3 text-center font-medium uppercase text-black dark:text-white">Ville</label>
          <input
            type="text"
            id="ville"
            name="ville"
            value={newEtablissement.ville}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="telephone" className="p-3 text-center font-medium uppercase text-black dark:text-white">Téléphone</label>
          <input
            type="text"
            id="telephone"
            name="telephone"
            value={newEtablissement.telephone}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fax" className="p-3 text-center font-medium uppercase text-black dark:text-white">Fax</label>
          <input
            type="text"
            id="fax"
            name="fax"
            value={newEtablissement.fax}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="adresse" className="p-3 text-center font-medium uppercase text-black dark:text-white">Adresse</label>
          <input
            type="text"
            id="adresse"
            name="adresse"
            value={newEtablissement.adresse}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        
        <button type="submit" className="w-full px-4 font-medium py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700">
          Ajouter l'Établissement
        </button>
      </form>
    </div>
  );
};

export default AjouterEtablissement;
