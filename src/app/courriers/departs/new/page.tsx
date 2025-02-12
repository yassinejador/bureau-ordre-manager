import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CourriersDepartsForm from "@/components/courriers/CourriersDepartsForm";
import { USER } from "@/types/users";
import { ETABLISSEMENT } from "@/types/etablissement";
import { ETAT } from "@/types/etat";

export const metadata: Metadata = {
  title: "Créer Courrier Départ - Bureau d'Ordre Digital",
  description:
    "Formulaire pour créer un courrier départ dans le système de gestion du bureau d'ordre - FS El Jadida",
};

async function fetchData<T>(path: string): Promise<T[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/${path}`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error(`Échec de récupération des données : ${path}`);
    }

    const data = await res.json();
    return data[path] || [];
  } catch (error) {
    console.error(`Erreur lors de la récupération de ${path} :`, error);
    return [];
  }
}

export default async function CourriersDeparts() {
  const [users, etablissements, etats] = await Promise.all([
    fetchData<USER>("users"),
    fetchData<ETABLISSEMENT>("etablissements"),
    fetchData<ETAT>("etats"),
  ]);

  return (
    <DefaultLayout>
      <Breadcrumb prefix="courriers" pageName="Départ" />
      <CourriersDepartsForm
        typeCourriers="Départ"
        etablissements={etablissements}
        users={users}
        etats={etats}
      />
    </DefaultLayout>
  );
}
