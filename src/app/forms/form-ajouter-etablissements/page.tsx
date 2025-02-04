"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AjouterEtablissement from "@/components/Etablissements/AjouterEtablissement";


const PageAjouterEtablissement = () => {
   // Fonction pour ajouter un établissement
   const addEtablissement = (newEtablissement: { 
    nom: string; 
    ville: string;
    contact: string;
    fax: string;
    adresse: string;
  }) => {
    console.log("Nouvel établissement ajouté :", newEtablissement);
    // Ici,envoyer les données vers une API ou une base de données
  };

return (
  <DefaultLayout>
    <Breadcrumb pageName="Ajouter Etablissement" />
    <div className="flex flex-col gap-10">
    <AjouterEtablissement addEtablissement={addEtablissement} />
    </div>
  </DefaultLayout>
);
};
export default PageAjouterEtablissement ;