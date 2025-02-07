import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import NouveauUtilisateur from "@/components/utilisateurs/NouveauUtilisateur";

export const metadata: Metadata = {
  title: "Nouvel utilisateur",
  description: "Ajoutez un nouvel utilisateur au système.",
};

export default function NouvelUtilisateurPage() {
  return (
    <DefaultLayout>
      <Breadcrumb prefix="utilisateurs" pageName="nouvel utilisateur" />
      <NouveauUtilisateur />
    </DefaultLayout>
  );
}
