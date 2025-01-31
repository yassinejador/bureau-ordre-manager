"use client";

import React, { useState } from "react";
interface AjouterEtablissementProps {
  addEtablissement: (newEtablissement: { 
    nom: string; 
    ville: string;
    contact: string;
    fax: string;
    adresse: string }) => void;
}
const AjouterEtablissement: React.FC<AjouterEtablissementProps> = ({ addEtablissement }) => {
  const [newEtablissement, setNewEtablissement] = useState({
    nom: "",
    ville: "",
    contact: "",
    fax: "",
    adresse: "",
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
    if (newEtablissement.nom && newEtablissement.ville) {
      addEtablissement(newEtablissement);
      setNewEtablissement({
        nom: "",
        ville: "",
        contact: "",
        fax: "",
        adresse: "",
      });
    }
  };

  return (
    
    <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Ajouter un Établissement</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={newEtablissement.nom}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ville" className="block text-sm font-medium text-gray-700">Ville</label>
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
          <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={newEtablissement.contact}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fax" className="block text-sm font-medium text-gray-700">Fax</label>
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
          <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">Adresse</label>
          <input
            type="text"
            id="adresse"
            name="adresse"
            value={newEtablissement.adresse}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Ajouter l'Établissement
        </button>
      </form>
    </div>
  );
};

export default AjouterEtablissement;
