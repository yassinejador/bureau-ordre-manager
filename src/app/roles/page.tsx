import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ROLE } from "@/types/role";
import TableRoles from "@/components/Tables/TableRoles";


export const metadata: Metadata = {
  title: "Roles",
  description:
    "Liste des Roles",
};

const Roles = () => {
    const rolesData : ROLE[] =  [
      { id: 1, role: "Direction", date_creation: "01/01/2025" },
      { id: 2, role: "Secrétariat général", date_creation: "01/01/2025" },
      { id: 3, role: "Responsables de départements", date_creation: "01/01/2025" },
      { id: 4, role: "Agents administratifs", date_creation: "01/01/2025" }
    ]
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Roles" />
      <div className="flex flex-col gap-10">
        <TableRoles rolesData={rolesData}/>
      </div>
    </DefaultLayout>
  );
};

export default Roles;
