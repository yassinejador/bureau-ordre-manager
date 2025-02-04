import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableArrives from "@/components/Tables/TableArrives";
import SearchForm from "@/components/BarreRecherche/barrerecherche";
export const metadata: Metadata = {
  title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const FormElementsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Recherché" />
      <SearchForm/>
    </DefaultLayout>
  );
};

export default FormElementsPage;
