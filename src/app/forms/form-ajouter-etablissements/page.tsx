"use client";

import { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AjouterEtablissement from "@/components/Etablissements/AjouterEtablissement";
import { ETABLISSEMENT } from "@/types/etablissement";

const PageAjouterEtablissement = () => {
  const [etablissements, setEtablissements] = useState<ETABLISSEMENT[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/etablissements");
        if (!res.ok) throw new Error("Erreur lors de la récupération");
        const data = await res.json();
        setEtablissements(data.etablissements);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleAddEtablissement = async (newEtablissement: ETABLISSEMENT) => {
    try {
      const res = await fetch("/api/etablissements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEtablissement),
      });

      if (!res.ok) throw new Error("Échec de l'ajout");

      const addedEtablissement = await res.json();
      setEtablissements([...etablissements, addedEtablissement]);
      alert("Établissement ajouté !");
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Ajouter Etablissement" />
      <div className="flex flex-col gap-10">
        <AjouterEtablissement addEtablissements={handleAddEtablissement} />
      </div>
    </DefaultLayout>
  );
};

export default PageAjouterEtablissement;
