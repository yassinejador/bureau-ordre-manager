"use client";

import React, { useState, ChangeEvent } from "react";
import InputField from "../ui/InputField";
import InputCheckbox from "../ui/InputCheckbox";
import InputRadio from "../ui/InputRadio";

interface CourriersFormProps {
  typeCourriers: string;
}

interface Expediteur {
  id: string;
  name: string;
}

const CourriersArrivesForm = ({ typeCourriers }: CourriersFormProps) => {
  const [formData, setFormData] = useState({
    dateCreation: "",
    expediteur: "",
    objet: "",
    files: null as FileList | null,
    confidential: false,
    urgent: false,
    supportType: "",
  });

  const expediteurs: Expediteur[] = [
    { id: "1", name: "Jean Dupont" },
    { id: "2", name: "Marie Martin" },
    { id: "3", name: "Pierre Bernard" },
    { id: "4", name: "Sophie Laurent" },
    { id: "5", name: "Lucas Dubois" },
  ];

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleChange("files", event.target.files);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const submissionData = {
      ...formData,
      files: formData.files
        ? Array.from(formData.files).map((file) => ({
            name: file.name,
            size: file.size,
            type: file.type,
          }))
        : [],
      dateSubmission: new Date().toISOString(),
    };

    console.group("Soumission du formulaire de courrier");
    console.log("Date de création:", submissionData.dateCreation);
    console.log("Expéditeur:", submissionData.expediteur);
    console.log("Objet:", submissionData.objet);
    console.log("Confidentiel:", submissionData.confidential);
    console.log("Urgent:", submissionData.urgent);
    console.log("Type de support:", submissionData.supportType);
    console.log("Fichiers:", submissionData.files);
    console.log("Date de soumission:", submissionData.dateSubmission);
    console.groupEnd();
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
        <InputField
          label="Date de création"
          type="date"
          placeholder="Entrez la date de création"
          value={formData.dateCreation}
          onChange={(e) => handleChange("dateCreation", e.target.value)}
        />

        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Expéditeur
          </label>
          <select
            value={formData.expediteur}
            onChange={(e) => handleChange("expediteur", e.target.value)}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            required
          >
            <option value="" hidden>
              Sélectionnez un expéditeur
            </option>
            {expediteurs.map((exp) => (
              <option key={exp.id} value={exp.name}>
                {exp.name}
              </option>
            ))}
          </select>
        </div>

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
              Type de courriers
            </label>
            <div className="space-y-2">
              <InputCheckbox
                label="Confidentiel"
                checked={formData.confidential}
                onChange={(checked) => handleChange("confidential", checked)}
              />
              <InputCheckbox
                label="Urgent"
                checked={formData.urgent}
                onChange={(checked) => handleChange("urgent", checked)}
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
          className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Soumettre
        </button>
      </div>
    </form>
  );
};

export default CourriersArrivesForm;

