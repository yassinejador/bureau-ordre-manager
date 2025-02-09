import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableEtablissements from "@/components/Tables/TableEtablissements";
import {ETABLISSEMENT} from  "@/types/etablissement";

export const metadata: Metadata = {
  title: "Etablissements",
  description:
    "Liste des Etablissements",
};

async function fetchEtablissements(): Promise<ETABLISSEMENT[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/etablissements`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch etablissements");
    }

    const data = await res.json();
    return data.etablissements || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des etablissements :", error);
    return [];
  }
}



const Etablissement = async () => {
  const etablissements = await fetchEtablissements();



return (
  <DefaultLayout>
    <Breadcrumb pageName="Table Etablissements" />
    <div className="flex flex-col gap-10">
      <TableEtablissements etablissements={etablissements}/>
    </div>
  </DefaultLayout>
);
};
export default Etablissement;