import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import NouveauUtilisateurForm from "@/components/utilisateurs/NouveauUtilisateur";
import { ROLE } from "@/types/role";
import { SERVICE } from "@/types/service";
import { ETABLISSEMENT } from "@/types/etablissement";

export const metadata: Metadata = {
  title: "Nouvel utilisateur",
  description: "Ajoutez un nouvel utilisateur au système.",
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

export default async function NouvelUtilisateurPage() {
  const [roles, etablissements, services] = await Promise.all([
    fetchData<ROLE>("roles"),
    fetchData<ETABLISSEMENT>("etablissements"),
    fetchData<SERVICE>("services"),
  ]);

  return (
    <DefaultLayout>
      <Breadcrumb prefix="utilisateurs" pageName="Nouvel utilisateur" />
      <NouveauUtilisateurForm
        roles={roles}
        etablissements={etablissements}
        services={services}
      />
    </DefaultLayout>
  );
}