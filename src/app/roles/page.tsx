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

async function fetchRoles(): Promise<ROLE[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/roles`, {
      cache: "no-cache",
    });
    

    if (!res.ok) {
      throw new Error("Failed to fetch roles");
    }

    const data = await res.json();
    return data.roles || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des roles :", error);
    return [];
  }
}


const Roles = async () => {
  const roles = await fetchRoles();

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Roles" />
      <div className="flex flex-col gap-10">
        <TableRoles rolesData={roles}/>
      </div>
    </DefaultLayout>
  );
};

export default Roles;
