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

export default function NouvelUtilisateurPage() {
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
