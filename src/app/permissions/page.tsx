import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TablePermission from "@/components/Tables/TablePermissions";
import { PERMISSION } from "@/types/permission";

export const metadata: Metadata = {
  title: "Permissions",
  description:
    "Liste des Permissions",
};

async function fetchPermissions(): Promise<PERMISSION[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/permissions`, {
      cache: "no-cache",
    });
    

    if (!res.ok) {
      throw new Error("Failed to fetch permissions");
    }

    const data = await res.json();
    return data.permissions || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des permissions :", error);
    return [];
  }
}


const Permissions = async () => {
  const permissions= await fetchPermissions();

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Permissions" />
      <div className="flex flex-col gap-10">
        <TablePermission permissionsData={permissions}/>
      </div>
    </DefaultLayout>
  );
};

export default Permissions;
