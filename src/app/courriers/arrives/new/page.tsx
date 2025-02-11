import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CourriersArrivesForm from "@/components/courriers/CourriersArrivesForm";
import { USER } from "@/types/users";
export const metadata: Metadata = {
  title: "Créer Courrier Arrivé - Bureau d'Ordre Digital",
  description:"Formulaire pour créer un courrier arrivé dans le système de gestion du bureau d'ordre - FS El Jadida",
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

export default async function CourriersArrives() {
  const users = await fetchUsers();

  return (
    <DefaultLayout>
      <Breadcrumb prefix="courriers" pageName="Arrivés" />
      <CourriersArrivesForm typeCourriers="arrivés" expediteurs={users} />
    </DefaultLayout>
  );
}