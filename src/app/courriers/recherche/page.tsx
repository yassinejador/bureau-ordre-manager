import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SearchForm from "@/components/BarreRecherche/barrerecherche";

export const metadata: Metadata = {
  title: "Recherche Courrier",
  description:
    "Page de recherche pour trouver facilement les courriers dans le tableau de bord.",
};

const FormElementsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Recherche Courrier" />
      <SearchForm />
    </DefaultLayout>
  );
};

export default FormElementsPage;
