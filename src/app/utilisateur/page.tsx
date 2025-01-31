import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableUtilisateurs from "@/components/Tables/TableUtilisateurs";


const User = () => {

return (
  <DefaultLayout>
    <Breadcrumb pageName="Table Utilisateurs" />
    <div className="flex flex-col gap-10">
      <TableUtilisateurs />
    </div>
  </DefaultLayout>
);
};
export default User;