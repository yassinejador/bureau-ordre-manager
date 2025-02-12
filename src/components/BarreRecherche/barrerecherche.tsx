"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const RechercheForm = () => {
  const [type, setType] = useState("Arrivé");
  const [dateCreation, setDateCreation] = useState("");
  const [establishment, setEstablishment] = useState("");
  const [object, setObject] = useState("");
  const router = useRouter();

  const handleRecherche = (e: React.FormEvent) => {
    e.preventDefault();

    // Création des paramètres de recherche
    const queryParams = new URLSearchParams();
    if (type) queryParams.set("type", type);
    if (dateCreation) queryParams.set("date_creation", dateCreation);
    if (establishment) queryParams.set("etablissement", establishment.toUpperCase());
    if (object) queryParams.set("objet", object);

    // Redirection selon le type sélectionné
    if (type === "Arrivé") {
      router.push(`/courriers/recherche/recherchearrives?${queryParams.toString()}`);
    } else {
      router.push(`/courriers/recherche/recherchedeparts?${queryParams.toString()}`);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4 text-center">
        Recherche des courriers
      </h1>
      <form onSubmit={handleRecherche} className="space-y-4">
        {/* Type de courrier */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Arrivées">Arrivé</option>
            <option value="Départ">Départ</option>
          </select>
        </div>

        {/* Date de création */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Date de création</label>
          <input
            type="date"
            value={dateCreation}
            onChange={(e) => setDateCreation(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Établissement */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Établissement <span className="text-red-500">(en MAJUSCULES)</span>
          </label>
          <input
            type="text"
            value={establishment}
            onChange={(e) => setEstablishment(e.target.value.toUpperCase())}
            placeholder="ENSA"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md uppercase"
          />
        </div>

        {/* Objet */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Objet</label>
          <input
            type="text"
            value={object}
            onChange={(e) => setObject(e.target.value)}
            placeholder="Rechercher par objet"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Bouton Rechercher */}
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
