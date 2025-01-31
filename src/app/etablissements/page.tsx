import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableEtablissements from "@/components/Tables/TableEtablissements";


const Etablissement = () => {

return (
  <DefaultLayout>
    <Breadcrumb pageName="Table Etablissements" />
    <div className="flex flex-col gap-10">
      <TableEtablissements />
    </div>
  </DefaultLayout>
);
};
export default Etablissement;