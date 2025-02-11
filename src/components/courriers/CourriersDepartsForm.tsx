"use client";

import React, { useState, ChangeEvent } from "react";
import InputField from "../ui/InputField";
import Select from "../ui/Select";
import { USER } from "@/types/users";
import Alert from "../Alerts/Alert";

interface CourriersFormProps {
  typeCourriers: string;
  users: USER[];
}

const CourriersDepartsForm: React.FC<CourriersFormProps> = ({
  typeCourriers,
  users,
}) => {
  const [formData, setFormData] = useState({
    dateCreation: "",
    signePar: "",
    traitePar: "",
    destinataire: "",
    objet: "",
    files: null as FileList | null,
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
    formDataToSend.append("expediteur", formData.signePar);
    formDataToSend.append("traite_par", formData.traitePar);
    formDataToSend.append("destination", formData.destinataire);
    formDataToSend.append("objet", formData.objet);

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
          signePar: "",
          traitePar: "",
          destinataire: "",
          objet: "",
          files: null,
        });
      } else {
        setAlert({ type: "error", message: data.message || "Erreur lors de la soumission" });
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
          label="Signé par"
          value={formData.signePar}
          onChange={(value) => handleChange("signePar", value)}
          options={users.map((user) => ({
            value: user.id.toString(),
            label: user.nom,
          }))}
        />

        <Select
          label="Traité par"
          value={formData.traitePar}
          onChange={(value) => handleChange("traitePar", value)}
          options={users.map((user) => ({
            value: user.id.toString(),
            label: user.nom,
          }))}
        />

        <Select
          label="Destinataire"
          value={formData.destinataire}
          onChange={(value) => handleChange("destinataire", value)}
          options={users.map((user) => ({
            value: user.id.toString(),
            label: user.nom,
          }))}
        />

        <InputField
          label="Objet"
          type="text"
          placeholder="Entrez l'objet"
          value={formData.objet}
          onChange={(e) => handleChange("objet", e.target.value)}
        />

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

export default CourriersDepartsForm;
