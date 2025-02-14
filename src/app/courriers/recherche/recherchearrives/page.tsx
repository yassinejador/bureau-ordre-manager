import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ArrivePage from "@/components/Tables/TableArrivesFiltre";
export const metadata: Metadata = {
  title: "Courriers Arrivées Filtrés",
  description:    "Liste des courriers arrivées filtrés ",

};

const FormElementsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Arrivées Filtrées" />
      <ArrivePage/>
    </DefaultLayout>
  );
};

export default FormElementsPage;
