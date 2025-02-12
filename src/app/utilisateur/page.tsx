
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableUsers from "../../components/Tables/TableUsers";
import { USER } from "@/types/users";

export const metadata: Metadata = {
  title: "Utilisateurs",
  description:
    "Liste des Utilisateurs",
};

async function fetchUsers(): Promise<USER[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/users`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await res.json();
    return data.users || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    return [];
  }
}



const Users = async () => {
  const users = await fetchUsers();


return (
  <DefaultLayout>
    <Breadcrumb pageName="Table Utilisateurs" />
    <div className="flex flex-col gap-10">
      <TableUsers users={users}  />
    </div>
  </DefaultLayout>
);
};
export default Users;