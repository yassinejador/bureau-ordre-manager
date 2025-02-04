"use client";

import React, { useState, ChangeEvent } from "react";
import InputField from "../ui/InputField";
import InputCheckbox from "../ui/InputCheckbox";
import InputRadio from "../ui/InputRadio";

interface CourriersFormProps {
  typeCourriers: string;
}

interface User {
  id: string;
  name: string;
}

const CourriersDepartsForm = ({ typeCourriers }: CourriersFormProps) => {
  const [formData, setFormData] = useState({
    dateCreation: "",
    signePar: "",
    traitePar: "",
    destinataire: "",
    objet: "",
    files: null as FileList | null,
    confidential: false,
    urgent: false,
    supportType: "",
  });

  const users: User[] = [
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

    console.group("Soumission du formulaire de courrier départ");
    console.log("Date de création:", submissionData.dateCreation);
    console.log("Signé par:", submissionData.signePar);
    console.log("Traité par:", submissionData.traitePar);
    console.log("Destinataire:", submissionData.destinataire);
    console.log("Objet:", submissionData.objet);
    console.log("Fichiers:", submissionData.files);
    console.log("Date de soumission:", submissionData.dateSubmission);
    console.groupEnd();
  };

  const SelectUser = ({ 
    label, 
    value, 
    field 
  }: { 
    label: string; 
    value: string; 
    field: string;
  }) => (
    <div>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => handleChange(field, e.target.value)}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
        required
      >
        <option value="" hidden>
          Sélectionnez un utilisateur
        </option>
        {users.map((user) => (
          <option key={user.id} value={user.name}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );

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
        <SelectUser
          label="Signé par"
          value={formData.signePar}
          field="signePar"
        />

        <SelectUser
          label="Traité par"
          value={formData.traitePar}
          field="traitePar"
        />

        <InputField
          label="Date"
          type="date"
          placeholder="Entrez la date de création"
          value={formData.dateCreation}
          onChange={(e) => handleChange("dateCreation", e.target.value)}
        />

        <InputField
          label="Objet"
          type="text"
          placeholder="Entrez l'objet"
          value={formData.objet}
          onChange={(e) => handleChange("objet", e.target.value)}
        />

        <SelectUser
          label="Destinataire"
          value={formData.destinataire}
          field="destinataire"
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
          className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Soumettre
        </button>
      </div>
    </form>
  );
};

export default CourriersDepartsForm;