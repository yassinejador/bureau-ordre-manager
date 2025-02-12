"use client";

import React, { useState } from "react";
import { ETABLISSEMENT } from "@/types/etablissement";

type Props = {
  addEtablissements?: (newEtablissement: ETABLISSEMENT) => void;
};

const AjouterEtablissement = ({ addEtablissements }: Props) => {
  const [formData, setFormData] = useState<ETABLISSEMENT>({
    id: 0,
    intitule: "",
    adresse: "",
    ville: "",
    fax: 0,
    telephone: 0,
  });

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (addEtablissements) {
      addEtablissements(formData);
    }
    setFormData({
      id: 0,
      intitule: "",
      adresse: "",
      ville: "",
      fax: 0,
      telephone: 0,
    });
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md mx-auto">
      <h1 className="mb-6 text-xl font-semibold">Ajouter un Établissement</h1>
      <form onSubmit={handleSubmit}>
        {["intitule", "ville", "telephone", "fax", "adresse"].map((field) => (
          <div key={field} className="mb-4">
            <label htmlFor={field} className="block font-medium">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type="text"
              id={field}
              name={field}
              value={(formData as any)[field]}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        ))}
        <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-md">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AjouterEtablissement;
