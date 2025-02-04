"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const RechercheForm = () => {
  const [type, setType] = useState("Arrivées");
  const [dateCreation, setDateCreation] = useState("");
  const [establishment, setEstablishment] = useState("");
  const [object, setObject] = useState("");
  const router = useRouter();

  const handleRecherche = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Création des paramètres de recherche et verification si variable n'est pas vide va etre stocker dans querparams
    const queryParams = new URLSearchParams();
    if (type) queryParams.set("type", type);
    if (dateCreation) queryParams.set("dateCreation", dateCreation);
    if (establishment) queryParams.set("establishment", establishment);
    if (object) queryParams.set("object", object);

    // Redirection vers la page de recherche avec les paramètres
// Vérification de la condition
if (type === 'Départs') {
    // Rediriger vers la page "depart"
    router.push(`/courriers/recherche?${queryParams.toString()}`);
  } else {
    // Rediriger vers une autre page
    router.push(`/courriers/recherche/recherchearrives?${queryParams.toString()}`);
  }  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4">Recherche des arrivées et des départs</h1>
      <form onSubmit={handleRecherche}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Arrivées">Arrivées</option>
            <option value="Départs">Départs</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Date de création</label>
          <input
            type="date"
            value={dateCreation}
            onChange={(e) => setDateCreation(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Établissement</label>
          <select
            value={establishment}
            onChange={(e) => setEstablishment(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Sélectionner l'expéditeur</option>
            <option value="ENSA">ENSA</option>
            <option value="ENCG">ENCG</option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Objet</label>
          <input
            type="text"
            value={object}
            onChange={(e) => setObject(e.target.value)}
            placeholder="Rechercher par objet"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Rechercher
        </button>
      </form>
    </div>
  );
};

export default RechercheForm;


