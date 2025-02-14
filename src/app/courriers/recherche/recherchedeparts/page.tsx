import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableDeparts from "@/components/Tables/TablesDepart";
import DepartsPage from "@/components/Tables/TableDepartFiltre";
export const metadata: Metadata = {
  title: "Courriers Départs Filtrés",
  description:
    "Liste des courriers départs filtrés",
};

const FormElementsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Départs Filtrés" />
      <DepartsPage/>
    </DefaultLayout>
  );
};

export default FormElementsPage;
