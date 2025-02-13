import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import RechercheForm from "@/components/BarreRecherche/barrerecherche";
export const metadata: Metadata = {
  title: "Recherche Courriers",
  description:
    "Recherché les courriers arrivés et départs",
};

const FormElementsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Recherché" />
      <RechercheForm/>
    </DefaultLayout>
  );
};

export default FormElementsPage;
