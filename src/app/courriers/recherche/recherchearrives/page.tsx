import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ArrivePage from "@/components/Tables/TableArrivesFiltre";
export const metadata: Metadata = {
  title: "Courriers Arrivés Filtrés",
  description:    "Liste des courriers arrivés filtrés ",

};

const FormElementsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Arrivées Filtrés" />
      <ArrivePage/>
    </DefaultLayout>
  );
};

export default FormElementsPage;
