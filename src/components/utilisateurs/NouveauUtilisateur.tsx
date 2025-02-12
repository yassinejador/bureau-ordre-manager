"use client";

import React, { useState } from "react";
import InputField from "../ui/InputField";
import Alert from "@/components/Alerts/Alert";

interface FormData {
  nom: string;
  prenom: string;
  roleId: string;
  etablissementId: string;
  serviceId: string;
}

const NouveauUtilisateurForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nom: "",
    prenom: "",
    roleId: "",
    etablissementId: "",
    serviceId: "",
  });

  const [alert, setAlert] = useState<{ message: string; type: "success" | "danger" | "info" } | null>(null);

  const roles = [
    { id: "1", name: "Admin" },
    { id: "2", name: "Utilisateur" },
    { id: "3", name: "Manager" },
  ];

  const etablissements = [
    { id: "1", name: "Etablissement A" },
    { id: "2", name: "Etablissement B" },
    { id: "3", name: "Etablissement C" },
  ];

  const services = [
    { id: "1", name: "Service 1" },
    { id: "2", name: "Service 2" },
    { id: "3", name: "Service 3" },
  ];

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setAlert({ message: `Utilisateur ajouté : ${data.email} avec mot de passe ${data.rawPassword}`, type: "success" });
        setFormData({ nom: "", prenom: "", roleId: "", etablissementId: "", serviceId: "" });
      } else {
        setAlert({ message: `Erreur : ${data.message}`, type: "danger" });
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire :", error);
      setAlert({ message: "Une erreur est survenue. Veuillez réessayer.", type: "danger" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
    >
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Nouvel Utilisateur</h3>
      </div>
      <div className="flex flex-col gap-5.5 p-6.5">
        {alert && <Alert message={alert.message} type={alert.type} />}

        <InputField label="Nom" type="text" placeholder="Nom" value={formData.nom} onChange={(e) => handleChange("nom", e.target.value)} required />
        <InputField label="Prénom" type="text" placeholder="Prénom" value={formData.prenom} onChange={(e) => handleChange("prenom", e.target.value)} required />

        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">Rôle</label>
          <select value={formData.roleId} onChange={(e) => handleChange("roleId", e.target.value)} className="w-full rounded-lg border-[1.5px] border-stroke px-5 py-3" required>
            <option value="" hidden>Sélectionnez un rôle</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>{role.role}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">Établissement</label>
          <select value={formData.etablissementId} onChange={(e) => handleChange("etablissementId", e.target.value)} className="w-full rounded-lg border-[1.5px] border-stroke px-5 py-3" required>
            <option value="" hidden>Sélectionnez un établissement</option>
            {etablissements.map((etab) => (
              <option key={etab.id} value={etab.id}>{etab.intitule}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">Service</label>
          <select value={formData.serviceId} onChange={(e) => handleChange("serviceId", e.target.value)} className="w-full rounded-lg border-[1.5px] border-stroke px-5 py-3" required>
            <option value="" hidden>Sélectionnez un service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>{service.nom}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90">
          Soumettre
        </button>
      </div>
    </form>
  );
};

export default NouveauUtilisateurForm;
