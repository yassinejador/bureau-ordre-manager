"use client";

import React, { useState, ChangeEvent } from "react";
import InputField from "../ui/InputField";
import InputRadio from "../ui/InputRadio";
import Select from "../ui/Select";
import Alert from "../Alerts/Alert";
import { ETABLISSEMENT } from "@/types/etablissement";
import { ETAT } from "@/types/etat";

interface CourriersFormProps {
  typeCourriers: string;
  expediteurs: ETABLISSEMENT[];
  etats: ETAT[];
}

const CourriersArrivesForm = ({
  typeCourriers,
  expediteurs,
  etats,
}: CourriersFormProps) => {
  const [formData, setFormData] = useState({
    dateCreation: "",
    expediteur: "",
    etat: "",
    objet: "",
    files: null as FileList | null,
    mailType: "",
    supportType: "",
    courrierType: "Arrivé",
  });

  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleChange("files", event.target.files);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("date_creation", formData.dateCreation);
    formDataToSend.append("expediteur", formData.expediteur);
    formDataToSend.append("etat_id", formData.etat);
    formDataToSend.append("objet", formData.objet);
    formDataToSend.append("type_courrier", formData.mailType);
    formDataToSend.append("type_support", formData.supportType);
    formDataToSend.append("type", formData.courrierType);

    if (formData.files) {
      Array.from(formData.files).forEach((file) => {
        formDataToSend.append("fichier", file);
      });
    }

    try {
      const response = await fetch("/api/courriers", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      if (response.ok) {
        setAlert({ type: "success", message: "Formulaire soumis avec succès" });
        setFormData({
          dateCreation: "",
          expediteur: "",
          etat: "",
          objet: "",
          files: null,
          mailType: "",
          supportType: "",
          courrierType: "Arrivé",
        });
      } else {
        setAlert({ type: "error", message: "Erreur lors de la soumission" });
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: "Erreur lors de l'envoi du formulaire",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
    >
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          {typeCourriers}
        </h3>
      </div>

      <div className="flex flex-col gap-5.5 p-6.5">
        {alert && <Alert type={alert.type} message={alert.message} />}

        <InputField
          label="Date de création"
          type="date"
          placeholder="Entrez la date de création"
          value={formData.dateCreation}
          onChange={(e) => handleChange("dateCreation", e.target.value)}
        />

        <Select
          label="Expéditeur"
          value={formData.expediteur}
          onChange={(value) => handleChange("expediteur", value)}
          options={expediteurs
            .filter((expediteur) => expediteur.intitule !== "FS")
            .map((expediteur) => ({
              value: expediteur.id.toString(),
              label: expediteur.intitule,
            }))}
        />

        <Select
          label="Etat"
          value={formData.etat}
          onChange={(value) => handleChange("etat", value)}
          options={etats.map((etat) => ({
            value: etat.id.toString(),
            label: etat.etat,
          }))}
        />

        <InputField
          label="Objet"
          type="text"
          placeholder="Entrez l'objet"
          value={formData.objet}
          onChange={(e) => handleChange("objet", e.target.value)}
        />

        <div className="grid grid-cols-1 gap-5.5 md:grid-cols-2">
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Type de courrier
            </label>
            <div className="space-y-2">
              <InputRadio
                label="Confidentiel"
                value="confidentiel"
                name="mailType"
                checked={formData.mailType === "confidentiel"}
                onChange={(value) => handleChange("mailType", value)}
              />
              <InputRadio
                label="Urgent"
                value="urgent"
                name="mailType"
                checked={formData.mailType === "urgent"}
                onChange={(value) => handleChange("mailType", value)}
              />
            </div>
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Type de support
            </label>
            <div className="flex flex-col space-y-2">
              <InputRadio
                label="Numérique"
                value="numerique"
                name="supportType"
                checked={formData.supportType === "numerique"}
                onChange={(value) => handleChange("supportType", value)}
              />
              <InputRadio
                label="Papier"
                value="papier"
                name="supportType"
                checked={formData.supportType === "papier"}
                onChange={(value) => handleChange("supportType", value)}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Fichiers
          </label>
          <input
            multiple
            type="file"
            onChange={handleFileChange}
            className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
          />
        </div>

        <button
          type="submit"
          className="bg-primary px-10 py-4 text-white hover:bg-opacity-90"
        >
          Soumettre
        </button>
      </div>
    </form>
  );
};

export default CourriersArrivesForm;
